import Home from "./views/Home.js";
import Projects from "./views/Projects.js";
import Blog from "./views/Blog.js";
import Post from "./views/Post.js";
import { matchPathToView } from "./routerHelpers.js";
import FourOFour from "./views/fourOfour.js";

async function router() {
  const routes = [
    { path: "/", view: Home },
    { path: "/projects", view: Projects },
    { path: "/blog", view: Blog },
    { path: "/blog/:slug", view: Post },
    { path: "/404", view: FourOFour}
  ];

  for (const route of routes){
    const paramNames = [];
    const regex = new RegExp("^" + route.path.replace(/:(\w+)/g, (_,name) => {
      paramNames.push(name);
      return "([^/]+)";
    }) + "$")
    const match = location.pathname.match(regex)
    if(match){
      const params = {};
      paramNames.forEach((name,i) => {
        params[name] = match[i + 1]
      })
    }
  }

  const match = matchPathToView(location.pathname,routes);
  const { path } = match;
  const view = new match.view(path);
  const html = await view.getHtml();
  const content = document.getElementById("content");
  content.innerHTML = html;
}

async function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
