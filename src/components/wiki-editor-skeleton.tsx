import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WikiEditorSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-48 mt-2" />
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-36" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <div className="border rounded-md p-4 space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-28" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />
                <div className="space-y-2 text-center">
                  <Skeleton className="h-4 w-40 mx-auto" />
                  <Skeleton className="h-3 w-72 max-w-full mx-auto" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-4">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-28" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WikiEditorSkeleton;
