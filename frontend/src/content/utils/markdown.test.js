import {mdToHTML} from "./markdown.js";
import {test,expect} from "vitest";

test("marked parses images", () => {
  const mdImage = "![image](../blog/assets/function-generic-1.png 'generic 1')";
  const html = mdToHTML(mdImage);
  expect(html).toMatch(/img/);
})

