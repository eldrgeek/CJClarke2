# CONTENT\_AND\_RENDER\_SPEC.md

## 0) Purpose

This document defines the **content** and the **rendering spec** for the CJ Clarke for City Council website. It includes:

1. The canonical content for each page (English), a Spanish landing page (`/es`), and seed Issues & News.
2. A content format (front‑matter + Markdown).
3. A rendering module spec (interfaces + behavior) so a coding model can parse, route, and display the content in a dynamic site.

---

## 1) Content Model & Format

### 1.1 File format

Each page or entry is a Markdown file with YAML front‑matter:

```md
---
type: "page" | "issue" | "news"                # required
slug: "route-or-unique-slug"                   # required for collection entries
title: "Page Title"                            # required
summary: "Short one-liner for previews."       # optional
lang: "en" | "es"                               # default "en"
date: "YYYY-MM-DD"                             # required for news
priority: 1                                    # optional for issues (sort asc)
hero:
  image: "/uploads/hero.jpg"
  alt: "Descriptive alt text"
cta:
  primary:
    label: "Donate"
    href: "/donate"
  secondary:
    label: "Volunteer"
    href: "/get-involved"
seo:
  title: "Custom <title> if needed"
  description: "Meta description ~150 chars"
  image: "/uploads/og.jpg"
schema:
  type: "Person|Organization|Event"            # for JSON-LD
  data: { ... }                                # arbitrary JSON
---
# Markdown body starts here...
```

Internal links use **absolute** paths (e.g., `/issues/public-safety`) or hash anchors (e.g., `/issues/public-safety#traffic-calming`).

### 1.2 Collections & Routes

* **Pages** (singletons): `/` (Home), `/meet`, `/issues` (index), `/get-involved`, `/donate`, `/donate/success`, `/contact`, `/es` (Spanish landing).
* **Issues** (collection): `/issues/:slug`
* **News** (collection): `/news/:yyyy-:mm-:dd-:slug`

---

## 2) Site Navigation

* Header: `Home`, `Meet Chris`, `Issues`, `News`, `Get Involved`, **Donate** (primary button), `ES` (Spanish).
* Footer: © year, "Paid for by CJ Clarke for City Council", contact email/PO Box, social links.

---

## 3) Page Content (English)

> Save each as a file in your content system (e.g., `src/content/...`). The renderer spec (Section 6) describes how to load and route them.

### 3.1 Home (`/`)

```md
---
type: "page"
slug: "/"
title: "A Healthier, Safer Sheridan"
summary: "Local small‑business owner, youth mentor, and neighbor — ready to deliver practical results on council."
hero:
  image: "/uploads/home-hero.jpg"
  alt: "CJ Clarke speaking with Sheridan neighbors at a community event"
cta:
  primary: { label: "Donate", href: "/donate" }
  secondary: { label: "Volunteer", href: "/get-involved" }
seo:
  description: "CJ Clarke for Sheridan City Council: safer streets, youth programs, and support for small businesses."
schema:
  type: "Person"
  data:
    name: "Chris (CJ) Clarke"
    jobTitle: "Candidate for Sheridan City Council"
    url: "https://example.org/"
    sameAs: []
---

**A Healthier, Safer Sheridan**

Chris "CJ" Clarke is a local small‑business owner, world‑class martial‑arts instructor, and youth mentor. He's running for City Council to bring practical, community‑first leadership to City Hall.

### Our Priorities
- **Support small businesses & safe streets.** Help local entrepreneurs thrive while making it safer to walk, bike, and drive.
- **Invest in youth programs & parks.** Expand after‑school options, scholarships, and recreation.
- **Common‑sense budgeting & transparency.** Focus on essentials, measure results, and communicate clearly.

**Get to know CJ on the [Meet Chris](/meet) page** or read about his [plan for Sheridan](/issues). Ready to help? **[Volunteer](/get-involved)** or **[Donate](/donate)** today.
```

---

### 3.2 Spanish Landing (`/es`)

