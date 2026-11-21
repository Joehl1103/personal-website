import { iconElements } from "./icons.js";

class Nav extends HTMLElement {
  
  constructor() {
    super();
    this.modeNext = 'dark';
    this.lightModeIcon = iconElements.light_mode;
    this.darkModeIcon = iconElements.dark_mode; 

  }

  connectedCallback() {
    this.render();
    this.querySelector(".mode-toggle").addEventListener("click", this.toggleMode)
  }

  get toggleIcon(){
    return this.modeNext === 'light' ? this.lightModeIcon : this.darkModeIcon;
  }

  toggleMode = () => {
    document.documentElement.dataset.theme = this.modeNext;
    localStorage.setItem("theme",this.modeNext);
    this.modeNext = this.modeNext === 'light' ? 'dark' : 'light';
    this.querySelector(".mode-toggle").innerHTML = this.toggleIcon;
  }

  render() {
    const toggleIcon = this.modeNext === 'light' ? this.lightModeIcon : this.darkModeIcon;
    console.log('toggleIcon',toggleIcon)
    this.innerHTML = `
      <div data-testid="navbar" class="navbar">
        <div class="menu">
          <a href="/" data-link data-testid="home-link">Home</a>
          <a href="/projects" data-link data-testid="projects-link">Projects</a>
          <a href="/blog" data-link data-testid="blog-link">Blog</a>
        </div>
        <button class="mode-toggle">${toggleIcon}</button>
      </div>
  `;
  }
}

customElements.define("nav-component", Nav);
