"use client";

import { useState, useEffect } from "react";
import {
  X,
  BookOpen,
  Sun,
  Moon,
  Coffee,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EBookReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  author: string;
  sampleChapter?: string;
  customerEmail?: string;
}

export function EBookReaderModal({
  isOpen,
  onClose,
  title,
  author,
  sampleChapter,
  customerEmail = "reader@bookhub.com.bd",
}: EBookReaderModalProps) {
  const [paperTheme, setPaperTheme] = useState<"sepia" | "white" | "night">("sepia");
  const [fontSize, setFontSize] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultContent = [
    `CHAPTER 1: THE FOUNDATIONS\n\nWhen we build distributed software architectures or craft timeless literature, clarity of structure is paramount. Every line of text, like every function in a distributed consensus engine, serves to bridge imagination with tangible reality.\n\nIn the quiet streets of Dhaka, as evening mist descends over the Buriganga, thoughts turn to the dual nature of knowledge—how physical paper and digital bytes coexist to empower human understanding.`,
    `CHAPTER 2: RESILIENCE & SCALE\n\nSystems fail in unexpected ways. Network partitions happen, disk drives experience bit rot, and yet our collective library of knowledge persists across centuries. By embedding integrity and immutable logs into our workflows, we safeguard both truth and provenance.\n\nThrough BookHub's decentralized publisher network, independent writers find their voice without intermediaries diluting their creative vision.`,
    `CHAPTER 3: THE PERSISTENT WORD\n\nA book read by candlelight in rural Sylhet carries the exact same weight as one rendered on a crystal display in Silicon Valley. The medium changes, but the resonance of truth remains eternal.\n\n[End of Sample Edition — Purchase full copy for complete 320 pages]`,
  ];

  const content = sampleChapter ? [sampleChapter] : defaultContent;

  const themeStyles = {
    sepia: "bg-[#fbf0d9] text-[#433422] border-[#e8dcc4]",
    white: "bg-[#ffffff] text-[#1a1a1a] border-[#e5e5e5]",
    night: "bg-[#18181b] text-[#f4f4f5] border-[#27272a]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-3xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-colors duration-300 ${themeStyles[paperTheme]}`}
      >
        {/* Top Reading Toolbar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-inherit/40 bg-black/5">
          <div className="flex items-center gap-2.5 min-w-0">
            <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-sm truncate">{title}</h3>
              <p className="text-[11px] opacity-70 truncate">by {author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Paper Theme Controls */}
            <div className="flex items-center rounded-lg border border-inherit/30 p-0.5 bg-black/5">
              <button
                type="button"
                onClick={() => setPaperTheme("sepia")}
                className={`p-1.5 rounded-md transition ${
                  paperTheme === "sepia" ? "bg-[#fbf0d9] shadow-xs font-bold" : "opacity-60"
                }`}
                title="Warm Sepia Paper"
              >
                <Coffee className="h-4 w-4 text-amber-800" />
              </button>
              <button
                type="button"
                onClick={() => setPaperTheme("white")}
                className={`p-1.5 rounded-md transition ${
                  paperTheme === "white" ? "bg-white shadow-xs font-bold" : "opacity-60"
                }`}
                title="Clean White Paper"
              >
                <Sun className="h-4 w-4 text-amber-500" />
              </button>
              <button
                type="button"
                onClick={() => setPaperTheme("night")}
                className={`p-1.5 rounded-md transition ${
                  paperTheme === "night" ? "bg-zinc-800 shadow-xs font-bold" : "opacity-60"
                }`}
                title="Midnight Dark"
              >
                <Moon className="h-4 w-4 text-blue-400" />
              </button>
            </div>

            {/* Font Size Adjusters */}
            <div className="flex items-center rounded-lg border border-inherit/30 p-0.5 bg-black/5">
              <button
                type="button"
                onClick={() => setFontSize(Math.max(13, fontSize - 1))}
                className="p-1.5 rounded-md hover:bg-black/5 opacity-75"
                title="Decrease font size"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono px-1 font-bold">{fontSize}</span>
              <button
                type="button"
                onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                className="p-1.5 rounded-md hover:bg-black/5 opacity-75"
                title="Increase font size"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-black/10 opacity-70 hover:opacity-100 transition"
              aria-label="Close reader"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Reader Book Content Canvas with Anti-Piracy Watermark */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 font-serif leading-relaxed relative selection:bg-amber-500/20">
          {/* Subtle Anti-Piracy Dynamic Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 select-none -rotate-12">
            <div className="text-center font-mono text-2xl font-black">
              LICENSED TO {customerEmail.toUpperCase()}
              <br />
              BOOKHUB DRM PROTECTED
            </div>
          </div>

          <div
            className="max-w-xl mx-auto whitespace-pre-line tracking-wide"
            style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
          >
            {content[currentPage - 1] || content[0]}
          </div>
        </div>

        {/* Bottom Pagination & Progress */}
        <div className="px-6 py-3 border-t border-inherit/40 flex items-center justify-between text-xs opacity-75 bg-black/5">
          <div className="flex items-center gap-1.5 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Digital eReader License Verified</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded hover:bg-black/10 disabled:opacity-30 transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-mono">
              Page {currentPage} of {content.length}
            </span>
            <button
              type="button"
              disabled={currentPage >= content.length}
              onClick={() => setCurrentPage((p) => Math.min(content.length, p + 1))}
              className="p-1 rounded hover:bg-black/10 disabled:opacity-30 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
