import Home from "/frontend/src/views/Home.js";
// const urlPageTitle = "Joseph Loomis personal website";
//
// document.addEventListener("click", (event) => {
//   const { target } = event;
//   if (!target.matches(".navbar a")) {
//     return;
//   }
//   event.preventDefault();
//   urlRoute(event);
// });
//
// const urlRoutes = {
//   404: {
//     template: "/frontend/src/templates/404.html",
//     title: `404 | ${urlPageTitle}`,
//     description: "Page not found",
//   },
//   "/": {
//     template: "/frontend/src/templates/home.html",
//     title: `Home | ${urlPageTitle}`,
//     description: "Home page",
//   },
//   "/projects": {
//     template: "/frontend/src/templates/projects.html",
//     title: `Projects | ${urlPageTitle}`,
//     description: "Projects page",
//   },
//   "/blog": {
//     template: "/frontend/src/templates/blog.html",
//     title: `Blog | ${urlPageTitle}`,
//     description: "Blog page",
//   },
// };
//
// function urlRoute(event) {
//   console.log("there");
//   event = event || window.event;
//   event.preventDefault();
//   window.history.pushState({}, "", Gevent.target.href);
//   urlLocationHandler();
// }
//
// async function urlLocationHandler() {
//   const location = window.location.pathname;
//   if (location.length === 0) {
//     location = "/";
//   }
//   const route = urlRoutes[location] || urlRoutes[404];
//   console.log("route", route);
//   const html = await fetch(route.template).then((res) => res.text());
//   document.getElementById("content").innerHTML = html;
//   document.title = route.title;
//   document
//     .querySelector("meta[name='description']")
//     .setAttribute("content", route.description);
// }
//
// urlLocationHandler();
//

function getParams(match) {
  const values = match.result.slice(1);
  //NOTE: this seems unnecessarily complicated. Why match all and the only return the first?
  const keys = Array.from(
    match.route.path.matchAll(/:(\w+)/g).map((result) => result[1]),
  );
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
}

function pathRegex(path) {
  return new RegExp(`^${path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")}$`);
}

async function router() {
  const routes = [{ path: "/", view: Home }];

  const potentialMatches = routes.map((r) => {
    return {
      route: r,
      result: location.pathname.match(pathRegex(r.path)),
    };
  });
  let match = potentialMatches.find((pm) => pm.result !== null);
  if (!match) {
    match = {
      route: routes[0],
      //NOTE: why make this an array here but not in the main potentialMatches. This creates confusion down the line.
      result: [location.pathname],
    };
  }
  //NOTE: at some point I will need to figure out how to pass the actual into the view so as to retrieve the data from the backend.
  const view = new match.route.view(getParams(match));
  document.querySelector("#content").innerHtml = await view.getHtml();
}

function navigateTo(url) {
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
});
