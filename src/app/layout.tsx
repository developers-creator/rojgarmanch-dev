import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { getSettingsOrEmpty } from "@/lib/api";
import { UiProvider } from "@/components/providers/UiProvider";
import "./globals.css";

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rojgarmanch.com"),
  title: "रोजगार मञ्च — करियर र रोजगार पत्रिका",
  description:
    "रोजगार मञ्च — नेपालको करियर र रोजगार पत्रिका। रोजगार समाचार, अन्तर्वार्ता, सीप, वैदेशिक रोजगार र कार्यस्थल मार्गदर्शन।",
  robots: "index, follow, max-image-preview:large",
  openGraph: {
    type: "website",
    locale: "ne_NP",
    siteName: "रोजगार मञ्च",
    title: "रोजगार मञ्च — करियर र रोजगार पत्रिका",
    description:
      "रोजगार समाचार, अन्तर्वार्ता, सीप र करियर मार्गदर्शन — एकै ठाउँमा।",
    images: ["/images/rojgar-manch-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "रोजगार मञ्च — करियर र रोजगार पत्रिका",
    description: "रोजगार समाचार, अन्तर्वार्ता, सीप र करियर मार्गदर्शन।",
    images: ["/images/rojgar-manch-logo.png"],
  },
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    apple: [{ url: "/images/favicon.png", type: "image/png" }],
    shortcut: ["/images/favicon.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettingsOrEmpty();

  return (
    <html lang="ne" className={mukta.variable} suppressHydrationWarning>
      <body className={mukta.className} suppressHydrationWarning>
        <ThemeProvider>
          <SettingsProvider settings={settings}>
            <UiProvider>{children}</UiProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
