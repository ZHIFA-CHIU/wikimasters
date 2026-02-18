"use cache";
import type { CurrentServerUser } from "@stackframe/stack";
import { cacheLife, cacheTag } from "next/cache";
import { getArticleBySlug } from "@/app/actions/articles";
import type { ViewerArticle } from "@/types";
import WikiArticleViewer from "./wiki-article-viewer";

const WikiArticleCachedViewer = async ({
  id,
  user,
  pageViews,
}: {
  id: string;
  user: CurrentServerUser | null;
  pageViews: number | null;
}) => {
  cacheLife("days");
  cacheTag(`article::${id}`);
  const article = await getArticleBySlug(id);
  const canEdit = !!user && user.id === article.usersSync?.id;
  const data: ViewerArticle = {
    author:
      article.usersSync?.name ?? article.usersSync?.email ?? "Unkown User",
    content: article.articles.content,
    id: article.articles.id,
    createdAt: article.articles.createdAt,
    title: article.articles.title,
    imageUrl: article.articles.imageUrl,
    slug: article.articles.slug,
  };
  return (
    <WikiArticleViewer article={data} canEdit={canEdit} pageviews={pageViews} />
  );
};
export default WikiArticleCachedViewer;
