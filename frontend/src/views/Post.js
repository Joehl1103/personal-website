import { mdToHTML, parseFrontmatter } from "../content/utils/markdown.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(){
    super();
    this.title = "";
  }

  getTitle() {
    return this.title;
  }

  async getHtml(){
    const pathnameMatch = location.pathname.match(/^\/[^/]+\/(.+)$/);
    if(pathnameMatch[1]){
      this.slug = pathnameMatch[1];
      console.log('this.slug',this.slug)
      const raw = await import(`../content/blog/${this.slug}.md?raw`)
      console.log('raw',raw.default)
      const { meta, body } = parseFrontmatter(raw.default)
      console.log('meta',meta)
      console.log('body',body)
      const html = mdToHTML(body)
      console.log('html',html)
      return html
    }
    return `
      <p>Unable to parse the pathname into a slug.</p>
    `
  }
}
