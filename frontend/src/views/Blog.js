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
    console.log('manifest',JSON.stringify(manifest))
    console.log(JSON.stringify(this.manifest.map((m,i) => `<blog-list-element
          data-id="${i}"
          data-title="${m.title}"
          data-slug="${m.slug}"
          data-date="${m.date}"
          ></blog-list-element>`)))
    return `
      <div>
        <h1 class="main-headers">Blog</h1>
        <p class="header-paragraph">Below you will find my published writings and reflections. I strive to be as open and transparent on my thinking as humanly possible while maintaining professional integrity. I welcome feedback and thoughts. Comments on postings will be coming soon!</p>
        <p>If you want to get in touch, feel free to reach out by <a href="mailto:jkhloomis@icloud.com">email</a>, or any of the socials linked in the footer!</p>
      </div>
      <hr>
      <div class="blog-links">
        ${this.manifest.map((m,i) => `<blog-list-element
          data-id="${i}"
          data-title="${m.title}"
          data-slug="${m.slug}"
          data-date="${m.date}"
          ></blog-list-element>`).join("")}
      </div>
      <div class="blog-substack">
      <p class="blog-list-substack" ><i>Substack</i> <a href="${constants.SUBSTACK}">${iconElements.fa_substack}</a></p>
      </div>
  `;
  }
}
 