```md
---
type: "page"
slug: "/es"
title: "Un Sheridan más saludable y seguro"
lang: "es"
summary: "Propietario local, mentor de jóvenes y vecino — listo para servir en el concejo."
hero:
  image: "/uploads/home-hero.jpg"
  alt: "CJ Clarke conversa con vecinos de Sheridan en un evento comunitario"
cta:
  primary: { label: "Donar", href: "/donate" }
  secondary: { label: "Ser voluntario", href: "/get-involved" }
seo:
  description: "CJ Clarke para el Concejo Municipal de Sheridan: calles seguras, programas para jóvenes y apoyo a negocios locales."
---

**Un Sheridan más saludable y seguro**

Chris "CJ" Clarke es propietario de un pequeño negocio local, instructor de artes marciales de clase mundial y mentor de jóvenes. Se postula al Concejo para aportar liderazgo práctico y centrado en la comunidad.

### Nuestras Prioridades
- **Apoyar a los pequeños negocios y calles seguras.**
- **Invertir en programas juveniles y parques.**
- **Presupuesto con sentido común y transparencia.**

Conozca a CJ en [Conozca a Chris](/meet) o lea su [plan para Sheridan](/issues). ¿Quiere ayudar? **[Ser voluntario](/get-involved)** o **[Donar](/donate)**.
```

---

### 3.3 Meet Chris (`/meet`)

```md
---
type: "page"
slug: "/meet"
title: "Meet Chris (CJ) Clarke"
summary: "Small‑business owner, youth mentor, and community builder."
hero:
  image: "/uploads/meet-hero.jpg"
  alt: "CJ Clarke teaching a youth class at his dojo"
cta:
  primary: { label: "Get Involved", href: "/get-involved" }
seo:
  description: "Learn about CJ Clarke's background as a small‑business owner, martial‑arts instructor, and community mentor."
---

## Meet Chris (CJ) Clarke

CJ is a local small‑business owner (Chi Life Movement), a world‑renowned martial‑arts instructor, and a youth mentor. He began training as a child and has spent decades teaching discipline, balance, and confidence to students of all ages. Through his dojo, he runs youth programs that help kids build healthy habits and resilience.

### Why He's Running
CJ is running for City Council to strengthen public safety, expand youth opportunities, support small businesses, and keep budgets disciplined and transparent.

### A Mentor and Community Builder
At the dojo, CJ creates a welcoming, family‑oriented space where kids and adults learn practical skills and mental focus. He believes city government should approach public service with the same values: preparation, accountability, and teamwork.

- Learn more about [Our Priorities](/issues).
- Ready to help? Visit [Get Involved](/get-involved) or [Donate](/donate).
```

---

### 3.4 Issues Index (`/issues`)

```md
---
type: "page"
slug: "/issues"
title: "Issues & Priorities"
summary: "Clear goals for safer streets, opportunity for youth, and support for local businesses."
hero:
  image: "/uploads/issues-hero.jpg"
  alt: "Sheridan neighborhood street and local storefronts"
seo:
  description: "CJ Clarke's priorities: public safety, youth programs, small business support, and transparent budgeting."
---

## Issues & Priorities

Below are the core priorities CJ will focus on. Click any topic to read more.

- [Public Safety & Safe Streets](/issues/public-safety)
- [Youth Programs & Parks](/issues/youth-programs)
- [Small Business & Local Economy](/issues/local-economy)
- [Accountability & Budget Transparency](/issues/accountability)
```

---

### 3.5 Issue Detail — Public Safety & Safe Streets (`/issues/public-safety`)

```md
---
type: "issue"
slug: "public-safety"
title: "Public Safety & Safe Streets"
priority: 1
summary: "Practical, community‑oriented safety: better lighting, traffic calming near schools, and coordination with regional partners."
hero:
  image: "/uploads/issue-safety.jpg"
  alt: "A Sheridan crosswalk near a school"
seo:
  description: "CJ Clarke will improve neighborhood safety with targeted traffic calming, safer crossings, and community partnerships."
---

## Public Safety & Safe Streets

Everyone should feel safe walking, biking, or driving in Sheridan. CJ's approach is practical and community‑oriented.

### Targeted Traffic Calming {#traffic-calming}
- Work with neighborhoods to identify dangerous corridors near schools and parks.
- Use low‑cost tools like paint, signage, and flexible bollards to slow speeds.

### Safer Crossings & Lighting {#crossings-lighting}
- Improve crosswalk visibility with daylighting, lighting, and curb extensions.
- Prioritize quick‑build solutions while planning permanent upgrades.

### Coordination with Regional Partners {#regional}
- Collaborate with county and state partners on high‑injury corridors.
- Pursue grants to fund safety improvements.

**Related:** [Accountability & Budget Transparency](/issues/accountability)
```

---

### 3.6 Issue Detail — Youth Programs & Parks (`/issues/youth-programs`)

