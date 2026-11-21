import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(){
    super();
    this.title = this.setTitle("404");
  }

  getTitle(){
    return this.title;
  }

  async getHtml(){
    return `
      <h1 class="main-headers">404 - Page Not Found</h1>
    `
  }
}
