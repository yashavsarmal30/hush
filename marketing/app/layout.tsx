import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hush.dev"),
  title: "Hush — Unbound Edge-Native Voice Engine | 100% Offline Dictation",
  description: "A fast, private, 100% offline alternative to Wispr Flow and Dragon. Types anywhere at your cursor using Intel OpenVINO int8 Whisper on CPU. Zero cloud streaming, zero telemetry, zero accounts.",
  keywords: [
    "offline voice typing",
    "wispr flow alternative",
    "edge native voice engine",
    "local speech to text",
    "openvino whisper cpu",
    "private dictation software",
    "open source voice typing",
    "dragon naturally speaking alternative",
    "voice typing windows 11",
    "hindi voice typing offline",
    "hinglish speech to text",
    "sendinput cursor injection",
    "offline ai voice engine"
  ],
  authors: [{ name: "Yash Avsarmal", url: "https://github.com/yashavsarmal30" }],
  creator: "Yash Avsarmal",
  publisher: "Hush",
  alternates: {
    canonical: "https://hush.dev",
  },
  openGraph: {
    title: "Hush — Unbound Edge-Native Voice Engine | 100% Offline Dictation",
    description: "100% offline speech-to-text running directly on your CPU with Intel OpenVINO int8. Injects keystrokes directly at your active cursor with zero cloud and zero telemetry.",
    url: "https://hush.dev",
    siteName: "Hush Voice Engine",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Hush — Unbound Edge-Native Voice Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hush — Unbound Edge-Native Voice Engine | 100% Offline Dictation",
    description: "Fast, private, 100% offline alternative to Wispr Flow & Dragon. Types at your cursor via OpenVINO int8 Whisper on CPU. Zero cloud, zero telemetry.",
    images: ["/social-preview.png"],
    creator: "@yashavsarmal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/hush.ico" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/logo.png" }
    ],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://hush.dev/#software",
        "name": "Hush",
        "alternateName": "Hush Voice Engine",
        "operatingSystem": "Windows 10, Windows 11, Linux",
        "applicationCategory": "UtilityApplication",
        "applicationSubCategory": "Voice Recognition Software",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "description": "Unbound Edge-Native Voice Engine. A fast, private, 100% offline alternative to cloud dictation tools like Wispr Flow and Dragon. Zero cloud, zero account, zero telemetry.",
        "softwareVersion": "1.0.0",
        "downloadUrl": "https://github.com/yashavsarmal30/hush/releases/latest",
        "author": {
          "@type": "Person",
          "name": "Yash Avsarmal",
          "url": "https://github.com/yashavsarmal30"
        },
        "featureList": [
          "100% Offline Speech-to-Text via Intel OpenVINO int8 Whisper",
          "Direct Active Cursor Keystroke Injection (Win32 SendInput)",
          "Zero Cloud Audio Streaming and Zero Telemetry",
          "Dual Dictation Modes: Hold-to-Talk (Ctrl+Win) & Hands-Free (Ctrl+Alt+D)",
          "English, Hindi, and Hinglish Auto-detection with Devanagari Normalization",
          "Floating Transparent Capsule with 18-bar Reactive Waveform",
          "Custom Dictionary and Pronunciation Replacement"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://hush.dev/#website",
        "url": "https://hush.dev",
        "name": "Hush Voice Engine",
        "description": "Official marketing site for Hush — Unbound Edge-Native Voice Engine."
      }
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white selection:bg-white selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}
