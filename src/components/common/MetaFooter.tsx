import React from "react";
import Link from "next/link";

interface MetaFooterProps {
  theme?: "facebook" | "instagram";
  onOpenLanguageModal?: () => void;
}

export default function MetaFooter({
  theme = "facebook",
  onOpenLanguageModal,
}: MetaFooterProps) {
  if (theme === "instagram") {
    const igLinks = [
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
    ];

    return (
      <footer className="w-full py-8 text-xs text-[#71767B] bg-transparent mt-auto select-none">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs">
            {igLinks.map((link) => (
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

          <div className="flex items-center gap-4 text-xs mt-1">
            <button
              onClick={onOpenLanguageModal}
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
    );
  }

  // Facebook Theme
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
    <footer className="w-full bg-white pt-8 pb-10 text-xs text-[#8a8d91] mt-auto border-t border-[#f0f2f5] select-none">
      <div className="max-w-5xl mx-auto px-6">
        {/* Language Row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {fbLanguages.map((lang, idx) => (
            <React.Fragment key={lang}>
              <a
                href="#"
                className={`hover:underline ${idx === 0 ? "text-[#737373] font-medium" : "text-[#8a8d91]"}`}
                onClick={(e) => e.preventDefault()}
              >
                {lang}
              </a>
            </React.Fragment>
          ))}
          <a
            href="#"
            className="hover:underline text-[#8a8d91] inline-flex items-center gap-0.5"
            onClick={(e) => {
              e.preventDefault();
              onOpenLanguageModal?.();
            }}
          >
            More languages...
          </a>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#dadde1] my-2.5 w-full" />

        {/* Links Grid */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#8a8d91]">
          {fbLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:underline hover:text-[#737373]"
              onClick={(e) => e.preventDefault()}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
