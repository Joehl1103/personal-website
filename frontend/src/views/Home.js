import headshot from "/src/assets/hdsht.jpg";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.title = this.setTitle("Home");
  }

  getTitle() {
    return this.title;
  }

  async getHtml() {
    return `
      <h1 class="main-headers">Home</h1>
      <div class="home-top">
        <div>
          <img class="headshot" src="${headshot}" width="100" alt="headshot"></img>
          <h2><b>Joseph Loomis</b></h2>
        </div>
      </div>
        <div>
          <h3>Who am I?</h3>
          <p>Born in Maine. Grew up in France. Educated in Art and Philosophy in New York and Maryland. Lives in TX.</p>
          <h3>What do I do?</h3>
          <p>I am a developer with a background in business operations. I fell in love with code as the best medium to improve digital systems.</p>
          <div>
            <h3>Stack</h3>
          <ul>
            <li>JavaScript, Node.js, React, TypeScript</li>
            <li>Express, MongoDB, MySQL</li>
          </ul>
        </div>
      </div>
      <div class="social">
        <p>find me on </p>
        <socials-component></socials-component>
      </div>
  `;
  }
}
