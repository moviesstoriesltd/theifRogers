"use client";

import NavBar from "../src/components/common/navbar/NavBar";
import Footer from "../src/components/common/footer/Footer";
import ScrollToTop from "../src/components/common/scrollToTop/ScrollToTop";
import Introduction from "../src/components/introduction/Introduction";
import Profile from "../src/components/profile/Profile";
import InfinityTimeline from "../src/components/infinityTimeline/InfinityTimeline";
import KeyFigures from "../src/components/keyFigures/KeyFigures";
import CaseRecords from "../src/components/caseRecords/CaseRecords";
import Testimonial from "../src/components/testimonial/Testimonial";
import Contact from "../src/components/contact/Contact";

export default function Page() {
  return (
    <div data-theme="light" className="relative">
      <NavBar />
      <div className="relative">
        <div className="introduction-profile-background">
          <div className="content">
            <Introduction />
            <Profile />
          </div>
        </div>
        <div className="bg-white pt-24 lg:pt-32">
          <InfinityTimeline />
        </div>
        <div className="bg-soft-white">
          <KeyFigures />
        </div>
        <CaseRecords />
        <Testimonial />
        <Contact />
      </div>
      <div className="bg-[#010f20] pt-24 md:pt-28">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
