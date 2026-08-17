class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="footer">
      <socials-component></socials-component>
    </div>
  `;
  }
}

customElements.define("footer-component", Footer);
