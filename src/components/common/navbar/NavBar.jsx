"use client";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";

const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "Summary", url: "profile" },
  { id: 3, name: "Key Figures", url: "key-figures" },
  { id: 4, name: "Records", url: "records" },
  { id: 5, name: "Documents", url: "blog" },
];

const handleMenuClick = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

// Shared react-scroll link (spy + smooth). `mobile` tweaks sizing for the
// dropdown; the active section is highlighted in the gold accent.
const NavLink = ({ item, mobile = false }) => (
  <Link
    onClick={handleMenuClick}
    to={item.url.toLowerCase()}
    smooth={true}
    duration={1000}
    spy={true}
    offset={-140}
    activeClass="!text-[#e9c176] !font-semibold"
    className={`cursor-pointer uppercase tracking-[0.1em] text-[#c6c6cd] transition-colors hover:text-white ${
      mobile ? "block px-3 py-2 text-[13px]" : "text-[12px] font-semibold"
    }`}
  >
    {item.name}
  </Link>
);

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-[#010f20] transition-all duration-500 ${
        scrolled
          ? "border-white/10 shadow-lg shadow-black/30"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 sm:h-20 sm:px-8">
        {/* Left: mobile menu + brand */}
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-ghost btn-sm px-2 text-[#d5e3fc] hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-3 w-60 gap-1 rounded-2xl border border-white/10 bg-[#0d1c2e] p-3 shadow-2xl"
            >
              {navItems.map((item) => (
                <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
                  <NavLink item={item} mobile />
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="introduction"
            smooth={true}
            duration={900}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9c176]/40 bg-[#122032] text-[13px] font-semibold text-[#e9c176] sm:h-10 sm:w-10 sm:text-sm">
              LR
            </span>
            <span
              className="text-[20px] font-medium tracking-tight text-[#d5e3fc] sm:text-[26px]"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              Thief <span className="text-[#e9c176]">Rogers MD</span>
            </span>
          </Link>
        </div>

        {/* Center: desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </nav>

        {/* Right: CTA */}
        <Link
          to="contact"
          smooth={true}
          duration={900}
          className="cursor-pointer rounded-full bg-[#e9c176] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#412d00] shadow-lg shadow-[#e9c176]/20 transition-all hover:brightness-110 sm:px-6 sm:text-[12px]"
        >
          Submit
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
