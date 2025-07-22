// app/Components/CustomUserButton.tsx

"use client"; // This is crucial for Next.js 15

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ShieldCheck } from "lucide-react"; // Optional: An icon for the admin link

export function CustomUserButton() {
  const { user } = useUser();

  // This checks the user's public metadata for an "admin" role
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <UserButton afterSignOutUrl="/">
      {/* This container adds items to the dropdown */}
      <UserButton.MenuItems>
        {/* This link will only appear if the user is an admin */}
        {isAdmin && (
          <Link href="/studio"> {/* Link to your Sanity Studio */}
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