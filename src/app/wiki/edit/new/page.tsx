import { Suspense } from "react";
import NewArticleContentWrapper from "@/components/new-article-content-wrapper";
import WikiEditorSkeleton from "@/components/wiki-editor-skeleton";

export default function NewArticlePage() {
  return (
    <Suspense fallback={<WikiEditorSkeleton />}>
      <NewArticleContentWrapper />
    </Suspense>
  );
}
