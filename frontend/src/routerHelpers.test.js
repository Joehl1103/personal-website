import {test,expect} from "vitest";
import { matchPathToView } from "./routerHelpers.js";
import Home from "./views/Home.js";
import FourOFour from "./views/fourOfour.js";

test("valid route matches route",() => {
  const match = matchPathToView("/",[{path: "/",view: Home }])
  expect(match.path).toBe("/");
})

test("invalid route returns 404", () => {
  const match = matchPathToView("/nope",[
    { path:"/",view: Home },
    { path: "/404", view: FourOFour }
  ])
  expect(match.path).toBe("/404")
})
