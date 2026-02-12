"use server";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import db from "@/db";
import { articles, usersSync } from "@/db/schema";
import { ALL_ARTICLES } from "@/tags";
import type { ServerActionResult } from "@/types";

export const getAllArticles = async () => {
  const result = await db
    .select()
    .from(articles)
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
