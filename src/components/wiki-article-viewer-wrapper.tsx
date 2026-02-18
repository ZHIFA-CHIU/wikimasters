import { notFound } from "next/navigation";
import { incrementViewCountBySlug } from "@/redis";
import { stackServerApp } from "@/stack/server";
import type { ViewArticlePageProps } from "@/types";
import WikiArticleCachedViewer from "./wiki-article-cached-viewer";

const WikiArticleViewerWrapper = async ({ params }: ViewArticlePageProps) => {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const user = await stackServerApp.getUser();
  const count = await incrementViewCountBySlug(id);
  return <WikiArticleCachedViewer pageViews={count} id={id} user={user} />;
};

export default WikiArticleViewerWrapper;
