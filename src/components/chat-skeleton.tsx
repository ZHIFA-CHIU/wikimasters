import { Skeleton } from "./ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] w-full max-w-2xl flex-col overflow-hidden px-4">
      <div className="flex-1 space-y-6 overflow-y-auto pt-10">
        <div className="flex justify-start">
          <div className="w-full max-w-xs space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-44 rounded-2xl" />
        </div>
        <div className="flex justify-start">
          <div className="w-full max-w-sm space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
      <div className="shrink-0 pb-6 pt-3">
        <div className="rounded-3xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
