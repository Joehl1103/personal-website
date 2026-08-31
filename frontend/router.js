const urlPageTitle = "Joseph Loomis personal website";

document.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches(".navbar a")) {
    return;
  }
  event.preventDefault();
  urlRoute(event);
});

const urlRoutes = {
  404: {
    template: "/frontend/src/templates/404.html",
    title: `404 | ${urlPageTitle}`,
    description: "Page not found",
  },
  "/": {
    template: "/frontend/src/templates/home.html",
    title: `Home | ${urlPageTitle}`,
    description: "Home page",
  },
  "/projects": {
    template: "/frontend/src/templates/projects.html",
    title: `Projects | ${urlPageTitle}`,
    description: "Projects page",
  },
  "/blog": {
    template: "/frontend/src/templates/blog.html",
    title: `Blog | ${urlPageTitle}`,
    description: "Blog page",
  },
};

function urlRoute(event) {
  console.log("there");
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
}

async function urlLocationHandler() {
  const location = window.location.pathname;
  if (location.length === 0) {
    location = "/";
  }
  const route = urlRoutes[location] || urlRoutes[404];
  console.log("route", route);
  const html = await fetch(route.template).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  document.title = route.title;
  document
    .querySelector("meta[name='description']")
    .setAttribute("content", route.description);
}

urlLocationHandler();
