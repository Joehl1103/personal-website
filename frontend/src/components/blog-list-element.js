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
      window.location.assign(`/blog/${slug}`)
    }
  }

  render(){
    this.id = this.dataset.id;
    this.slug = this.dataset.slug;
    this.title = this.dataset.title;
    this.date = this.dataset.date;

    this.innerHTML = `
      <a id="${this.id}" data-testid=${this.slug}>
        <div class="blog-list-element">
          <span style="justify-self: start">${this.title}</span>
          <span style="justify-self: end">${this.date}</span>
        </div>
        <hr class="blog-list-hr">
      </div>
    `
  }
}

customElements.define("blog-list-element",BlogListElement);
