import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.title = this.setTitle("Projects");
  }

  getTitle() {
    return this.title;
  }

  async getHtml() {
    return `
      <h1 class="main-header">Blog</h1>
      <p>Blog coming soon...</p>
  `;
  }
}
