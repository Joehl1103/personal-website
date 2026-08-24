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
          .social {
            display: flex;
            flex-direction: row;
            gap: 5px;
          }
          .icons {
            margin-top: 16px;
          }
          a {
            color: inherit;
          }
          img {
            border: solid 1px;
          }
    </style>
    <div class="footer">
      <socials-component></socials-component>
    </div>
  `;
  }
}

customElements.define("footer-component", Footer);
