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

// Shared react-scroll link (spy + smooth). `mobile` tweaks sizing for the
// dropdown; the active section is highlighted in the gold accent.
const NavLink = ({ item, mobile = false, onNavigate }) => (
  <Link
    onClick={onNavigate}
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu when clicking anywhere outside of it.
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e) => {
      if (!e.target.closest?.("[data-mobile-menu]")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

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
          <div className="relative lg:hidden" data-mobile-menu>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-lg px-2 py-1.5 cursor-pointer text-[#d5e3fc] hover:bg-white/5"
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
            </button>
            {menuOpen && (
              <ul className="absolute left-0 z-[1] mt-3 flex w-60 flex-col gap-1 rounded-2xl border border-white/10 bg-[#0d1c2e] p-3 shadow-2xl">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <NavLink item={item} mobile onNavigate={() => setMenuOpen(false)} />
                  </li>
                ))}
              </ul>
            )}
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
