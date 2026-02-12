import Link from "next/link";
import { Suspense } from "react";
import NavUserSection from "./nav-user-section";
import NavUserSectionSkeleton from "./nav-user-section-skeleton";
import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";

const NavBar = async () => {
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blue supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="font-bold text-xl tracking-tight text-gray-900"
        >
          Wikimasters
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            <Suspense fallback={<NavUserSectionSkeleton />}>
              <NavUserSection />
            </Suspense>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default NavBar;
