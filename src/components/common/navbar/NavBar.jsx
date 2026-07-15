"use client";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

// Items with `url` are homepage sections; items with `href` are standalone routes.
const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "Summary", url: "profile" },
  { id: 3, name: "Key Figures", url: "key-figures" },
  { id: 4, name: "Records", url: "records" },
  { id: 5, name: "Documents", url: "blog" },
  { id: 6, name: "Report", href: "/report" },
];

// Shared nav link. On the homepage it uses react-scroll (spy + smooth); on any
// other route it routes to `/#section` so the same links keep working.
// Route items (`item.href`) always render a plain NextLink.
const NavLink = ({ item, mobile = false, onNavigate, onHome, pathname }) => {
  const className = `cursor-pointer uppercase tracking-[0.1em] text-[#c6c6cd] transition-colors hover:text-white ${
    mobile ? "block px-3 py-2 text-[13px]" : "text-[12px] font-semibold"
  }`;

  if (item.href) {
    const active = pathname === item.href;
    return (
      <NextLink
        onClick={onNavigate}
        href={item.href}
        className={`${className} ${active ? "!font-semibold !text-[#e9c176]" : ""}`}
      >
        {item.name}
      </NextLink>
    );
  }

  if (!onHome) {
    return (
      <NextLink onClick={onNavigate} href={`/#${item.url.toLowerCase()}`} className={className}>
        {item.name}
      </NextLink>
    );
  }

  return (
    <Link
      onClick={onNavigate}
      to={item.url.toLowerCase()}
      smooth={true}
      duration={1000}
      spy={true}
      offset={-140}
      activeClass="!text-[#e9c176] !font-semibold"
      className={className}
    >
      {item.name}
    </Link>
  );
};

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  const brandContent = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9c176]/40 bg-[#122032] text-[13px] font-semibold text-[#e9c176] sm:h-10 sm:w-10 sm:text-sm">
        LR
      </span>
      <span
        className="text-[20px] font-medium tracking-tight text-[#d5e3fc] sm:text-[26px]"
        style={{ fontFamily: "var(--font-eb-garamond), serif" }}
      >
        Leif <span className="text-[#e9c176]">Rogers MD</span>
      </span>
    </>
  );

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
                    <NavLink
                      item={item}
                      mobile
                      onHome={onHome}
                      pathname={pathname}
                      onNavigate={() => setMenuOpen(false)}
                    />
                  </li>
                ))}
                <li>
                  <NextLink
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#e9c176] transition-colors hover:text-white"
                  >
                    Personal Data
                  </NextLink>
                </li>
              </ul>
            )}
          </div>

          {onHome ? (
            <Link
              to="introduction"
              smooth={true}
              duration={900}
              aria-label="Go to Leif Rogers public records homepage"
              className="flex cursor-pointer items-center gap-3"
            >
              {brandContent}
            </Link>
          ) : (
            <NextLink href="/" className="flex cursor-pointer items-center gap-3">
              {brandContent}
            </NextLink>
          )}
        </div>

        {/* Center: desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} onHome={onHome} pathname={pathname} />
          ))}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NextLink
            href="/about"
            className="hidden cursor-pointer rounded-full border border-[#e9c176]/40 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e9c176] transition-colors hover:bg-[#e9c176]/10 sm:inline-flex sm:px-6 sm:text-[12px]"
          >
            Personal Data
          </NextLink>
          {onHome ? (
            <Link
              to="contact"
              smooth={true}
              duration={900}
              className="cursor-pointer rounded-full bg-[#e9c176] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#412d00] shadow-lg shadow-[#e9c176]/20 transition-all hover:brightness-110 sm:px-6 sm:text-[12px]"
            >
              Submit
            </Link>
          ) : (
            <NextLink
              href="/#contact"
              className="cursor-pointer rounded-full bg-[#e9c176] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#412d00] shadow-lg shadow-[#e9c176]/20 transition-all hover:brightness-110 sm:px-6 sm:text-[12px]"
            >
              Submit
            </NextLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
