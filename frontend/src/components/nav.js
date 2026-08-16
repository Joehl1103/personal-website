class Nav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="navbar">
      <a href="./src/home.html">Home</a>
      <a href="./src/about.html">About</a>
      <a href="./src/projects.html">Projects</a>
      <a href="./src/blog.html">Blog</a>
    </div>
  `;
  }
}

customElements.define("nav-component", Nav);