```md
---
type: "issue"
slug: "youth-programs"
title: "Youth Programs & Parks"
priority: 2
summary: "Expand after‑school programs and scholarships by partnering with schools, nonprofits, and local businesses."
hero:
  image: "/uploads/issue-youth.jpg"
  alt: "Kids playing in a Sheridan park"
seo:
  description: "CJ Clarke will expand youth opportunities through after‑school programs, scholarships, and park investments."
---

## Youth Programs & Parks

Kids succeed when they have safe places to learn, play, and grow.

### After‑School & Weekend Options {#after-school}
- Partner with schools, nonprofits, and local businesses to expand offerings.
- Support scholarships so cost isn't a barrier to participation.

### Parks & Recreation {#parks}
- Maintain and enhance parks as community hubs.
- Ensure programming includes fitness, arts, and cultural activities.

**Related:** [Small Business & Local Economy](/issues/local-economy)
```

---

### 3.7 Issue Detail — Small Business & Local Economy (`/issues/local-economy`)

```md
---
type: "issue"
slug: "local-economy"
title: "Small Business & Local Economy"
priority: 3
summary: "Cut red tape, revitalize commercial corridors, and support entrepreneurs."
hero:
  image: "/uploads/issue-economy.jpg"
  alt: "Local storefronts in Sheridan"
seo:
  description: "CJ Clarke will champion small businesses with streamlined permits, corridor revitalization, and local spending."
---

## Small Business & Local Economy

Entrepreneurs are the backbone of Sheridan's economy.

### Streamlined Permits & Licensing {#permits}
- Make it easier for small businesses to start and grow.
- Improve communication and guidance for first‑time applicants.

### Revitalize Commercial Corridors {#corridors}
- Focus on clean, well‑lit, walkable streets that attract customers.
- Encourage local spending and pop‑up events.

**Related:** [Public Safety & Safe Streets](/issues/public-safety)
```

---

### 3.8 Issue Detail — Accountability & Budget Transparency (`/issues/accountability`)

```md
---
type: "issue"
slug: "accountability"
title: "Accountability & Budget Transparency"
priority: 4
summary: "Focus on essentials, measure results, and share progress with residents."
hero:
  image: "/uploads/issue-accountability.jpg"
  alt: "City budget documents on a table"
seo:
  description: "CJ Clarke will prioritize essential services and transparent reporting, with clear metrics and regular updates."
---

## Accountability & Budget Transparency

Residents deserve a clear view into how decisions are made and dollars are spent.

### Focus on Essentials {#essentials}
- Prioritize public safety, infrastructure, and parks.
- Evaluate programs based on outcomes, not promises.

### Clear Communication {#communication}
- Share easy‑to‑read summaries of projects and budgets.
- Hold regular office hours and community updates.

**Related:** [Issues & Priorities](/issues)
```

---

### 3.9 News Index (`/news`)

```md
---
type: "page"
slug: "/news"
title: "News & Updates"
summary: "Campaign announcements, community events, and press."
seo:
  description: "Stay up to date with the CJ Clarke campaign's announcements and community events."
---

## News & Updates

Read the latest from the campaign:

- [Kickoff House Chat Announced](/news/2025-08-10-kickoff-house-chat)
- [Volunteer Weekend Launch](/news/2025-08-15-volunteer-weekend)
```

---

### 3.10 News Item — Kickoff House Chat

```md
---
type: "news"
slug: "kickoff-house-chat"
date: "2025-08-10"
title: "Kickoff House Chat Announced"
summary: "Join CJ and neighbors to talk priorities for a healthier, safer Sheridan."
seo:
  description: "Kickoff house chat with CJ Clarke — share your ideas and get involved."
---

**Kickoff House Chat Announced**

Join CJ and neighbors for a conversation about priorities for Sheridan. We'll discuss safer streets, youth programs, and how to support local businesses.

- **When:** Thursday, August 21, 6:30–8:00 PM
- **Where:** Host address (RSVP for details)

**RSVP:** Head to [Get Involved](/get-involved) and mention "House Chat".
```

---

### 3.11 News Item — Volunteer Weekend

```md
---
type: "news"
slug: "volunteer-weekend"
date: "2025-08-15"
title: "Volunteer Weekend Launch"
summary: "Help us knock doors, make calls, and spread the word."
seo:
  description: "Volunteer Weekend — join the CJ Clarke campaign team and make an impact."
---

**Volunteer Weekend Launch**

Help us kick off canvassing and phone banking. Whether you have an hour or a day, your time makes a difference.

- **Canvass:** Saturday 10am & 1pm
- **Phone Bank:** Sunday 4pm
- **Meet‑up:** See details when you sign up

**Sign up:** Visit [Get Involved](/get-involved).
```

---

### 3.12 Get Involved (`/get-involved`)

