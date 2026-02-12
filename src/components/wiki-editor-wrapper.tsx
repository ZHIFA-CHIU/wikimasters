import { notFound } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import type { EditArticlePageProps } from "@/types";
import WikiEditorCachedContent from "./wiki-editor-cached-content";

const WikiEditorWrapper = async ({ params }: EditArticlePageProps) => {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const user = await stackServerApp.getUser();

  return <WikiEditorCachedContent slug={id} user={user} />;
};

export default WikiEditorWrapper;
