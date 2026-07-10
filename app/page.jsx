"use client";

import NavBar from "../src/components/common/navbar/NavBar";
import Footer from "../src/components/common/footer/Footer";
import ScrollToTop from "../src/components/common/scrollToTop/ScrollToTop";
import Introduction from "../src/components/introduction/Introduction";
import Profile from "../src/components/profile/Profile";
import KeyFigures from "../src/components/keyFigures/KeyFigures";
import WorkTogether from "../src/components/workTogether/WorkTogether";
import CaseRecords from "../src/components/caseRecords/CaseRecords";
import Blog from "../src/components/blog/Blog";
import Profession from "../src/components/profession/Profession";
import HappyClients from "../src/components/happyClients/HappyClients";
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
        <div className="bg-soft-white pt-30">
          <KeyFigures />
        </div>
        <div className="bg-gray-900">
          <WorkTogether />
        </div>
        <CaseRecords />
        <div className="blog-background">
          <Blog />
        </div>
        <div className="bg-soft-white">
          <Profession />
        </div>
        <HappyClients />
        <Testimonial />
        <Contact />
      </div>
      <div className="bg-[#111827]">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
