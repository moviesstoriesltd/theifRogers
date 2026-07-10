import "../index.css";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });

export const metadata = {
  title: "Theif Rogers MD / Dr. Leif Liu Rogers, MD",
  description:
    "A neutral documentary archive summarizing the investigative report on Dr. Leif Liu Rogers, MD, including licensing discipline, court filings, pending proceedings, and related public-record references.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={workSans.variable}>
      <body>{children}</body>
    </html>
  );
}
