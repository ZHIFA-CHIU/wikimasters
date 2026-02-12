import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";

const NavUserSectionSkeleton = () => {
  return (
    <NavigationMenuItem>
      <Skeleton className="h-9 w-9 rounded-full" />
    </NavigationMenuItem>
  );
};

export default NavUserSectionSkeleton;
