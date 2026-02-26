import { redirect } from "next/navigation";
import { Suspense } from "react";
import ChatContent from "@/components/chat-content";
import ChatSkeleton from "@/components/chat-skeleton";
import { stackServerApp } from "@/stack/server";

const ChatSection = async () => {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatContent />
    </Suspense>
  );
};

const Chat = async () => {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatSection />
    </Suspense>
  );
};

export default Chat;
