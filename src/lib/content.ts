import { marked } from 'marked';
import matter from 'gray-matter';
import type {
  SiteIndex,
  PageDoc,
  BaseFrontmatter,
  IssueFrontmatter,
  NewsFrontmatter,
  RouteResult
} from '../types';

// Configure marked with heading IDs
marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  smartypants: false
});

// Add heading ID renderer
marked.use({
  renderer: {
    heading(token: { depth: number; tokens: unknown[] }) {
      const level = token.depth;
      const text = this.parser.parseInline(token.tokens);
      const anchor = text
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      return `<h${level} id="${anchor}">${text}</h${level}>`;
    }
  }
});

function parseContent(content: string, filePath: string): PageDoc {
  const { data, content: markdown } = matter(content);
  const html = marked(markdown);
  
  return {
    fm: data as BaseFrontmatter,
    html: typeof html === 'string' ? html : String(html),
    raw: markdown,
    filePath
  };
}

async function loadContentFiles(): Promise<{ [key: string]: string }> {
  const contentFiles: { [key: string]: string } = {};
  
  // Use Vite's import.meta.glob to load all markdown files
  const modules = import.meta.glob('/src/content/**/*.md', { 
    query: '?raw',
    import: 'default'
  });
  
  for (const path in modules) {
    try {
      const content = await modules[path]() as string;
      // Convert the full path to a relative path from src/content
      const relativePath = path.replace('/src/content/', '');
      contentFiles[relativePath] = content;
    } catch (error) {
      console.error(`Failed to load content file: ${path}`, error);
    }
  }
  
  return contentFiles;
}

export async function loadSite(): Promise<SiteIndex> {
  const pagesBySlug: Record<string, PageDoc<BaseFrontmatter>> = {};
  const issues: PageDoc<IssueFrontmatter>[] = [];
  const news: PageDoc<NewsFrontmatter>[] = [];

  try {
    const contentFiles = await loadContentFiles();

    // Process all content files
    for (const [filePath, content] of Object.entries(contentFiles)) {
      if (!content) continue;

      const doc = parseContent(content, filePath);
      
      if (doc.fm.type === 'page') {
        pagesBySlug[doc.fm.slug] = doc;
      } else if (doc.fm.type === 'issue') {
        const issueDoc = doc as PageDoc<IssueFrontmatter>;
        issues.push(issueDoc);
      } else if (doc.fm.type === 'news') {
        const newsDoc = doc as PageDoc<NewsFrontmatter>;
        news.push(newsDoc);
      }
    }

    // Sort issues by priority
    issues.sort((a, b) => (a.fm.priority || 999) - (b.fm.priority || 999));

    // Sort news by date (newest first)
    news.sort((a, b) => new Date(b.fm.date).getTime() - new Date(a.fm.date).getTime());

  } catch (error) {
    console.error('Failed to load site content:', error);
  }

  return {
    pagesBySlug,
    issues,
    news
  };
}

export function resolveRoute(site: SiteIndex, route: string): RouteResult {
  // Check pages first
  if (site.pagesBySlug[route]) {
    return { kind: "page", doc: site.pagesBySlug[route] };
  }

  // Check issues
  if (route.startsWith('/issues/')) {
    const slug = route.replace('/issues/', '');
    const issue = site.issues.find(i => i.fm.slug === slug);
    if (issue) {
      return { kind: "issue", doc: issue };
    }
  }

  // Check news
  if (route.startsWith('/news/')) {
    const slug = route.replace('/news/', '');
    // Try to match YYYY-MM-DD-slug format
    const match = slug.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    if (match) {
      const [, date, newsSlug] = match;
      const newsItem = site.news.find(n => n.fm.date === date && n.fm.slug === newsSlug);
      if (newsItem) {
        return { kind: "news", doc: newsItem };
      }
    }
  }

  return { kind: "notfound" };
}