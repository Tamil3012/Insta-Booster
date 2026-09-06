"use client";

import React, { useState } from "react";

interface FloatingInputProps {
  id?: string;
  name?: string;
  type?: "text" | "password" | "email" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  heightClass?: string;
  roundedClass?: string;
  bgClass?: string;
  borderClass?: string;
}

export default function FloatingInput({
  id,
  name,
  type = "text",
  value,
  onChange,
  label,
  required = false,
  autoComplete,
  className = "",
  heightClass = "h-[60px]",
  roundedClass = "rounded-xl",
  bgClass = "bg-[#1f1f22]",
  borderClass = "border-[#2c333f]",
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFloating = isFocused || (value !== undefined && value.length > 0);
  const isPassword = type === "password";
  const effectiveType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`relative w-full bg-[#1f1f22] ${className}`}>
      <input
        id={id}
        name={name}
        type={effectiveType}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        autoComplete={autoComplete}
        className={`w-full ${heightClass} ${roundedClass} ${bgClass} border ${
          isFocused ? "border-[#424d5e] ring-1 ring-[#424d5e]" : borderClass
        } px-3.5 pt-[18px] pb-[6px] text-[13.5px] text-white focus:outline-none transition-all ${
          isPassword && value.length > 0 ? "pr-14" : ""
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-3.5 pointer-events-none font-semibold transition-all duration-150 ease-out origin-left select-none truncate max-w-[calc(100%-28px)] ${
          isFloating
            ? "top-[6px] translate-y-0 text-[13px] text-gray-400"
            : "top-1/2 -translate-y-1/2 text-[16px] text-gray-400"
        }`}
      >
        {label}
      </label>

      {isPassword && value.length > 0 && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-white hover:text-gray-300 focus:outline-none select-none transition-colors"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
}
