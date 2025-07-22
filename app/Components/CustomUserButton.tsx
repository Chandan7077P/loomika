// app/Components/CustomUserButton.tsx

"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export function CustomUserButton() {
  const { user } = useUser();
  const router = useRouter();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const navigateToStudio = () => {
    router.push("/studio");
  };

  return (
    <UserButton afterSignOutUrl="/">
      <UserButton.MenuItems>
        {isAdmin && (
          <UserButton.Action
            className="flex items-center"
            onClick={navigateToStudio}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Admin Panel
          </UserButton.Action>
        )}
      </UserButton.MenuItems>
    </UserButton>
  );
}