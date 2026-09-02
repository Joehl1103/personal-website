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
      <p>Blog coming soon...</p>
  `;
  }
}
