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
      <a href="/index.html">Home</a>
      <a href="/src/projects/index.html">Projects</a>
      <a href="/src/blog/index.html">Blog</a>
    </div>
  `;
  }
}

customElements.define("nav-component", Nav);
