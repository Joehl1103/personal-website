import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false
});

export function mdToHTML(md){
  return marked.parse(md);
}

export function parseFrontMatter(raw) {
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
