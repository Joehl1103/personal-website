import Home from "/frontend/src/views/Home.js";
import Projects from "/frontend/src/views/Projects.js";
import Blog from "/frontend/src/views/Blog.js";

// NOTE: unnecessariy at the moment but I will have to figure out how to parse a url with multiple slashes and an id and return the url with the id once I have multiple elements linked on a single page.
// function getParams(match) {
//   console.group("getParams");
//   console.log("match", match);
//   const values = match.result.slice(0);
//   //NOTE: this seems unnecessarily complicated. Why match all and the only return the first?
//   console.log("values", values);
//   const keys = Array.from(
//     match.route.path.matchAll(/:(\w+)/g).map((result) => result[1]),
//   );
//   console.log("keys", keys);
//   const out = Object.fromEntries(keys.map((key, i) => [key, values[i]]));
//   console.log("out", Object.entries(out));
//   console.groupEnd("getParams");
//   return out;
// }
// function pathRegex(path) {
//   return new RegExp(`^${path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")}$`);
// }

async function router() {
  const routes = [
    { path: "/", view: Home },
    { path: "/projects", view: Projects },
    { path: "/blog", view: Blog },
  ];

  const potentialMatches = routes.map((r) => {
    return {
      ...r,
    };
  });
  const currentPath = location.pathname;
  let match = potentialMatches.find((pm) => pm.path === currentPath);
  if (!match) {
    match = {
      ...routes[0],
      result: [location.pathname],
    };
  }
  const { path } = match;
  const view = new match.view(path);
  const html = await view.getHtml();
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
