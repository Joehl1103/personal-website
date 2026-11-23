import { iconElements } from "./helpers/icons.js";

class Socials extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="social">
      <div data-testid="socials" class="icons">
        <a href="https://www.linkedin.com/in/jkhloomis/">${iconElements.fa_linkedin}</a>
        <a href="https://x.com/JosephLoom30487">${iconElements.fa_twitter}</a>
        <a href="https://github.com/Joehl1103">${iconElements.fa_github}</a>
      </div>
    </div>
  `;
  }
}

customElements.define("socials-component", Socials);
