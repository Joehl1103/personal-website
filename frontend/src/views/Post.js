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
        <a href="/blog" class="post-back-arrow">${iconElements.left_arrow}<a/>
        <h1 class="post-title">${meta.title}</h1>
        <h3 class="post-date"><i>${meta.date}</i></h3>
        <div class="post-content">${html}</div>
        <hr>
        <p class="view-on"><i>View on <a href="${meta.substack_link}">Substack</a>, <a href="${meta.linkedin_link}">Linkedin</a>, <a href="${meta.x_link}">X</a></i></p>
      `
    }
    return `
      <p>Unable to parse the pathname into a slug.</p>
    `
  }
}
