# Blog Posts – Detailed Technical Spec

**Status:** Draft (detailed)  
**Date:** 2026-11-21  
**Owner:** Joseph  
**Related:** Existing SPA (client-side router + `AbstractView` views), planned Postgres + blogs API later

## 1. Goal

Enable individual blog posts on the personal website (static SPA) with:

- Authoring in Markdown + YAML frontmatter
- List page at `/blog`
- Individual post pages at `/blog/:slug`
- Client-side rendering using a small Markdown-to-HTML library
- Minimal changes to the existing architecture
- Clean path to replace the content source with an API later

## 2. Non-goals (v1)

- Full static-site generator / build-time HTML generation (optional later)
- Server-side rendering
- Comments, auth, or admin UI
- Syntax highlighting, math, diagrams, or TOC (easy to add later)
- RSS feed
- Full CommonMark / GFM compliance (basic + common features are enough)

## 3. Content Model

### File location
```
frontend/src/content/blog/<slug>.md
```

### Frontmatter (YAML)
```yaml
---
title: My First Post
date: 2026-11-21
slug: my-first-post          # optional; falls back to filename without .md
excerpt: Short summary shown on the list page.
tags: [vanilla, blogging]    # optional array
published: true              # optional; defaults to true
---
```

### Body
Standard Markdown after the closing `---`. Inline HTML is allowed.

### Manifest (recommended for v1)
`frontend/src/content/blog/index.js` exports an array of metadata objects so the list view does not need runtime file discovery:

```js
export default [
  {
    slug: "my-first-post",
    title: "My First Post",
    date: "2026-11-21",
    excerpt: "Short summary shown on the list page.",
    published: true,
  },
  // ...
];
```

The actual `.md` files are loaded only when a post is viewed.

## 4. Folder Structure

```
frontend/src/
├── content/
│   └── blog/
│       ├── index.js                 # manifest
│       ├── my-first-post.md
│       └── another-post.md
├── utils/
│   └── markdown.js                  # thin wrapper around the parser
├── views/
│   ├── Blog.js                      # list (update existing)
│   └── Post.js                      # new single-post view
└── router.js                        # extend for :slug
```

## 5. Markdown Parsing Library

### Recommended choice: **marked**

- Small (~15 kB gzipped), fast, zero runtime dependencies
- Widely used, actively maintained, good GFM support (tables, task lists, strikethrough, etc.)
- Simple API: `marked.parse(markdownString)` → HTML string
- Works cleanly in the browser with webpack / ESM
- Suitable for trusted content (own posts)

**Alternatives considered**

| Library              | Size (gzip) | Notes                                      | Why not primary |
|----------------------|-------------|--------------------------------------------|-----------------|
| marked               | ~15 kB      | Fast, GFM, easy API                        | —               |
| micromark            | ~15 kB      | Spec-compliant, safe by default            | Slightly more complex API |
| casual-markdown      | ~2–3 kB     | Ultra-light, frontmatter + TOC built-in    | Less mature / fewer features |
| slimdown-js / md-lite| <5 kB       | Very small                                 | Limited syntax  |
| markdown-it          | ~40 kB      | Highly extensible                          | Heavier than needed |

**Security note:** `marked` does not sanitize HTML by default. Since all content is authored by you, this is acceptable for v1. If you ever allow user content, add DOMPurify.

### Installation
```bash
npm install marked
```

### Thin wrapper (`frontend/src/utils/markdown.js`)
```js
import { marked } from "marked";

// Optional: configure once
marked.setOptions({
  gfm: true,
  breaks: false,
});

export function markdownToHtml(md) {
  return marked.parse(md);
}
```

### Frontmatter extraction (no extra library required for v1)
```js
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: raw };
  }

  const meta = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      let value = rest.join(":").trim();
      // simple array support for tags: [a, b]
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1).split(",").map((s) => s.trim());
      }
      // boolean
      if (value === "true") value = true;
      if (value === "false") value = false;
      meta[key.trim()] = value;
    }
  });

  return { meta, body: match[2] };
}
```

(If you prefer a real YAML parser later, `js-yaml` can be added; the simple splitter is enough for the fields we use.)

## 6. Routing

Extend the existing router in `router.js`.

### Route table
```js
const routes = [
  { path: "/", view: Home },
  { path: "/projects", view: Projects },
  { path: "/blog", view: Blog },
  { path: "/blog/:slug", view: Post },
];
```

