const QIITA_USER_ID = "daigo-suhara";
const QIITA_LIST_PER_PAGE = 20;
const QIITA_LIST_PAGES = 1;
const FETCH_TIMEOUT_MS = 5000;

export type BlogSource = "qiita";

export interface BlogPost {
  id: string;
  source: BlogSource;
  sourceId: string;
  sourceUrl: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
}

interface QiitaTag {
  name: string;
  versions?: string[];
}

interface QiitaItem {
  rendered_body: string;
  body: string;
  created_at: string;
  updated_at: string;
  id: string;
  title: string;
  url: string;
  tags?: QiitaTag[];
}

function normalizeExcerpt(value: string) {
  const cleaned = value
    .replace(/\r\n/g, "\n")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*\n]*)\*\*/g, "$1")
    .replace(/\*([^*\n]*)\*/g, "$1")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.slice(0, 120);
}

function normalizeQiitaPost(item: QiitaItem): BlogPost {
  const tags = Array.isArray(item.tags)
    ? item.tags.map((tag) => String(tag.name)).filter(Boolean)
    : [];
  const body = String(item.body ?? "");

  return {
    id: `qiita-${item.id}`,
    source: "qiita",
    sourceId: item.id,
    sourceUrl: item.url,
    title: String(item.title ?? "無題"),
    excerpt: normalizeExcerpt(body),
    body,
    coverImage: null,
    tags,
    publishedAt: String(item.created_at),
    updatedAt: String(item.updated_at),
  };
}

async function qiitaFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`https://qiita.com/api/v2${path}`, {
      signal: signal ?? controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Qiita fetch error ${res.status} for ${path}: ${text}`);
    }

    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timeout);
  }
}

async function listQiitaPosts(userId: string): Promise<BlogPost[]> {
  if (!userId) return [];

  const posts: BlogPost[] = [];

  for (let page = 1; page <= QIITA_LIST_PAGES; page += 1) {
    const items = await qiitaFetch<QiitaItem[]>(
      `/users/${encodeURIComponent(userId)}/items?per_page=${QIITA_LIST_PER_PAGE}&page=${page}`,
    ).catch(() => []);

    if (items.length === 0) break;
    posts.push(...items.map(normalizeQiitaPost));
    if (items.length < QIITA_LIST_PER_PAGE) break;
  }

  return posts;
}

async function getQiitaPostById(id: string): Promise<BlogPost | null> {
  if (!id) return null;

  const itemId = id.startsWith("qiita-") ? id.slice("qiita-".length) : id;
  if (!itemId) return null;

  const item = await qiitaFetch<QiitaItem>(
    `/items/${encodeURIComponent(itemId)}`,
  ).catch(() => null);

  return item ? normalizeQiitaPost(item) : null;
}

export async function listBlogPosts(): Promise<BlogPost[]> {
  const posts = await listQiitaPosts(QIITA_USER_ID);
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return getQiitaPostById(id);
}

export async function listBlogStaticParams() {
  const posts = await listBlogPosts();
  return posts.map((post) => ({ id: post.id }));
}

