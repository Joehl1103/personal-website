import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(){
    super();
    this.title = "";
  }

  getTitle() {
    return this.title;
  }

  getHtml(){
    return `

    `
  }
}
