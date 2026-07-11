import "../index.css";
import { Work_Sans, Poppins, EB_Garamond } from "next/font/google";

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
  title: "Thief Rogers MD / Dr. Leif Liu Rogers, MD",
  description:
    "A neutral documentary archive summarizing the investigative report on Dr. Leif Liu Rogers, MD, including licensing discipline, court filings, pending proceedings, and related public-record references.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${poppins.variable} ${ebGaramond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
