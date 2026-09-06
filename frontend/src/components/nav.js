class Nav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div data-testid="navbar" class="navbar">
        <a href="/" data-link data-testid="home-link">Home</a>
        <a href="/projects" data-link data-testid="projects-link">Projects</a>
        <a href="/blog" data-link data-testid="blog-link">Blog</a>
      </div>
  `;
  }
}

customElements.define("nav-component", Nav);
