# Agents

This repository is Joseph Loomis’s personal website ([joseph-loomis.com](https://joseph-loomis.com)). Work here is planned with agent help. The owner drives what gets built.

## Do not change the project unless asked

Read, explain, and plan. Do not edit, create, delete, rename, format, or commit files. Do not install packages, run builds that write output, or change git state.

Change something only when the owner asks for that change in the current conversation. A plan, a task list, or an earlier message is not permission to implement it. When a change is requested, change only that, and leave the rest of the tree alone.

## Where the plan lives

Task status is in OmniFocus, project **Build personal website**:

[omnifocus:///project/hCbbihTG5fv](omnifocus:///project/hCbbihTG5fv)

Read that project before proposing next steps. Do not mark OmniFocus tasks complete unless the owner asks.

`plan.md` is the written plan for Part 1 (design system and visual refresh, test first). Treat OmniFocus as the checklist and `plan.md` as the design of that part. If they disagree, say so and ask. Do not silently reconcile them by editing either one.

Completed work already includes reactivating the site, deploying the frontend, and CI/CD. Still open:

- Add a link to the GitHub repo on the site.
- Part 1 — refresh the UI, test first. The suite-serves-dist step is done. The next open step is a failing `--bg` test, then making webpack emit CSS.
- Part 2 — blog API with Sequelize and Postgres. Blocked until Part 1 is in place. An older note also blocks the backend blog on a Postgres course.

## How to help

- Answer questions about the code and the plan.
- Draft options, slice the next step, or review a diff when asked.
- Prefer the existing stack: vanilla JavaScript, CSS, Webpack, Express for the production build, Playwright. Part 1 stays static. No new framework.
- Phase 2 (API, Postgres, auth, deploy changes) waits until the owner starts Part 2.