```md
---
type: "page"
slug: "/get-involved"
title: "Get Involved"
summary: "Volunteer, host a house chat, or request a yard sign."
seo:
  description: "Join the CJ Clarke campaign — volunteer, host an event, or get a yard sign."
---

## Get Involved

There are many ways to help:

- **Volunteer:** Knock doors, make calls, or help at events.
- **Host a house chat:** Invite neighbors to meet CJ.
- **Yard signs:** Show your support on your block.

Fill out the form below and we'll follow up. Prefer email? Reach us at **info@cjclarkeforcouncil.org**.

[Back to Home](/)
```

---

### 3.13 Donate (`/donate`) & Success (`/donate/success`)

```md
---
type: "page"
slug: "/donate"
title: "Donate"
summary: "Chip in to help us reach more voters."
seo:
  description: "Donate to help CJ Clarke reach more Sheridan voters."
---

## Donate

Your contribution powers field outreach, literature, and community events. Thank you!

- Choose an amount and proceed to our secure checkout.
- Contributions may be subject to local limits and reporting. (Insert legal disclaimer text.)

[Back to Home](/)
```

```md
---
type: "page"
slug: "/donate/success"
title: "Thank you!"
summary: "Your donation makes a difference."
seo:
  description: "Thank you for supporting the CJ Clarke campaign."
---

## Thank you!

Your support helps us reach more Sheridan voters.

[Back to Home](/)
```

---

### 3.14 Contact (`/contact`)

```md
---
type: "page"
slug: "/contact"
title: "Contact"
summary: "Reach the campaign team."
seo:
  description: "Contact the CJ Clarke campaign."
---

## Contact

Have a question or a media request? Send us a message and we'll get back to you soon.

- **Email:** info@cjclarkeforcouncil.org
- **Mailing Address:** PO Box TBD, Sheridan, CO

[Back to Home](/)
```

---

## 4) Global Elements (copy)

* **Footer disclaimer:** "Paid for by CJ Clarke for City Council."
* **Socials:** placeholders for Facebook, Instagram, X (to be filled when accounts are ready).
* **Analytics:** GA4 or Plausible (toggle via config).

---

## 5) Internal Link Map

* `/` links to `/meet`, `/issues`, `/get-involved`, `/donate`, `/news`.
* `/es` mirrors `/` CTAs; back to `/`.
* `/meet` links to `/issues`, `/get-involved`, `/donate`.
* `/issues` index links to each detail: `/issues/public-safety`, `/issues/youth-programs`, `/issues/local-economy`, `/issues/accountability`.
* Each issue detail links back to `/issues` and a related issue.
* `/news` links to news detail pages; each detail links to `/get-involved`.
* `/get-involved`, `/donate`, `/contact` link back to `/`.

---

## 6) Rendering Module Spec

> The coding model should implement a module that loads this content (files), parses front‑matter + Markdown, and renders routed pages. Below are the required responsibilities and interfaces.

### 6.1 Responsibilities

1. **Content Loading**

   * Read all `.md` files from a configurable content root.
   * Parse YAML front‑matter and Markdown to HTML (use a safe renderer).
   * Validate required fields by `type` (e.g., `news` requires `date`).
   * Build in‑memory indexes:

     * `pagesBySlug` for singleton pages (key = absolute route).
     * `issues[]` sorted by `priority` (asc).
     * `news[]` sorted by `date` (desc).

2. **Routing**

   * Map `page.slug` to route (e.g., `/`, `/meet`, `/es`).
   * Map `issue.slug` to `/issues/:slug`.
   * Map `news` with `date` + `slug` to `/news/YYYY-MM-DD-slug`.

3. **Rendering**

   * Layout with header/footer/nav, hero block, body HTML.
   * Inject CTAs from front‑matter (`cta.primary/secondary`).
   * Generate SEO tags: `<title>`, `<meta name="description">`, OG/Twitter.
   * Add `<script type="application/ld+json">` for `schema` if present.
   * Set `<html lang="...">` based on `lang` (default `en`; Spanish page uses `es`).

4. **Internal Link Handling**

   * Leave absolute links (`/path`) as‑is.
   * Preserve hash anchors; ensure headings render predictable `id`s (e.g., GitHub‑style slugify).

5. **Accessibility & Performance**

   * Ensure `hero.alt` is used for hero images.
   * Provide keyboard focus styles and aria labels where applicable.
   * Allow image `loading="lazy"` for below‑the‑fold assets.

6. **Collections UI**

   * Issues index: show title, summary, and link, sorted by `priority`.
   * News index: show title, date (YYYY‑MM‑DD), summary/excerpt, newest first.

7. **Config Flags**

   * Analytics: enable/disable via env or site config.
   * Base URL for canonical links (optional).
   * Paths: `contentRoot`, `uploadsPublicPath`.

