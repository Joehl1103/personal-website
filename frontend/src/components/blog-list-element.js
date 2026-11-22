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
      <div>
      <a id="${this.id}" class="blog-list-element" data-testid=${this.slug}>
        <p class="blog-list-title">${this.title}</p>
        <p class="blog-list-date"><i>${this.date}</i></p>
      </a>
        <hr class="blog-list-hr">
      </div>
    `
  }
}

customElements.define("blog-list-element",BlogListElement);
