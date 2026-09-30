import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { UiProvider } from "@/components/providers/UiProvider";
import "./globals.css";

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const LCP_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=960&h=540&q=70";

export const metadata: Metadata = {
  metadataBase: new URL("https://rojgarmanch.com"),
  title: "रोजगार मञ्च — करियर र रोजगार पत्रिका",
  description:
    "रोजगार मञ्च — नेपालको करियर र रोजगार पत्रिका। रोजगार समाचार, अन्तर्वार्ता, सीप, वैदेशिक रोजगार र कार्यस्थल मार्गदर्शन।",
  keywords: [
    "रोजगार",
    "करियर",
    "जागिर",
    "नेपाल",
    "सीप",
    "अन्तर्वार्ता",
    "वैदेशिक रोजगार",
    "लोक सेवा",
    "तलब",
  ],
  authors: [{ name: "रोजगार मञ्च" }],
  robots: "index, follow, max-image-preview:large",
  alternates: { canonical: "https://rojgarmanch.com/" },
  openGraph: {
    type: "website",
    locale: "ne_NP",
    siteName: "रोजगार मञ्च",
    title: "रोजगार मञ्च — करियर र रोजगार पत्रिका",
    description:
      "रोजगार समाचार, अन्तर्वार्ता, सीप र करियर मार्गदर्शन — एकै ठाउँमा।",
    url: "https://rojgarmanch.com/",
    images: ["/images/rojgar-manch-logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "रोजगार मञ्च — करियर र रोजगार पत्रिका",
    description: "रोजगार समाचार, अन्तर्वार्ता, सीप र करियर मार्गदर्शन।",
    images: ["/images/rojgar-manch-logo.svg"],
  },
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    apple: [{ url: "/images/favicon.png", type: "image/png" }],
    shortcut: ["/images/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ne" className={mukta.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href={LCP_IMAGE} fetchPriority="high" />
      </head>
      <body className={mukta.className}>
        <ThemeProvider>
          <UiProvider>{children}</UiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
