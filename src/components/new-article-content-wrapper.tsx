import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import WikiEditor from "./wiki-editor";

const NewArticleContentWrapper = async () => {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }
  return <WikiEditor isEditing={true} />;
};
export default NewArticleContentWrapper;
