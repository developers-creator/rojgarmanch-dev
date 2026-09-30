import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-up"
  | "behance"
  | "bell"
  | "briefcase"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "clapperboard"
  | "clock"
  | "compress"
  | "dribbble"
  | "envelope"
  | "expand"
  | "facebook"
  | "file-pdf"
  | "google"
  | "house"
  | "id-card"
  | "instagram"
  | "linkedin"
  | "location"
  | "magnifying-glass"
  | "magnifying-glass-minus"
  | "magnifying-glass-plus"
  | "moon"
  | "phone"
  | "pinterest"
  | "play"
  | "rotate-left"
  | "share-nodes"
  | "sun"
  | "tiktok"
  | "vimeo"
  | "whatsapp"
  | "x"
  | "xmark"
  | "youtube";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "name" | "children">;

const SOCIAL_ICON_MAP: Record<string, IconName> = {
  "fa-facebook-f": "facebook",
  "fa-twitter": "x",
  "fa-youtube": "youtube",
  "fa-instagram": "instagram",
  "fa-pinterest": "pinterest",
  "fa-tiktok": "tiktok",
  "fa-dribbble": "dribbble",
  "fa-behance": "behance",
  "fa-linkedin-in": "linkedin",
  "fa-whatsapp": "whatsapp",
  "fa-google": "google",
  "fa-vimeo-v": "vimeo",
};

// The CMS sends Font Awesome classes, sometimes with a style prefix
// (e.g. "fab fa-youtube"), so match on the "fa-*" token.
export function socialIconName(key: string): IconName {
  const token = key.split(/\s+/).find((part) => part.startsWith("fa-"));
  return (token && SOCIAL_ICON_MAP[token]) || "share-nodes";
}

