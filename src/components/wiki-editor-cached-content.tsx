"use cache";
import type { CurrentServerUser } from "@stackframe/stack";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { getArticleBySlug } from "@/app/actions/articles";
import WikiEditor from "./wiki-editor";

const WikiEditorCachedContent = async ({
  slug,
  user,
}: {
  slug: string;
  user: CurrentServerUser | null;
}) => {
  cacheLife("days");
  cacheTag(`article::${slug}`);
  const article = await getArticleBySlug(slug);
  const canEdit = !!user && user.id === article.usersSync?.id;
  if (!canEdit) {
    redirect("/");
  }
  return (
    <WikiEditor
      articleId={String(article.articles.id)}
      initialContent={article.articles.content}
      initialTitle={article.articles.title}
      isEditing={canEdit}
      slug={article.articles.slug}
    />
  );
};
export default WikiEditorCachedContent;
