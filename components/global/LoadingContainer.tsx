import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

function LoadingContainer() {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <LoadingGuitar />
      <LoadingGuitar />
      <LoadingGuitar />
    </div>
  );

  function LoadingGuitar() {
    return (
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4 mt-4" />
          <Skeleton className="h-4 w-1/2 mt-4" />
        </CardContent>
      </Card>
    );
  }
}

export default LoadingContainer;
