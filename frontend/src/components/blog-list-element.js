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
          <span class="blog-list-title">${this.title}</span>
          <span class="blog-list-date">${this.date}</span>
        </div>
        <hr class="blog-list-hr">
      </div>
    `
  }
}

customElements.define("blog-list-element",BlogListElement);
