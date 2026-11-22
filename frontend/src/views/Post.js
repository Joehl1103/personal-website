import { mdToHTML, parseFrontmatter } from "../content/utils/markdown.js";
import AbstractView from "./AbstractView.js";
import { iconElements } from "../components/helpers/icons.js";

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
      return `
        <button class="back-arrow" style="all: unset;">${iconElements.left_arrow}</button>
        <h1 class="title">${meta.title}</h1>
        <h3 class="date"><i>${meta.date}</i></h3>
        <div class="post-content">${html}</div>
        <hr>
        <p class="view-on">View on <a href="${meta.substack_link}">Substack</a>, <a href="${meta.linkedin_link}">Linkedin</a>, <a href="${meta.x_link}">X</a></p>
      `
    }
    return `
      <p>Unable to parse the pathname into a slug.</p>
    `
  }
}
