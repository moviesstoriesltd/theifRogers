import "../index.css";
import { Work_Sans, Poppins, EB_Garamond } from "next/font/google";
import { SITE_NAME, SITE_ROUTES, SITE_URL } from "./site";
import {
  buildMetadata,
  breadcrumbSchema,
  graph,
  organizationSchema,
  personSchema,
  webPageSchema,
  websiteSchema,
} from "./seo";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-eb-garamond",
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  ...buildMetadata({
    title: SITE_ROUTES.home.title,
    description: SITE_ROUTES.home.description,
    path: SITE_ROUTES.home.path,
  }),
  title: {
    default: SITE_ROUTES.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  category: "public records",
  classification: "Public records archive and litigation research",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#010f20",
};

const rootJsonLd = graph(
  organizationSchema,
  personSchema,
  websiteSchema,
  webPageSchema({
    path: SITE_ROUTES.home.path,
    name: SITE_ROUTES.home.title,
    description: SITE_ROUTES.home.description,
    type: "CollectionPage",
  }),
  breadcrumbSchema([{ name: "Home", path: "/" }])
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${poppins.variable} ${ebGaramond.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
