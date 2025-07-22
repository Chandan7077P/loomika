// app/Components/CustomUserButton.tsx

"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import the router hook
import { ShieldCheck } from "lucide-react";

export function CustomUserButton() {
  const { user } = useUser();
  const router = useRouter(); // Initialize the router
  const isAdmin = user?.publicMetadata?.role === "admin";

  // This function will handle the click and navigate the user
  const navigateToStudio = () => {
    router.push("/studio");
  };

  return (
    <UserButton afterSignOutUrl="/">
      <UserButton.MenuItems>
        {/* Only show this action if the user is an admin */}
        {isAdmin && (
          /* Use UserButton.Action for custom menu items */
          <UserButton.Action
            className="flex items-center" // Optional: for better alignment
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