"use client";

import React, { useState } from "react";
import { CloseIcon, CheckIcon } from "./Icons";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: string;
  onSelectLanguage?: (lang: string) => void;
}

const LANGUAGES = [
  "English (US)",
  "Afrikaans",
  "Bahasa Indonesia",
  "Bahasa Melayu",
  "Dansk",
  "Deutsch",
  "English (UK)",
  "Español",
  "Español (España)",
  "Filipino",
  "Français (Canada)",
  "Français (France)",
  "Italiano",
  "Magyar",
  "Nederlands",
  "Norsk",
  "Polski",
  "Português (Brasil)",
  "Português (Portugal)",
  "Română",
  "Suomi",
  "Svenska",
  "Tiếng Việt",
  "Türkçe",
  "Čeština",
  "Ελληνικά",
  "Русский",
  "Українська",
  "עברית",
  "العربية",
  "فارسی",
  "हिन्दी",
  "বাংলা",
  "தமிழ்",
  "తెలుగు",
  "ಕನ್ನಡ",
  "മലയാളം",
  "ไทย",
  "한국어",
  "日本語",
  "简体中文",
  "繁體中文",
];

export default function LanguageModal({
  isOpen,
  onClose,
  currentLanguage = "English (US)",
  onSelectLanguage,
}: LanguageModalProps) {
  const [selected, setSelected] = useState(currentLanguage);

  if (!isOpen) return null;

  const handleSelect = (lang: string) => {
    setSelected(lang);
    onSelectLanguage?.(lang);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md h-[68vh] sm:h-auto sm:max-h-[75vh] bg-[#16232d] rounded-t-[28px] sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden text-white border-t border-white/5 sm:border border-[#263745]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header with Close (X) Icon */}
        <div className="sticky top-0 z-20 bg-[#16232d] pt-4 pb-2 px-5 flex items-center">
          <button
            onClick={onClose}
            aria-label="Close language selector"
            className="p-1 -ml-1 text-white hover:opacity-80 transition-opacity"
          >
            <CloseIcon className="w-[22px] h-[22px] stroke-[2.2]" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-5 pb-8 overscroll-contain scrollbar-none">
          {/* Title that scrolls under the sticky X button */}
          <h2 className="text-[23px] font-bold text-white tracking-tight pt-1 pb-4">
            Select your language
          </h2>

          {/* Rounded Card Containing Languages - No divider lines */}
          <div className="rounded-[22px] border border-[#273846] bg-[#1a2834] overflow-hidden">
            {LANGUAGES.map((lang) => {
              const isChecked = selected === lang;
              return (
                <button
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                  <span
                    className={`text-[15.5px] ${
                      isChecked ? "text-white font-medium" : "text-white font-normal"
                    }`}
                  >
                    {lang}
                  </span>
                  <div
                    className={`w-[22px] h-[22px] rounded-[5px] flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#0095f6]"
                        : "border-2 border-[#54687a] bg-transparent"
                    }`}
                  >
                    {isChecked && (
                      <CheckIcon className="w-3.5 h-3.5 text-white stroke-[3.2]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
