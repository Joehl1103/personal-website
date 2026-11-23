import AbstractView from "./AbstractView.js";
import { iconElements } from "../components/helpers/icons.js";
import constants from "../constants.js";
import manifest from "../content/manifest.json";

export default class extends AbstractView {
  constructor() {
    super();
    this.title = this.setTitle("Projects");
    this.manifest = manifest;
  }

  getTitle() {
    return this.title;
  }

  async getHtml() {
    console.log('manifest',this.manifest)
    return `
      <div>
        <h1 class="main-headers">Blog</h1>
        <p class="header-paragraph">text here about why a blog text here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blogtext here about why a blog</p>
      </div>
      <hr>
      <div class="blog-links">
        ${this.manifest.map((m,i) => `<blog-list-element 
          data-id="${i}"
          data-title="${m.title}"
          data-slug="${m.slug}"
          data-date="${m.date}"
          ></blog-list-element>`)}
      </div>
      <div class="blog-substack">
      <p class="blog-list-substack" ><i>Substack</i> <a href="${constants.SUBSTACK}">${iconElements.fa_substack}</a></p>
      </div>
  `;
  }
}
 
