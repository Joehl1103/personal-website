import AbstractView from "./AbstractView.js";
import manifest from "../content/blog/tempManifest.js";
import { iconElements } from "../components/helpers/icons.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.title = this.setTitle("Projects");
  }

  getTitle() {
    return this.title;
  }

  async getHtml() {
    return `
      <div>
        <h1 class="main-headers">Blog</h1>
        <p class="header-paragraph" style="font-size: 14px;">text here about why a blog text here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blog</p>
      </div>
      <hr>
      <div>
        ${manifest.map((m,i) => `<blog-list-element 
          data-id="${i}"
          data-title="${m.title}"
          data-slug="${m.slug}"
          data-date="${m.date}"
          ></blog-list-element>`)}
      </div>
      <div style="text-align: center;">
      <p style="font-size: 12px"><i>Substack</i> <a href="https://substack.com/@jkhloomis">${iconElements.fa_substack}</a></p>
      </div>
  `;
  }
}
 
