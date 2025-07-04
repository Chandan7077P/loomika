"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/Products", label: "Product" },
    { href: "/Facility", label: "Our Facility" },
    { href: "/About", label: "About Us" },
    { href: "/Contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-blue-950/90 backdrop-blur-md text-white shadow-md"
          : "bg-gradient-to-b from-black/30 via-black/10 to-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-cyan-400"
          >
            Baby Marine International
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-semibold">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    isScrolled && isActive
                      ? "bg-white/10 backdrop-blur-md text-cyan-400"
                      : "text-white hover:text-cyan-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
