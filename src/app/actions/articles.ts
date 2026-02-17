"use server";
import { and, desc, eq } from "drizzle-orm";
import { Match } from "effect";
import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { revalidatePath, revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import db from "@/db";
import { articles, usersSync } from "@/db/schema";
import {
  errorStringify,
  ServerActionDomainError,
  UserNotFoundError,
} from "@/errors";
import { stackServerApp } from "@/stack/server";
import { ALL_ARTICLES } from "@/tags";
import type { ServerActionResult } from "@/types";
import { makeSlug } from "@/utils";
import { deleteImage, uploadImage } from "./upload";

const getUserResultAsync = () =>
  ResultAsync.fromPromise(
    stackServerApp.getUser(),
    (error) =>
      new ServerActionDomainError({ errorMessage: errorStringify(error) }),
  ).andThen((user) => {
    if (!user) return errAsync(new UserNotFoundError());
    return okAsync(user);
  });

export const getAllArticles = async () => {
  const result = await db
    .select()
    .from(articles)
    .orderBy(desc(articles.updatedAt))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));
  return result;
};

export const getArticleBySlug = async (slug: string) => {
  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));
  if (!article.length) {
    notFound();
  }
  return article[0];
};

export const deleteArticleBySlug = async (
  _: ServerActionResult,
  formData: FormData,
): Promise<ServerActionResult> => {
  const slug = formData.get("slug");
  if (!slug) {
    return {
      success: false,
      error: "Missing or invalid slug.",
    };
  }
  const result = await db
    .delete(articles)
    .where(eq(articles.slug, slug as string))
    .returning({ id: articles.id, slug: articles.slug });
  if (!result.length) {
    return {
      success: false,
      error: `Failed to delete article, where slug=${slug}.`,
    };
  } else {
    revalidateTag(ALL_ARTICLES, "max");
    redirect("/");
  }
};

export const createArticle = async ({
  content,
  image,
  title,
}: {
  title: string;
  content: string;
  image: File | null;
}) =>
  getUserResultAsync()
    .andThen((user) => {
      if (!title.trim() || !content.trim()) {
        return errAsync(
          new ServerActionDomainError({
            errorMessage: "Title and content are required.",
          }),
        );
      }
      if (!image) {
        return okAsync({ user, imageUrl: null });
      }
      return ResultAsync.fromPromise(
        uploadImage(image),
        (error) =>
          new ServerActionDomainError({ errorMessage: errorStringify(error) }),
      ).map((blob) => ({ user, imageUrl: blob.url }));
    })
    .andThen((payload) => {
      return ResultAsync.fromPromise(
        db
          .insert(articles)
          .values({
            title,
            content,
            imageUrl: payload.imageUrl ?? undefined,
            authorId: payload.user.id,
            slug: makeSlug(title),
          })
          .returning({ id: articles.id, slug: articles.slug }),
        (error) =>
          new ServerActionDomainError({ errorMessage: errorStringify(error) }),
      );
    })
    .andThen((result) => {
      if (!result.length) {
        return errAsync(
          new ServerActionDomainError({
            errorMessage: "Failed to create article.",
          }),
        );
      }
      return okAsync(result[0]);
    })
    .match(
      (article) => {
        revalidateTag(ALL_ARTICLES, "max");
        return {
          success: true,
          slug: article.slug,
        } as const
      },
      (error) =>
        Match.value(error).pipe(
          Match.tag("UserNotFoundError", () => {
            redirect("/");
          }),
          Match.tag("ServerActionDomaiError", (e) => {
            console.error("ServerActionDomaiError:", e.errorMessage);
            return {
              success: false,
              error: e.errorMessage,
            } as const;
          }),
          Match.exhaustive,
        ),
    );

export const updateArticleBySlug = async ({
  content,
  image,
  slug,
  title,
}: {
  slug: string;
  title?: string;
  content?: string;
  image: File | null;
}) =>
  getUserResultAsync()
    .andThen((user) => {
      return ResultAsync.fromPromise(
        db
          .select()
          .from(articles)
          .where(and(eq(articles.slug, slug), eq(articles.authorId, user.id))),
        (error) =>
          new ServerActionDomainError({ errorMessage: errorStringify(error) }),
      );
    })
    .andThen((articles) => {
      if (!articles.length) {
        return errAsync(
          new ServerActionDomainError({
            errorMessage:
              "Article not found or you don't have permission to edit.",
          }),
        );
      }
      return okAsync(articles[0]);
    })
    .andThen((article) => {
      if (image && article.imageUrl) {
        return ResultAsync.fromPromise(
          deleteImage(article.imageUrl),
          (error) =>
            new ServerActionDomainError({
              errorMessage: errorStringify(error),
            }),
        ).map(() => article);
      }
      return okAsync(article);
    })
    .andThen((article) => {
      if (image) {
        return ResultAsync.fromPromise(
          uploadImage(image),
          (error) =>
            new ServerActionDomainError({
              errorMessage: errorStringify(error),
            }),
        ).map((blob) => ({ article, imageUrl: blob.url }));
      }
      return okAsync({ article, imageUrl: undefined });
    })
    .andThen((payload) => {
      if (!title && !content && !payload.imageUrl) {
        return okAsync(slug);
      }
      return ResultAsync.fromPromise(
        db
          .update(articles)
          .set({
            title: title ?? payload.article.title,
            content: content ?? payload.article.content,
            imageUrl: payload.imageUrl ?? payload.article.imageUrl,
          })
          .where(
            and(
              eq(articles.slug, slug),
              eq(articles.authorId, `${payload.article.authorId}`),
            ),
          ),
        (error) =>
          new ServerActionDomainError({ errorMessage: errorStringify(error) }),
      ).map(() => slug);
    })
    .match(
      (slug) => {
        revalidateTag(ALL_ARTICLES, "max");
        revalidateTag(`article::${slug}`, "max");
        return {
          success: true,
          slug
        } as const
      },
      (error) =>
        Match.value(error).pipe(
          Match.tag("UserNotFoundError", () => {
            redirect("/");
          }),
          Match.tag("ServerActionDomaiError", (e) => {
            console.error("ServerActionDomaiError:", e.errorMessage);
            return {
              success: false,
              error: e.errorMessage,
            } as const;
          }),
          Match.exhaustive,
        ),
    );
