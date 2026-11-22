//Font Awesome: https://fontawesome.com/. Set up in index.html

function generateFaIconElement(className){
  return `<i class="${className}"></i>`;
}

const iconClasses = {
  fa_linkedin: 'fa-brands fa-linkedin',
  fa_twitter: 'fa-brands fa-square-x-twitter',
  fa_github: 'fa-brands fa-github',
  fa_substack: 'fa-brands fa-substack',
  dark_mode: 'fa-solid fa-moon',
  light_mode: 'fa-regular fa-sun',
  left_arrow: "fa-solid fa-angle-left",
  arrow_link: "fa-solid fa-arrow-up-right-from-square"
};

const iconElements = Object.fromEntries(
  Object.entries(iconClasses).map(([name, className]) => [
    name,
    generateFaIconElement(className),
  ]),
);

export {
  iconClasses,
  iconElements,
}
