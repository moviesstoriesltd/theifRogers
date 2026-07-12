import { SITE_NAME } from "../site";

export const metadata = {
  title: "Intelligence Profile — Leif L. Rogers Public-Record Dashboard",
  description:
    "Interactive public-record intelligence dashboard for Dr. Leif L. Rogers: addresses, phones, emails, aliases, relatives, associates, property, and breach exposure — compiled from public sources.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    siteName: SITE_NAME,
    title: "Intelligence Profile — Leif L. Rogers Public-Record Dashboard",
    description:
      "Interactive public-record intelligence dashboard for Dr. Leif L. Rogers, compiled from public sources.",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
