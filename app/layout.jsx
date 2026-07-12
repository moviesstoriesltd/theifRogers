import "../index.css";
import { Work_Sans, Poppins, EB_Garamond } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./site";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-eb-garamond",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thief Rogers MD — Public Record Archive on Dr. Leif L. Rogers, MD",
    template: "%s · Thief Rogers MD",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Leif Rogers MD",
    "Dr. Leif Rogers",
    "Leif Rogers plastic surgeon",
    "Leif Rogers lawsuit",
    "Leif Rogers medical board",
    "GoodSkin Clinic",
    "public records",
    "malpractice",
  ],
  authors: [{ name: "Public Records Archive" }],
  creator: "Public Records Archive",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Thief Rogers MD — Public Record Archive on Dr. Leif L. Rogers, MD",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thief Rogers MD — Public Record Archive",
    description: SITE_DESCRIPTION,
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/logo.svg" },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#010f20",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#publisher` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#publisher`,
      name: "Public Records Archive",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${poppins.variable} ${ebGaramond.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
