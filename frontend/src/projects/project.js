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
    this.codeUrl = this.dataset.codeUrl;
    this.demoUrl = this.dataset.demoUrl;
    console.log("title", this.title);
    this.innerHTML = `
   <li>
      <b>${this.title}</b>, ${this.description}</br> <i>
      ${this.stack}</i></br>
      <a href=\"${this.codeUrl}\">Code</a
      >
      |
      <a href=\"${this.demoUrl}\"
        >Live Demo</a
      >
    </li>
  `;
  }
}

customElements.define("project-component", Project);
