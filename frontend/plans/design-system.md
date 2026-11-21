# Design system — Open Props light and dark

Open Props supplies the palette. This site decides which props each theme uses. The work stays vanilla CSS. Webpack 5 already emits CSS from `import "./index.css"` in `src/index.js`. No `css-loader`.

Do not import `open-props/normalize`. That file is a reset: it changes type, margins, and paints the page with the gray `--surface-1` theme.

Do not import `open-props/switch/light` or `open-props/switch/dark` for this palette. Those sheets set `--text-1` and `--surface-1` to gray steps, and only when `data-theme` is present. They do not follow the operating system.

## Disagreements to leave in place

`plan.md` at the repo root specifies hand-written tokens and no new CSS library. OmniFocus task `h7YBlH-6lMg` says the same, with a suggested hex palette. Task `fZB8KdDN2uX` names the button "Switch to dark theme" and assumes `--bg` already exists. This file does not edit those. The button stays the moon/sun control `tests/nav.test.js` already checks. The icon is the mode the next click turns on.

## Palette

Import only the packs a slice uses. `@import` lines go before any rules.

| Role | Light | Dark |
| --- | --- | --- |
| Background | `--sand-1` (`#e6e4dc`, computed `rgb(230, 228, 220)`) | `--stone-12` (`#121210`, computed `rgb(18, 18, 16)`) |
| Surface | `--sand-0` | `--stone-11` |
| Text | `--stone-12` | `--sand-1` |
| Muted | `--stone-7` | `--sand-5` |
| Accent | `--orange-9` | `--orange-4` |
| Accent contrast | `--sand-0` | `--stone-12` |
| Border | `--sand-4` | `--stone-8` |
| Nav background | `--stone-9` | `--stone-11` |
| Nav hover | `--sand-3` | `--stone-7` |
| Footer background | `--sand-2` | `--stone-11` |

`--sand-0` is `#f8fafb`, almost the same as `--stone-0`. Warm paper is `--sand-1`.

Pack files:

```css
@import "open-props/sand.min.css";
@import "open-props/stone.min.css";
@import "open-props/orange.min.css";
```

## Theme rules

Light values live on `:root`. A saved light choice has to beat a dark operating system, so the media query is `:root:not([data-theme="light"])`. An explicit dark choice has to beat a light operating system, so `:root[data-theme="dark"]` repeats the dark values.

```css
:root {
  color-scheme: light;
  --bg: var(--sand-1);
  --text: var(--stone-12);
  --main-bg: var(--bg);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --bg: var(--stone-12);
    --text: var(--sand-1);
  }
}

:root[data-theme="light"] {
  color-scheme: light;
  --bg: var(--sand-1);
  --text: var(--stone-12);
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --bg: var(--stone-12);
  --text: var(--sand-1);
}
```

`.wrapper` already paints `background: var(--main-bg)`. Point `--main-bg` at `var(--bg)` once. A later `:root { --main-bg: white; }` in `src/index.css` has the same weight and wins if it comes after the import. Remove the hardcoded color from that block when a token takes over.

`color-scheme` sets the UA form controls and scrollbar. It does not paint `.wrapper`.

## Saved choice

First thing in `<head>` of `index.html`:

```html
<script>
  (function () {
    try {
      var theme = localStorage.getItem("theme");
      if (theme === "light" || theme === "dark") {
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch (e) {}
  })();
</script>
```

If nothing is stored, leave `data-theme` unset. The media query follows the system. HtmlWebpackPlugin keeps this script because it is in the template.

On the nav button click, write `document.documentElement.dataset.theme` and `localStorage.theme`, then swap the icon. On connect, if the saved theme or the system scheme is already dark, `modeNext` is `"light"` and the icon is the sun.

Playwright serves `frontend/dist` through `node server.js`. Source edits stay invisible until `npm run build`. Read a custom property with `getComputedStyle(element).getPropertyValue("--bg")`. A loop over computed-style names does not list custom properties. `tests/main.spec.js` and the moon/sun test stay green after every slice.

## Slices

Each slice is a failing assertion, then the smallest CSS and script change that turns it green.

### 1. Background only

This is the next slice. The chat message that introduced this file spells out the steps. Text, nav, and footer colors stay hardcoded. Import sand and stone only.

Done when a click changes `.wrapper` from the sand background to the stone background, a reload keeps that choice, and the nav and footer colors are unchanged.

### 2. Text and accent

Add `--text` and `--accent` for both themes. Import `open-props/orange.min.css`. Set `color: var(--text)` on `html, body`. Use `--accent` on one existing link or heading treatment.

Assert that computed `color` on `.wrapper` differs between light and dark. Do not assert the accent hex in the suite.

### 3. Nav and footer

Move `--nav-bg`, `--nav-hover-bg`, and `--footer-bg` onto the theme pairs in the table. Nav link color stays white, because the bar stays dark in both themes.

Assert the footer computed background differs between themes. The hover rule `color: black` can stay until a later pass.

### 4. The rest of the names

Add `--surface`, `--muted`, `--accent-contrast`, and `--border`. A Playwright context with `colorScheme: "dark"` and empty `localStorage` gets the dark background and no `data-theme` attribute. A context with `colorScheme: "light"` gets the sand background.

Type, space, radius, and shadow (`--step--1` through `--step-4`, `--space-1` through `--space-8`, `--radius-sm`, `--radius-md`, `--shadow-sm`) stay with the hand-written steps already described in `plan.md`. Open Props has `--size-*`, `--font-size-*`, and `--shadow-*` packs when you want them later. Splitting `index.css` into `base.css`, `layout.css`, and `components.css` is still that later refactor.

## Learn

- Open Props: https://open-props.style/
- Color packs after install: `node_modules/open-props/sand.min.css`, `stone.min.css`, `orange.min.css`
- Custom properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- `prefers-color-scheme`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- `color-scheme`: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
- Playwright color scheme: https://playwright.dev/docs/emulation#color-scheme
