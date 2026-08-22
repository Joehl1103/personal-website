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
    console.log("this.codeUrl", this.codeUrl);
    this.demoUrl = this.dataset.demourl;
    console.log("demoUrl", this.demoUrl);
    const demoExists = /^http/.test(this.demoUrl);
    this.innerHTML = `
   <li>
      <b>${this.title}</b>, ${this.description}</br> <i>
      ${this.stack}</i></br>
      <a href="${this.codeUrl}">Code</a> |
      ${
        demoExists
          ? `<a href="${this.demoUrl}">Live Demo</a>`
          : `${this.demoUrl}`
      }
    </li>
  `;
  }
}

customElements.define("project-component", Project);
