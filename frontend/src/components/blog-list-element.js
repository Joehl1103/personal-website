class BlogListElement extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    this.render();
    this.addEventListener('click',this)
  }

  handleEvent(event){
    if(event.type === 'click'){
      const { slug } = event.currentTarget.dataset;
    }
  }

  render(){
    this.id = this.dataset.id;
    this.slug = this.dataset.slug;
    this.title = this.dataset.title;
    this.date = this.dataset.date;

    this.innerHTML = `
      <div id="${this.id}" data-testid=${this.slug}>
        <div style="margin: 10px 0 20px 0; display: grid; grid-template-columns: auto 1fr auto; font-size: 15px">
          <span style="justify-self: start">${this.title}</span>
          <span style="justify-self: end">${this.date}</span>
        </div>
        <hr style="border: none; border-top:1px solid">
      </div>
    `
  }
}

customElements.define("blog-list-element",BlogListElement);
