"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
      } `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Name with Hover */}
          <Link
            href="/"
            className={`text-xl font-bold transition-colors hover:text-cyan-400 ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            Baby Marine International
          </Link>

          {/* Menu Items */}
          <div
            className={`hidden md:flex items-center space-x-8 text-sm font-semibold transition-colors ${
              isScrolled ? "text-white" : "text-white"
            }`}
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
