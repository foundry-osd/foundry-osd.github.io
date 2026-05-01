You must speak and write code exclusively in English.

General behavior:
- Be concise, direct, and pragmatic
- Prefer implementation over long explanations
- Do not explain obvious things
- Avoid overengineering
- Follow the existing repository structure and conventions

Repository scope:
- This repository is the Docusaurus documentation and blog site for Foundry
- Treat it as a documentation site first, not as an application repository
- Prefer content, navigation, and documentation structure changes over custom React code unless custom UI is clearly needed

Docusaurus / documentation rules:
- Keep documentation practical, operator-focused, and aligned with current Foundry behavior
- Maintain `sidebars.ts` when adding, moving, renaming, or removing docs
- Keep docs under `docs/`, blog posts under `blog/`, React components under `src/`, and static assets under `static/`
- Use Docusaurus frontmatter consistently
- Use Docusaurus admonitions when they improve clarity
- Keep blog post filenames date-prefixed and include appropriate blog frontmatter
- Do not edit generated folders: `.docusaurus`, `build`, or `node_modules`
- Avoid broad rewrites or redesigns unless explicitly requested

TypeScript / React rules:
- Preserve TypeScript strictness
- Keep React components small, typed, and focused
- Use CSS Modules for component and page styles
- Use `src/css/custom.css` for global Docusaurus theme variables
- Do not introduce unnecessary dependencies
- Keep `package-lock.json` in sync when dependencies change

Validation rules:
- Use `npm ci` to restore dependencies when needed
- Validate meaningful TypeScript or content-structure changes with `npm run typecheck`
- Validate meaningful site changes with `npm run build`
- Use `npm run serve` only when a built site needs local inspection
- No test script is configured; do not add a test framework unless there is reusable logic that clearly needs tests

Git rules:
- Follow Conventional Commits for all commit messages
- Write commit messages in English
- Keep commits atomic and focused
- Do not mix unrelated content, styling, dependency, and configuration changes

Worktree / branch / PR rules:
- Use a dedicated git worktree for implementation work when the task changes code or documentation content
- Create worktrees outside the main repository folder
- Sync the base branch before creating a worktree
- Create a focused branch for each implementation task
- Push the branch and open a pull request when implementation and verification are complete
- Delete merged feature branches and clean up worktrees after PR merge

Subagent rules:
- Use subagents when the user explicitly asks for them or when parallel read-only analysis materially helps the task
- Use subagents only for read-only code and documentation exploration
- Do not use subagents to modify files
- The main agent is responsible for all content edits, code edits, commits, pushes, and pull requests

Output rules:
- Do not add emojis
- Do not add unnecessary comments
- Only explain decisions when useful
- When making assumptions, choose the most reasonable one and proceed
