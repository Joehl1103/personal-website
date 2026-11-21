export function matchPathToView(pathname,routes){
  const match =  routes.find(r => r.path === pathname)
  if(!match){
    return routes.find(r => r.path === "/404")
  }
  return match
}
