import AbstractView from "./AbstractView.js";
import manifest from "../content/blog/tempManifest.js";
import { iconElements } from "../components/icons.js";

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
        ${manifest.map((m,i) => {
            return `
            <div id="${i}" data-testid=${m.slug}>
              <div style="margin: 10px 0 20px 0; display: grid; grid-template-columns: auto 1fr auto; font-size: 15px">
                <span style="justify-self: start">${m.title}</span>
                <span style="justify-self: end">${m.date}</span>
              </div>
              <hr style="border: none; border-top:1px solid">
            </div>
          `
        })}
      </div
      <!--TODO: center-->
      <div style="text-align: center;">
      <p style="font-size: 12px"><i>Substack</i> <a href="https://substack.com/@jkhloomis">${iconElements.fa_substack}</a></p>
      </div>
  `;
  }
}
 
