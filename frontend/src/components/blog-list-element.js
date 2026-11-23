class BlogListElement extends HTMLElement {
  constructor(){
    super();
  }

  connectedCallback(){
    this.render();
    this.addEventListener('click',this)
  }

  render(){
    this.id = this.dataset.id;
    this.slug = this.dataset.slug;
    this.title = this.dataset.title;
    this.date = this.dataset.date;
    console.log(`/blog/${this.slug}`)
    this.innerHTML = `
      <div>
      <a id="${this.id}" href="/blog/${this.slug}" class="blog-list-element" data-testid=${this.slug}>
        <p class="blog-list-title">${this.title}</p>
        <p class="blog-list-date"><i>${this.date}</i></p>
        <hr class="blog-list-hr">
      </a>
      </div>
    `
  }
}

customElements.define("blog-list-element",BlogListElement);
