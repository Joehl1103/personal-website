class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
    </style>
    <div class="footer">
      <socials-component class="socials-footer" data-testid="footer-socials"></socials-component>
    </div>
  `;
  }
}

customElements.define("footer-component", Footer);
