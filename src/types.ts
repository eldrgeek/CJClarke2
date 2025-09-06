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
  schema?: { type?: string; data?: Record<string, unknown> };
  component?: string;        // React component name for special pages
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

export interface LoadOptions {
  contentRoot?: string;           // e.g., "src/content"
  defaultLang?: Lang;            // "en"
}

export interface RenderOptions {
  route: string;                 // e.g., "/", "/issues/public-safety", "/news/2025-08-10-kickoff-house-chat"
  site: SiteIndex;
  baseUrl?: string;
  enableAnalytics?: boolean;
}

export type RouteResult = 
  | { kind: "page"; doc: PageDoc }
  | { kind: "issue"; doc: PageDoc<IssueFrontmatter> }
  | { kind: "news"; doc: PageDoc<NewsFrontmatter> }
  | { kind: "notfound" };