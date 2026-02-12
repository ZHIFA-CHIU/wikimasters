import { UserButton } from "@stackframe/stack";
import Link from "next/link";
import { ensureUserExists } from "@/db/sync-user";
import { stackServerApp } from "@/stack/server";
import { Button } from "./ui/button";
import { NavigationMenuItem } from "./ui/navigation-menu";

const NavUserSection = async () => {
  const user = await stackServerApp.getUser();
  if (user) {
    await ensureUserExists({
      id: user.id,
      displayName: user.displayName ?? null,
      primaryEmail: user.primaryEmail ?? null,
    });
  }

  return user ? (
    <>
      <NavigationMenuItem>
        <Button asChild variant={"outline"}>
          <Link href={"/wiki/edit/new"}>New</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <UserButton />
      </NavigationMenuItem>
    </>
  ) : (
    <>
      <NavigationMenuItem>
        <Button asChild variant={"outline"}>
          <Link href={"/handler/sign-in"}>Sign In</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button asChild>
          <Link href={"/handler/sign-up"}>Sign Up</Link>
        </Button>
      </NavigationMenuItem>
    </>
  );
};

export default NavUserSection;
