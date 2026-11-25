# Stable Public Blog Assets

## Goal

Give every blog image one stable public URL (`/assets/blog/...`) while allowing `npm run dev` to read the image directly from the local source checkout and production to read the same URL from `dist/`.

## Context

- Blog posts are loaded as raw Markdown and parsed in the browser, so Webpack does not rewrite URLs inside the Markdown.
- `copyBlogAssets()` currently copies `src/content/blog/assets/` into `dist/assets/blog/`.
- `npm run dev` runs Webpack Dev Server; `server.js` is used by the Playwright production suite after `npm run build` and by the production-style server.
- The production Docker image contains `dist/` only.

## Decisions

- Use the clean split chosen by the owner: `npm run dev` is the local source environment; `server.js` serves built output only.
- Use `/assets/blog/<file>` as the sole URL convention in Markdown.
- Do not add a dependency solely to copy assets. Retain a small Webpack copy plugin, but have it copy from the public static-asset directory.

## Proposed Changes

1. Move blog images from `src/content/blog/assets/` to `public/assets/blog/`.
2. Update the affected Markdown image URLs to the canonical `/assets/blog/<file>` form, preserving unrelated owner edits in the post.
3. Point `copyBlogAssets()` at `public/assets/blog/`, retaining its output path of `assets/blog/<file>`.
4. Configure Webpack Dev Server to serve `public/` at `/`, so the same public URLs resolve from source in development.
5. Remove the source-directory static mount and no-`dist` fallback from `server.js`; provide a clear startup error when its production build output is absent.
6. Add or restore an asset-contract Playwright test: post image URLs use `/assets/blog/`, respond as PNG, and render successfully from the built site. Add a focused development-server check that verifies the same URL resolves from `public/assets/blog/` without building.

## Files Likely Affected

- `public/assets/blog/*` (new static asset location)
- `src/content/blog/assets/*` (removed after the move)
- `src/content/blog/posts/2026-11-24-fso-rd.md`
- `webpack.config.js`
- `server.js`
- `testing/playwright/post.spec.js`
- Playwright configuration or an additional development-server test configuration

## Verification

1. Start `npm run dev`, request a blog image at `/assets/blog/...`, and confirm it is a PNG served from the public source directory.
2. Run `npm run build`; confirm the corresponding file is in `dist/assets/blog/`.
3. Run the production Playwright suite; confirm the post uses the canonical image URL and the image loads with non-zero natural dimensions.
4. Start `server.js` after a build and confirm the same URL works; confirm that starting it without `dist/` fails clearly rather than silently serving source files.
