//Font Awesome: https://fontawesome.com/. Set up in index.html

function generateFaIconElement(className){
  return `<i class="${className}"></i>`;
}

const iconClasses = {
  fa_linkedin: 'fa-brands fa-linkedin',
  fa_twitter: 'fa-brands fa-square-x-twitter',
  fa_github: 'fa-brands fa-github',
  dark_mode: 'fa-solid fa-moon',
  light_mode: 'fa-regular fa-sun',
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
