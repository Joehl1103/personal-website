import Home from "/src/views/Home.js";
import Projects from "/src/views/Projects.js";
import Blog from "/src/views/Blog.js";
import Post from "/src/views/Post.js";
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
    console.log('route',route)
    const paramNames = [];
    const regex = new RegExp("^" + route.path.replace(/:(\w+)/g, (_,name) => {
      paramNames.push(name);
      return "([^/]+)";
    }) + "$")
    console.log('regex',regex)
    console.log('paramNames',paramNames)
    const match = location.pathname.match(regex)
    console.log('match',match)
    if(match){
      const params = {};
      paramNames.forEach((name,i) => {
        params[name] = match[i + 1]
      })
      console.log('params',params)
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
