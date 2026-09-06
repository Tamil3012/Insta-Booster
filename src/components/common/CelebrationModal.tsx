"use client";

import React, { useEffect, useCallback } from "react";
import { Sparkles, Trophy, CheckCircle2, X } from "lucide-react";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  followerCount?: number;
  username?: string;
}

export default function CelebrationModal({
  isOpen,
  onClose,
  followerCount = 500,
  username,
}: CelebrationModalProps) {
  const triggerConfettiBoom = useCallback(async () => {
    try {
      const confettiModule = await import("canvas-confetti");
      const confetti = confettiModule.default;

      // Initial center color paper boom
      confetti({
        particleCount: 90,
        spread: 110,
        startVelocity: 45,
        origin: { y: 0.55 },
        colors: [
          "#FF0069",
          "#7638FA",
          "#FF7A00",
          "#FFD600",
          "#00F0FF",
          "#0866FF",
          "#25D366",
        ],
        zIndex: 99999,
      });

      // Left cannon burst
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        startVelocity: 55,
        origin: { x: 0.05, y: 0.65 },
        colors: ["#FF0069", "#7638FA", "#FF7A00", "#FFD600"],
        zIndex: 99999,
      });

      // Right cannon burst
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        startVelocity: 55,
        origin: { x: 0.95, y: 0.65 },
        colors: ["#00F0FF", "#0866FF", "#FF7A00", "#FF0069"],
        zIndex: 99999,
      });

      // Second wave of stars and circles for maximum celebration
      setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 130,
          origin: { y: 0.45 },
          shapes: ["star", "circle"],
          colors: ["#FFD700", "#FF1493", "#00FFFF", "#39FF14"],
          zIndex: 99999,
        });
      }, 350);
    } catch (err) {
      console.error("Failed to load confetti:", err);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Fire the confetti color paper boom when modal opens
      triggerConfettiBoom();
    }
  }, [isOpen, triggerConfettiBoom]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] bg-white border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_20px_70px_rgba(255,0,105,0.25)] flex flex-col items-center text-center overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-[#ff0069]/30 via-[#7638fa]/25 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        {/* <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button> */}

        {/* Celebration Trophy / Badge with Animated Glow */}
        {/* <div className="relative mb-5 mt-1">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center p-1 shadow-[0_0_30px_rgba(221,42,123,0.5)] animate-bounce-subtle">
            <div className="w-full h-full rounded-full bg-[#141b22] flex items-center justify-center">
              <Trophy className="w-9 h-9 text-[#ffd700] drop-shadow-[0_2px_8px_rgba(255,215,0,0.6)]" />
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 ring-4 ring-[#141b22]">
            <CheckCircle2 className="w-4 h-4 text-white stroke-[3]" />
          </span>
        </div> */}

        {/* Main Title */}
        <h2 className="text-[22px] sm:text-[24px] font-extrabold text-black leading-snug tracking-tight mb-3">
          🎉✨ You successfully reached{" "}
          <span className="bg-gradient-to-r from-[#ff4458] via-[#fd3170] to-[#ffc107] text-transparent bg-clip-text">
            {followerCount} followers!
          </span>{" "}
          🥳💖
        </h2>

        {/* Story / Description */}
        <p className="text-[14.5px] sm:text-[15px] text-black/70 leading-relaxed mb-6 font-normal">
          After just <strong className="text-black font-semibold">30 minutes</strong>, you checked Instagram and—wow! 😍🙌{" "}
          <span className="text-black font-semibold">{followerCount} followers already!</span> That’s incredible! 🥰✨
        </p>

        {/* Follower Stats Card */}
        {/* <div className="w-full bg-[#1b242e]/90 border border-white/10 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0064e0] to-[#00a8ff] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[11.5px] text-gray-400 uppercase tracking-wider font-semibold">
                Status Update
              </div>
              <div className="text-[14.5px] font-bold text-white flex items-center gap-1.5">
                <span>+{followerCount} Real Followers</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Delivered
            </span>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={() => {
              // triggerConfettiBoom();
              setTimeout(() => {
                onClose();
              }, 1200);
            }}
            className="w-full h-[46px] rounded-full bg-gradient-to-r from-[#0064e0] via-[#0866FF] to-[#0095f6] hover:brightness-110 active:scale-[0.98] text-white font-semibold text-[15px] shadow-lg shadow-[#0064e0]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Done</span>
          </button>

          {/* <button
            onClick={triggerConfettiBoom}
            className="w-full h-[42px] rounded-full bg-white/5 hover:bg-white/10 active:scale-[0.98] text-gray-300 hover:text-white font-medium text-[13.5px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>🎉 Celebrate Again (Confetti)</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}