### Matching logic (sketch)
```js
function matchRoute(pathname) {
  for (const route of routes) {
    const paramNames = [];
    const regex = new RegExp(
      "^" +
        route.path.replace(/:(\w+)/g, (_, name) => {
          paramNames.push(name);
          return "([^/]+)";
        }) +
        "$"
    );
    const match = pathname.match(regex);
    if (match) {
      const params = {};
      paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });
      return { route, params };
    }
  }
  return null;
}
```

Pass `params` into the view (via constructor or a setter).

## 7. Views

### Blog list (`views/Blog.js`)
```js
import AbstractView from "./AbstractView.js";
import posts from "../content/blog/index.js";

export default class Blog extends AbstractView {
  async getHtml() {
    const published = posts
      .filter((p) => p.published !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const items = published
      .map(
        (p) => `
        <li>
          <a href="/blog/${p.slug}" data-link>
            <h2>${p.title}</h2>
          </a>
          <time datetime="${p.date}">${p.date}</time>
          <p>${p.excerpt || ""}</p>
        </li>
      `
      )
      .join("");

    return `
      <h1 class="main-header">Blog</h1>
      <ul class="post-list">${items}</ul>
    `;
  }
}
```

### Single post (`views/Post.js`)
```js
import AbstractView from "./AbstractView.js";
import { parseFrontmatter, markdownToHtml } from "../utils/markdown.js";

export default class Post extends AbstractView {
  constructor(params = {}) {
    super();
    this.slug = params.slug;
  }

  async getHtml() {
    if (!this.slug) return "<p>Post not found.</p>";

    try {
      // webpack can import raw text with ?raw or a custom loader;
      // alternatively fetch the file if served statically.
      const raw = await import(`../content/blog/${this.slug}.md?raw`);
      const { meta, body } = parseFrontmatter(raw.default || raw);
      const html = markdownToHtml(body);

      this.setTitle(meta.title || this.slug);

      return `
        <article class="post">
          <header>
            <h1>${meta.title || this.slug}</h1>
            <time class="post-meta" datetime="${meta.date || ""}">${meta.date || ""}</time>
          </header>
          <div class="post-body">${html}</div>
        </article>
      `;
    } catch (err) {
      return `<p>Post not found.</p>`;
    }
  }
}
```

**Note on loading `.md` files:**  
Webpack needs a rule or the `?raw` query (supported in webpack 5) so the file is imported as a string. Alternative: place the Markdown files in `public/` and `fetch()` them.

## 8. Webpack Considerations

Add (or confirm) a rule so `.md` files can be imported as raw text:

```js
// webpack.config.js
{
  test: /\.md$/,
  type: "asset/source",   // webpack 5
}
```

Or rely on `?raw` if your version supports it.

## 9. Error Handling

- Unknown slug → “Post not found.” message
- Missing frontmatter → treat whole file as body, title falls back to slug
- `published: false` → excluded from list; direct URL still shows the post (or 404 if you prefer)
- Network / import failure → friendly error message

## 10. Styling Hooks

Classes to target in the upcoming design-system work:

- `.post-list`
- `.post`
- `.post-body`
- `.post-meta`

## 11. Future API Migration

When the Postgres backend exists:

1. Keep `Blog` and `Post` views unchanged.
2. Replace the manifest import + dynamic `.md` import with:
   ```js
   const posts = await fetch("/api/posts").then(r => r.json());
   const post = await fetch(`/api/posts/${slug}`).then(r => r.json());
   ```
3. The API can return pre-rendered HTML or raw Markdown (client still calls `markdownToHtml` if needed).
4. Existing Markdown files can be imported into the database as a one-time migration.

## 12. Acceptance Criteria

- [ ] Adding a new `.md` file + one line to the manifest makes it appear on `/blog`
- [ ] List is sorted newest-first and shows title, date, excerpt
- [ ] Clicking a post (or navigating directly) renders the full Markdown content
- [ ] Invalid slug shows a clear not-found state
- [ ] Existing routes (`/`, `/projects`) continue to work
- [ ] No extra large dependencies beyond `marked`

## 13. Open Decisions

- Manifest (manual) vs. a small webpack plugin / `require.context` to auto-discover posts?
- Load Markdown via `import ...?raw` or via `fetch` from a static directory?
- Add a simple reading-time calculation (word count / 200) on the list and post?
- Sanitize HTML even for trusted content (future-proofing)?

---

This gives a concrete, low-risk path that fits the current vanilla JS SPA while leaving a clean upgrade route to the planned API.
