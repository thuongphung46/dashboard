/** @format */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import pages from "../config/pages";

// Small helper to update favicon (creates link if missing)
function ensureFavicon(href = "/favicon.svg") {
  try {
    let link = document.querySelector(
      'link[rel~="icon"]'
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    if (link.href !== location.origin + href) {
      link.href = href;
    }
  } catch (e) {
    // ignore - defensive for SSR/non-browser
  }
}

export function PageMeta() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // ensure favicon exists
    ensureFavicon("/favicon.svg");

    // derive primary route segment (match by prefix)
    const seg = pathname.split("/").filter(Boolean)[0] || "dashboard";

    // find a page config that matches the path segment
    const found = pages.find((p) => {
      const first = p.path.split("/").filter(Boolean)[0];
      return first === seg;
    });

    const key = found?.titleKey ?? found?.labelKey ?? "app.name";
    const page = t(key);
    const appName = t("app.name") || "Pyxis Admin";
    document.title = page ? `${page} - ${appName}` : appName;
  }, [pathname, t]);

  return null;
}

export default PageMeta;
