// app/Components/CustomUserButton.tsx

"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

// Make sure the "export" keyword is right here
export function CustomUserButton() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <UserButton afterSignOutUrl="/">
      <UserButton.MenuItems>
        {isAdmin && (
          <Link href="/studio">
            <UserButton.MenuItem>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin Panel
            </UserButton.MenuItem>
          </Link>
        )}
      </UserButton.MenuItems>
    </UserButton>
  );
}