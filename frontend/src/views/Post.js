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
    const pathnameMatch = location.pathname.match(/^\/[^/]+\/(.+)$/);
    if(pathnameMatch[1]){
      this.slug = pathnameMatch[1];
      console.log('this.slug',this.slug)
      return `
        <p>Hello world!</p>
      `
    }
    return `
      <p>Unable to parse the pathname into a slug.</p>
    `
  }
}
