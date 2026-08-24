class Project extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.title = this.dataset.title;
    this.description = this.dataset.description;
    this.stack = this.dataset.stack;
    this.codeUrl = this.dataset.codeurl;
    this.demoUrl = this.dataset.demourl;
    let liveDemo = this.setLiveDemo(this.demoUrl);
    this.innerHTML = `
    <li>
      <b>${this.title}</b>, ${this.description}</br> <i>
      ${this.stack}</i></br>
      <a href="${this.codeUrl}">Code</a>
      ${liveDemo}
    </li>
  `;
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
}

customElements.define("project-component", Project);
