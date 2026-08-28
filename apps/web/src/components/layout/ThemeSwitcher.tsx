"use client";

import { useState } from "react";
import { useTheme, ThemePalette } from "@/context/ThemeContext";
import { Palette, Check } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border bg-card hover:bg-muted text-xs font-semibold shadow-sm transition"
        aria-label="Change Website Color Theme"
      >
        <Palette className="h-3.5 w-3.5 text-primary" />
        <span className="hidden sm:inline capitalize">{theme}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 p-2 bg-card border rounded-2xl shadow-xl z-50 animate-in fade-in-50 zoom-in-95 space-y-1">
            <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b mb-1">
              Select Marketplace Theme
            </div>
            {themes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-left transition ${
                    isSelected
                      ? "bg-primary/10 text-primary font-bold"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3.5 w-3.5 rounded-full border"
                      style={{ backgroundColor: t.previewColor }}
                    />
                    <span>{t.name}</span>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
