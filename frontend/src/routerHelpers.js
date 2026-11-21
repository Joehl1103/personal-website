import FourOFour from "./views/fourOfour.js";

export function matchPathToView(pathname,routes){
  const match =  routes.find(r => r.path === pathname)
  if(!match){
    return { path: "/404", view: FourOFour}
  }
  return match
}
