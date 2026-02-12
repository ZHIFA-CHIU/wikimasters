import { Suspense } from "react";
import WikiArticleViewerSkeleton from "@/components/wiki-article-viewer-skeleton";
import WikiArticleViewerWrapper from "@/components/wiki-article-viewer-wrapper";
import type { ViewArticlePageProps } from "@/types";

export default async function ViewArticlePage({
  params,
}: ViewArticlePageProps) {
  return (
    <Suspense fallback={<WikiArticleViewerSkeleton />}>
      <WikiArticleViewerWrapper params={params} />
    </Suspense>
  );
}