function paths(name: IconName) {
  switch (name) {
    case "arrow-right":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      );
    case "arrow-up":
      return (
        <>
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </>
      );
    case "bell":
      return (
        <>
          <path
            fill="none"
            d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
          />
          <path fill="none" d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </>
      );
    case "briefcase":
      return (
        <>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 13h20" />
        </>
      );
    case "chevron-down":
      return <path d="m6 9 6 6 6-6" />;
    case "chevron-left":
      return <path d="m15 18-6-6 6-6" />;
    case "chevron-right":
      return <path d="m9 18 6-6-6-6" />;
    case "chevron-up":
      return <path d="m18 15-6-6-6 6" />;
    case "clapperboard":
      return (
        <>
          <path d="M4 11v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
          <path d="M4 11 2.5 5.5A1 1 0 0 1 3.5 4.2L20 8.5a1 1 0 0 1 .5 1.4L19.5 11" />
          <path d="m6.5 5.3 1.6 3.5" />
          <path d="m11 6.6 1.6 3.5" />
          <path d="m15.5 7.9 1.6 3.5" />
        </>
      );
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      );
    case "compress":
      return (
        <>
          <path d="M4 14h6v6" />
          <path d="M20 10h-6V4" />
          <path d="m14 10 7-7" />
          <path d="m3 21 7-7" />
        </>
      );
    case "envelope":
      return (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 7L2 7" />
        </>
      );
    case "expand":
      return (
        <>
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M21 3l-7 7" />
          <path d="M3 21l7-7" />
        </>
      );
    case "facebook":
      return (
        <path
          fill="currentColor"
          stroke="none"
          d="M14.5 8.5V6.8c0-.7.5-1.3 1.2-1.3H17V3h-2.2C12.3 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.4l.6-2.7h-3Z"
        />
      );
    case "file-pdf":
      return (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M10 13v4" />
          <path d="M10 13h1.2a1.3 1.3 0 0 1 0 2.6H10" />
          <path d="M14 17v-4h1.1a1.4 1.4 0 0 1 0 2.8H14" />
        </>
      );
    case "house":
      return (
        <>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-6h4v6" />
        </>
      );
    case "id-card":
      return (
        <>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <circle cx="8.5" cy="12" r="2" />
          <path d="M13 10h5" />
          <path d="M13 14h5" />
        </>
      );
    case "instagram":
      return (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </>
      );
    case "linkedin":
      return (
        <path
          fill="currentColor"
          stroke="none"
          d="M6.2 9.2H3.4V21h2.8V9.2ZM4.8 3.5A1.7 1.7 0 1 0 4.8 7a1.7 1.7 0 0 0 0-3.5ZM12.4 9.2H9.7V21h2.7v-6.2c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21H20v-6.8c0-3.6-1.9-5.2-4.5-5.2-2.1 0-3 1.2-3.1 1.2V9.2Z"
        />
      );
    case "location":
      return (
        <>
          <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      );
    case "magnifying-glass":
      return (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </>
      );
    case "magnifying-glass-minus":
      return (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M8 11h6" />
        </>
      );
    case "magnifying-glass-plus":
      return (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M8 11h6" />
          <path d="M11 8v6" />
        </>
      );
    case "moon":
      return (
        <path
          fill="none"
          d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z"
        />
      );
    case "phone":
      return (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9Z" />
      );
    case "play":
      return <path d="M8 5.5v13l11-6.5L8 5.5Z" fill="currentColor" stroke="none" />;
    case "rotate-left":
      return (
        <>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </>
      );
    case "share-nodes":
      return (
        <>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4" />
          <path d="m15.4 6.5-6.8 4" />
        </>
      );
    case "sun":
      return (
        <>
          <circle cx="12" cy="12" r="4" fill="none" />
          <path fill="none" d="M12 2v2" />
          <path fill="none" d="M12 20v2" />
          <path fill="none" d="m4.9 4.9 1.4 1.4" />
          <path fill="none" d="m17.7 17.7 1.4 1.4" />
          <path fill="none" d="M2 12h2" />
          <path fill="none" d="M20 12h2" />
          <path fill="none" d="m4.9 19.1 1.4-1.4" />
          <path fill="none" d="m17.7 6.3 1.4-1.4" />
        </>
      );
    case "x":
      return (
        <path
          fill="currentColor"
          stroke="none"
          d="M3 3h5.2l4 5.7L17.5 3H21l-6.8 8L21.2 21h-5.2l-4.3-6.1L6.5 21H3l7.1-9.1L3 3Z"
        />
      );
    case "xmark":
      return (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      );
    case "youtube":
      return (
        <path
          fill="currentColor"
          stroke="none"
          d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.8 12 4.8 12 4.8s-6.7 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.2 12a29 29 0 0 0 .3 4.8 2.8 2.8 0 0 0 2 2c1.8.4 8.5.4 8.5.4s6.7 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .3-4.8 29 29 0 0 0-.3-4.8ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z"
        />
      );
    case "behance":
      return (
        <>
          <path d="M3 6h5a3 3 0 0 1 0 6H3V6Zm0 6h6a3 3 0 0 1 0 6H3v-6Z" />
          <path d="M14 7.5h6M13.5 14.5h7a3.5 3.5 0 1 0-3.5 3.5c1.5 0 2.5-.6 3-1.5" />
        </>
      );
    case "dribbble":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M5.5 6.5c4 3 9 4 13 3M9 3.5c3 4 5 9 5.5 17M3.2 13c5-1 11-.5 16.5 3" />
        </>
      );
    case "google":
      return (
        <>
          <path d="M20 12a8 8 0 1 1-2.3-5.7" />
          <path d="M20.5 12H12" />
        </>
      );
    case "pinterest":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M10.5 20l1.8-7.5M9.5 12.5c-.8-2.5 1-4.5 3-4.5 2 0 3 1.5 2.7 3.2-.3 1.7-1.3 3-2.7 3-1 0-1.5-.7-1.5-1.5" />
        </>
      );
    case "tiktok":
      return (
        <path
          fill="currentColor"
          stroke="none"
          d="M16.6 3c.3 2.4 1.7 3.9 4 4.1v3.2c-1.5 0-2.9-.5-4-1.2v6.3c0 3.1-2.4 5.6-5.5 5.6S5.5 18.5 5.5 15.4c0-3.4 2.9-5.9 6.2-5.5v3.3c-1.6-.5-3.1.6-3.1 2.2 0 1.3 1 2.3 2.3 2.3 1.4 0 2.4-1 2.4-2.5V3h3.3Z"
        />
      );
    case "vimeo":
      return (
        <path d="M3 9l1.5 1c1-1.5 2-2 2.5-1s1 4 2 6.5S10.5 18 12 17s4-4 5-7.5S15.5 6 13.5 8" />
      );
    case "whatsapp":
      return (
        <>
          <path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4L3 21Z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2L9 9.5Z" />
        </>
      );
    default:
      return null;
  }
}

export function Icon({ name, size = 16, className = "", ...rest }: IconProps) {
  const brand =
    name === "facebook" ||
    name === "x" ||
    name === "youtube" ||
    name === "linkedin" ||
    name === "play";

  return (
    <svg
      className={["icon", className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={brand ? "none" : "currentColor"}
      strokeWidth={brand ? undefined : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths(name)}
    </svg>
  );
}
