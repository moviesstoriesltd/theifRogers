const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "Summary", url: "profile" },
  { id: 3, name: "Key Figures", url: "key-figures" },
  { id: 4, name: "Records", url: "records" },
  { id: 5, name: "Documents", url: "blog" },
  { id: 6, name: "Topics", url: "services" },
  { id: 7, name: "Submit", url: "contact" },
];
const copyrightYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#010f20] text-[#c6c6cd]">
      <div className="content mx-auto px-4 py-14 max-2xl:px-4 sm:px-8 md:py-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <a href="#introduction" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9c176]/40 bg-[#122032] text-sm font-semibold text-[#e9c176]">
              LR
            </span>
            <span
              className="text-[24px] font-medium tracking-tight text-[#d5e3fc] sm:text-[28px]"
              style={{ fontFamily: "var(--font-eb-garamond), serif" }}
            >
              Thief <span className="text-[#e9c176]">Rogers MD</span>
            </span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.url.toLowerCase()}`}
                className="group relative text-[12px] font-semibold uppercase tracking-[0.1em] text-[#c6c6cd] transition-colors hover:text-[#e9c176]"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#e9c176] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
        </div>

        {/* Divider + fine print */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:justify-between">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#909097]">
            &copy; {copyrightYear} Public Records Archive
          </p>
          <p className="max-w-xl text-[12px] leading-relaxed text-[#909097]">
            Documentary public-information website based on the provided
            investigative report.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
