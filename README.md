# Leif Rogers MD Public Records Archive | Next.js Litigation, Medical Board & OSINT Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111111)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/status-private_research_site-blue)](#project-status)
[![License](https://img.shields.io/badge/license-not_specified-lightgrey)](#license)

> **Meta description:** Next.js public-records archive for Leif Rogers MD with litigation reports, medical board history, OSINT dashboards, source links, and trusted SEO metadata.

## Overview

The **Leif Rogers MD Public Records Archive** is a private Next.js website for organizing
and presenting public-record research related to Dr. Leif L. Rogers. It combines a
search-optimized public landing page, an interactive litigation and asset due-diligence
report, and an OSINT-style profile dashboard backed by local JSON and document research
files.

The project is built for investigators, researchers, legal-support teams, compliance
reviewers, and technical stakeholders who need a structured way to review court records,
medical board history, civil litigation references, property and lien research leads, and
source-linked public-record summaries in a responsive web interface.

## Value Proposition

This repository solves a common public-records publishing problem: scattered source
material is difficult to review, search, verify, and explain. The application turns that
material into a navigable documentary website with clear routes, structured sections,
metadata, source references, and reusable React components.

Key strengths include:

- **Search-focused information architecture** for Google indexing and GitHub discovery.
- **Public-record and litigation report presentation** with source links and reliability notes.
- **Medical board and court-record context** organized into readable sections.
- **OSINT dashboard workflow** for addresses, phones, emails, aliases, associates, property,
  security exposure, and raw JSON review.
- **Next.js metadata, sitemap, and robots support** for production SEO readiness.
- **Responsive React UI** for desktop, tablet, and mobile review.

## Core Pages

| Route | Purpose | Primary Search Intent |
| --- | --- | --- |
| `/` | Public-facing archive homepage with profile, timeline, key figures, case records, and contact sections. | Leif Rogers MD public records, Leif Rogers lawsuit, Leif Rogers medical board |
| `/report` | Litigation and asset due-diligence report with confirmed matters, investigation leads, source index, and print-friendly controls. | Leif Rogers litigation report, court filings, asset due diligence |
| `/about` | OSINT intelligence dashboard sourced from `Leif_L_Rogers.json`, including profile, timeline, addresses, phones, emails, property, associates, aliases, security, and raw JSON. | Leif Rogers public-record dashboard, OSINT profile, public records research |
| `/sitemap.xml` | Generated sitemap from the Next.js App Router. | Search engine crawl discovery |
| `/robots.txt` | Robots configuration pointing crawlers to the sitemap. | Crawl policy and indexing |

## Features

- Interactive public-record archive for Dr. Leif L. Rogers.
- Litigation and asset due-diligence report page with expandable matter summaries.
- Lead-by-lead investigation matrix for court, finance, lien, property, and entity research.
- Searchable OSINT profile dashboard driven by local JSON data.
- Report export and print-oriented views.
- Canonical URL, Open Graph, Twitter card, robots, and sitemap configuration.
- JSON-LD website schema in the root layout.
- Reusable React components for navigation, timeline, key figures, records, testimonials,
  contact sections, dashboard panels, badges, cards, search, and toast notifications.
- Mobile-responsive layout with Tailwind CSS and animated interactions through Framer Motion.

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 15 App Router |
| UI Runtime | React 19, React DOM 19 |
| Styling | Tailwind CSS 4, custom CSS |
| Animation | Framer Motion |
| Icons | Font Awesome |
| UI Helpers | Swiper, React Fast Marquee, React Scroll, React Spinners |
| Tooling | ESLint, PostCSS |
| Package Manager | npm |

## Requirements

- Node.js compatible with Next.js 15
- npm
- Local access to the repository files and research artifacts

## Installation

Clone or open the project directory, then install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Run the production server after a successful build:

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

## Configuration

Set the public site URL before deployment so canonical URLs, Open Graph tags, Twitter cards,
robots.txt, and the sitemap point to the correct production domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If the project is deployed on Vercel, `VERCEL_PROJECT_PRODUCTION_URL` can be used as a
fallback. If neither environment variable is set, `app/site.js` falls back to
`https://example.com`.

Shared site identity is managed in:

```text
app/site.js
```

That file exports:

- `SITE_URL`
- `SITE_NAME`
- `SITE_DESCRIPTION`

## API Documentation

This project does not currently expose a public API. Data is imported from local files and
rendered through Next.js pages and React components.

Current local data sources include:

- `Leif_L_Rogers.json` for the `/about` dashboard.
- Embedded report data in `app/report/page.jsx`.
- Supporting research files in the repository root, including `.docx`, `.pdf`, `.json`, and
  exported `.html` artifacts.

## Project Structure

```text
app/
  about/
    _components/       Dashboard data shaping, panels, sections, and UI primitives
    layout.jsx         Metadata for the OSINT profile dashboard
    page.jsx           Searchable public-record dashboard
  report/
    layout.jsx         Metadata for the litigation report
    page.jsx           Interactive litigation and asset due-diligence report
  layout.jsx           Root layout, fonts, metadata, robots policy, and JSON-LD
  page.jsx             Homepage route
  robots.js            Robots configuration
  sitemap.js           Sitemap generation
  site.js              Shared site URL and identity settings

src/
  assets/images/       Site images and report graphics
  components/          Homepage sections, navigation, footer, contact, timeline, records

docs/                  SEO documentation and project notes
public/                Static public assets
```

## SEO Strategy

The README is optimized for GitHub search and external search indexing with natural,
high-intent keyword placement. Primary keyword clusters include:

- Leif Rogers MD public records
- Leif Rogers litigation report
- Leif Rogers medical board
- court records and public-record archive
- OSINT dashboard and public-record dashboard
- Next.js public records website
- litigation and asset due diligence
- medical board discipline and court filings

The README uses these terms in the H1, overview, route table, features, technical sections,
and documentation links while preserving readable professional English. See the companion
strategy document at [docs/readme-seo-keyword-strategy.md](docs/readme-seo-keyword-strategy.md).

## Related Documentation

- [README SEO Keyword Strategy](docs/readme-seo-keyword-strategy.md)
- [README Before/After Comparison](docs/readme-before-after-comparison.md)
- [README Performance Metrics Prediction](docs/readme-performance-metrics-prediction.md)
- [SEO Public Records Workshop](docs/seo-public-records-workshop.md)

## Content Accuracy Notes

Public-record websites require careful source handling. This project should distinguish
between documented findings, pending matters, allegations, secondary reporting, and
unverified leads. Before publication or promotion, review source records, court dockets,
medical board documents, and current public indexes for accuracy.

Recommended editorial safeguards:

- Attribute claims to named sources.
- Label allegations and pending matters clearly.
- Avoid presenting unverified leads as established facts.
- Re-check active cases and license-status references before deployment.
- Keep `SITE_DESCRIPTION`, route metadata, and visible page copy aligned.

## Contributing

This is currently a private research website. If contributing internally:

1. Create a focused branch for the change.
2. Keep source-data updates separate from UI-only changes when possible.
3. Run `npm run lint` before review.
4. Verify affected routes on desktop and mobile.
5. Update this README or the supporting docs when routes, data sources, scripts, or SEO
   behavior changes.

## Changelog

### 0.0.0

- Private Next.js project with homepage, litigation report, OSINT dashboard, sitemap,
  robots configuration, metadata, and local research artifacts.
- README rewritten for technical clarity, professional formatting, and SEO discovery.

## Project Status

The package is marked `private` in `package.json`. The current version is `0.0.0`.

## License

No license file is currently included in this repository. Unless a license is added, the
project should be treated as proprietary/private and not open for reuse by default.
