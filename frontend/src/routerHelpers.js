export function matchPathToView(pathname,routes){
  const slashCount = pathname.replace(/[^/]/g,"")?.length
  if(slashCount > 1){
    return routes.find(r => r.path === "/blog/:slug")
  }
  const match =  routes.find(r => r.path === pathname)
  if(!match){
    return routes.find(r => r.path === "/404")
  }
  return match
}
