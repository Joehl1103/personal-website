import {iconElements} from "./helpers/icons.js";

class Project extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  setLiveDemo(demoUrl) {
      const comingSoon = demoUrl === "coming soon";
      const noDemo = demoUrl === "false";
      if (/^https/.test(demoUrl)) {
        return `| <a href="${demoUrl}">Live Demo</a>`;
      } else if (comingSoon) {
        return `| live demo coming soon`;
      } else if (noDemo) {
        return "";
      }
    }

  render() {
    this.title = this.dataset.title;
    this.description = this.dataset.description;
    this.stack = this.dataset.stack;
    this.codeUrl = this.dataset.codeurl;
    this.demoUrl = this.dataset.demourl;
    let liveDemo = this.setLiveDemo(this.demoUrl);
    this.innerHTML = `
    <li class="project-li">
      <b>${this.title}</b>, ${this.description}</br> 
      <span>${iconElements.stack}</span>&nbsp;<i>${this.stack}</i></br>
      <span>${iconElements.code}</span>&nbsp;<a href="${this.codeUrl}">Code</a>
      ${liveDemo}
    </li>
  `;
  }

}

customElements.define("project-component", Project);
