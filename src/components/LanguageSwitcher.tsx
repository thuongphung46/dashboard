/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();

  const change = (lng: string) => {
    void i18n.changeLanguage(lng);
  };

  return (
    <div className={className + " flex items-center gap-2"}>
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => change(l.code)}
          className={`px-2 py-1 text-sm rounded disabled:opacity-60 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            i18n.resolvedLanguage === l.code ? "bg-gray-200" : ""
          }`}
          aria-label={`Switch to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
