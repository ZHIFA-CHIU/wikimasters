"use client";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { Item, ItemContent } from "./ui/item";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const ChatContent = () => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat();

  const resizeTextarea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  useEffect(() => {
    if (status !== "submitted" && status !== "streaming") return;

    const intervalId = window.setInterval(() => {
      messagesEndRef.current?.scrollIntoView({ block: "end" });
    }, 150);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status]);

  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] w-full max-w-2xl flex-col overflow-hidden px-4">
      <div className="flex-1 space-y-6 overflow-y-auto pt-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex whitespace-pre-wrap ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <div key={`${message.id}-${i}`}>
                      {message.role === "user" ? (
                        <Item
                          variant="muted"
                          size="sm"
                          className="inline-flex w-fit max-w-full rounded-2xl px-3 py-2"
                        >
                          <ItemContent className="text-sm leading-normal break-words">
                            {part.text}
                          </ItemContent>
                        </Item>
                      ) : (
                        <div className="max-w-full text-sm leading-normal break-words">
                          {part.text}
                        </div>
                      )}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
        {status === "submitted" && (
          <div className="flex w-full max-w-xs flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="shrink-0 pb-6 pt-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="rounded-3xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <textarea
            ref={textareaRef}
            className="min-h-12 w-full resize-none overflow-hidden bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-500"
            rows={1}
            value={input}
            placeholder="Message to WikiMasters..."
            onChange={(e) => {
              setInput(e.currentTarget.value);
              resizeTextarea(e.currentTarget);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="flex justify-end px-1 pb-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm text-white transition enabled:hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:enabled:hover:bg-zinc-300"
                  aria-label="Send message"
                >
                  ↑
                </button>
              </TooltipTrigger>
              <TooltipContent>Send</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-zinc-500">
          AI can make mistakes. Please verify important facts.
        </p>
      </form>
    </div>
  );
};

export default ChatContent;
