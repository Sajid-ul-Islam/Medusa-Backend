"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemePalette = "literary" | "emerald" | "indigo";

interface ThemeContextType {
  theme: ThemePalette;
  setTheme: (theme: ThemePalette) => void;
  themes: { id: ThemePalette; name: string; icon: string; previewColor: string }[];
}

const THEMES: { id: ThemePalette; name: string; icon: string; previewColor: string }[] = [
  {
    id: "literary",
    name: "Warm Literary (Amber & Navy)",
    icon: "📖",
    previewColor: "#d97706",
  },
  {
    id: "emerald",
    name: "Oxford Forest (Emerald & Sage)",
    icon: "🌿",
    previewColor: "#059669",
  },
  {
    id: "indigo",
    name: "Modern Indigo (Tech & Minimal)",
    icon: "⚡",
    previewColor: "#4f46e5",
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePalette>("literary");

  useEffect(() => {
    const stored = localStorage.getItem("bookhub_theme") as ThemePalette;
    if (stored && ["literary", "emerald", "indigo"].includes(stored)) {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      document.documentElement.setAttribute("data-theme", "literary");
    }
  }, []);

  const setTheme = (newTheme: ThemePalette) => {
    setThemeState(newTheme);
    localStorage.setItem("bookhub_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
