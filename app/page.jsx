"use client";

import dynamic from "next/dynamic";
import NavBar from "../src/components/common/navbar/NavBar";
import Introduction from "../src/components/introduction/Introduction";
import Profile from "../src/components/profile/Profile";

const InfinityTimeline = dynamic(() => import("../src/components/infinityTimeline/InfinityTimeline"));
const KeyFigures = dynamic(() => import("../src/components/keyFigures/KeyFigures"));
const CaseRecords = dynamic(() => import("../src/components/caseRecords/CaseRecords"));
const Testimonial = dynamic(() => import("../src/components/testimonial/Testimonial"));
const Contact = dynamic(() => import("../src/components/contact/Contact"));
const Footer = dynamic(() => import("../src/components/common/footer/Footer"));
const ScrollToTop = dynamic(() => import("../src/components/common/scrollToTop/ScrollToTop"), {
  ssr: false,
});

export default function Page() {
  return (
    <div data-theme="light" className="relative">
      <NavBar />
      <main className="relative">
        <div className="introduction-profile-background">
          <div className="content">
            <Introduction />
            <Profile />
          </div>
        </div>
        <div className="bg-white pt-16 lg:pt-20">
          <InfinityTimeline />
        </div>
        <div className="bg-soft-white">
          <KeyFigures />
        </div>
        <CaseRecords />
        <Testimonial />
        <Contact />
      </main>
      <div className="bg-[#010f20] pt-16 md:pt-20">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
