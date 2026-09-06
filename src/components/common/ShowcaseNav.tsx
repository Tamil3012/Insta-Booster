"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ShowcaseNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "📸 IG Login" },
    { href: "/forgot-password", label: "🔑 IG Forgot Pwd" },
    { href: "/create", label: "✨ IG Create Account" },
    { href: "/facebook", label: "🔵 FB Login" },
    { href: "/facebook/forgot-password", label: "🔐 FB Forgot Pwd" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0a0d12]/95 backdrop-blur-md border-b border-white/10 z-40 text-white flex items-center justify-between px-4 sm:px-6 select-none shadow-md">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-sm tracking-tight hover:opacity-90 transition-opacity"
        >
          <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-transparent bg-clip-text font-extrabold text-base">
            Meta UI
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
            Pixel Perfect
          </span>
        </Link>
      </div>

      {/* Desktop Links */}
      <nav className="hidden lg:flex items-center gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-white/15 text-white shadow-inner font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          aria-label="Toggle Navigation"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-[#0d1117] border-b border-white/10 p-3 flex flex-col gap-1 shadow-2xl lg:hidden animate-fade-in">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-xs font-medium ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-200 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