### 6.2 Interfaces (TypeScript)

```ts
export type Lang = "en" | "es";

export interface BaseFrontmatter {
  type: "page" | "issue" | "news";
  slug: string;              // absolute path for pages (e.g. "/"), or id for collections
  title: string;
  summary?: string;
  lang?: Lang;
  hero?: { image?: string; alt?: string };
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  seo?: { title?: string; description?: string; image?: string };
  schema?: { type?: string; data?: Record<string, any> };
}

export interface IssueFrontmatter extends BaseFrontmatter {
  type: "issue";
  priority?: number;
}

export interface NewsFrontmatter extends BaseFrontmatter {
  type: "news";
  date: string; // YYYY-MM-DD
}

export interface PageDoc<Fm extends BaseFrontmatter = BaseFrontmatter> {
  fm: Fm;
  html: string;             // rendered body
  raw: string;              // raw markdown
  filePath: string;
}

export interface SiteIndex {
  pagesBySlug: Record<string, PageDoc<BaseFrontmatter>>;  // "/": Home, "/meet", "/es", "/issues", etc.
  issues: PageDoc<IssueFrontmatter>[];
  news: PageDoc<NewsFrontmatter>[];
}
```

### 6.3 Module API

```ts
export interface LoadOptions {
  contentRoot: string;           // e.g., "src/content"
  defaultLang?: Lang;            // "en"
}

export async function loadSite(opts: LoadOptions): Promise<SiteIndex>;

export interface RenderOptions {
  route: string;                 // e.g., "/", "/issues/public-safety", "/news/2025-08-10-kickoff-house-chat"
  site: SiteIndex;
  baseUrl?: string;
  enableAnalytics?: boolean;
}

export function resolveRoute(site: SiteIndex, route: string):
  | { kind: "page"; doc: PageDoc }
  | { kind: "issue"; doc: PageDoc<IssueFrontmatter> }
  | { kind: "news"; doc: PageDoc<NewsFrontmatter> }
  | { kind: "notfound" };

export function renderHtml(opts: RenderOptions): string;
```

**Behavior notes:**

* `loadSite()`:

  * Scans contentRoot recursively for `.md`.
  * Parses front‑matter; validates:

    * `type=page`: `slug` must start with `/`.
    * `type=issue`: `slug` is id; route = `/issues/${slug}`.
    * `type=news`: needs `date` + `slug`; route = `/news/${date}-${slug}`.
  * Renders Markdown to HTML with heading IDs; sanitizes output.

* `renderHtml()`:

  * Selects the right doc via `resolveRoute()`.
  * Builds a `<head>` with seo fields and OG tags (fallbacks to title/summary).
  * Wraps with a base layout (header/footer/nav, Donate button, ES link).
  * Injects `lang` on `<html>`.
  * Renders hero (if `hero.image`), then `doc.html`.
  * Adds CTAs as buttons if present.
  * Optionally injects analytics snippet if enabled.

---

## 7) Acceptance Criteria Mapping (to PRD)

* **Global nav/footer/SEO**: see pages' `seo` blocks and nav/links defined in Section 2; renderer ensures consistent layout and meta tags.
* **Home hero & CTAs**: Home front‑matter defines `hero` + `cta` (PRD §4.2).
* **Spanish landing**: `/es` with `lang: es` (PRD §4.3).
* **Issues/News collections**: Provided seed files and list/detail behaviors (PRD §4.5, §4.6).
* **Get Involved/Donate/Contact**: Page content included (PRD §4.7–§4.9).
* **Accessibility**: alt text, heading structure, clear link text; renderer should keep semantic HTML (PRD §5).
* **Analytics flag**: rendering option controls script injection (PRD §6).

---

## 8) Notes for the Coding Model

1. **Implement the loader and renderer first** (Section 6). Use any Markdown+front‑matter library you prefer.
2. Build routes according to Section 1.2. Ensure `/es` uses `<html lang="es">`.
3. Start with **Home, ES, Meet, Issues index + one issue**, then News, then the rest.
4. After each step, **write a Playwright (Python) test** that:

   * Visits the route, asserts `<h1>` text, presence of nav links and CTAs.
   * For `/es`, assert `<html lang="es">`.
   * For issues/news, assert sort order and internal links.
5. Keep tests green before moving on. Keep commits atomic.

---

That's everything in one place. If you want, I can also deliver these as **separate `.md` files** ready to drop into a `src/content/` folder (same text), but this single spec is enough for a coding agent to implement the loader/renderer and seed content exactly as requested.