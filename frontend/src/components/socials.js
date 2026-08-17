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
      <div class="icons">
        <a href="https://www.linkedin.com/in/jkhloomis/"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://x.com/JosephLoom30487"><i class="fa-brands fa-square-x-twitter"></i></a>
        <a href="https://github.com/Joehl1103"><i class="fa-brands fa-github"></i></a>
      </div>
    </div>
  `;
  }
}

customElements.define("socials-component", Socials);
