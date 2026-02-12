import { Suspense } from "react";
import WikiEditorSkeleton from "@/components/wiki-editor-skeleton";
import WikiEditorWrapper from "@/components/wiki-editor-wrapper";
import type { EditArticlePageProps } from "@/types";

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  return (
    <Suspense fallback={<WikiEditorSkeleton />}>
      <WikiEditorWrapper params={params} />
    </Suspense>
  );
}
