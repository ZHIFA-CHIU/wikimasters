import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WikiCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs">
          <Skeleton className="h-3 w-20" />
          <span className="text-muted-foreground">•</span>
          <Skeleton className="h-3 w-16" />
        </div>
        <CardTitle className="text-lg">
          <Skeleton className="h-5 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-11/12" />
      </CardContent>
      <CardFooter className="pt-2">
        <Skeleton className="h-4 w-28" />
      </CardFooter>
    </Card>
  );
};

export default WikiCardSkeleton;
