import { ChevronRight, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WikiArticleViewerSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <span className="flex items-center">
          <Home className="h-4 w-4 mr-1" />
          Home
        </span>
        <ChevronRight className="h-4 w-4" />
        <Skeleton className="h-4 w-48" />
      </nav>

      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <Skeleton className="h-11 w-3/4 mb-4" />
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Skeleton className="mb-8 h-64 md:h-80 w-full rounded-lg" />

          <div className="space-y-3">
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-9/12" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-8/12" />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between items-center">
        <Skeleton className="h-10 w-36" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
};

export default WikiArticleViewerSkeleton;
