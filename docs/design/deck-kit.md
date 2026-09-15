# Design: presentation-as-code kit with pluggable styles

Status: proposal, 2026-09-15. Research inputs: `.temp/research-curator.md` (curator-spec
1.0.0-rc.9, curator Go impl), Slidev 52.19.1 sources (`resolver`, `addons`, `roots`).

## Verified facts the design rests on

- Curator installs a git repo as a skill: `SKILL.md` + `references/ templates/ examples/
  assets/ agents/` become agent context under `.agents/skills/<name>/`; `node_modules`,
  `tests`, `README*` are stripped. It never runs package code and never provisions
  runtimes; it can only *declare* required system commands (`dependencies.commands`).
  A directory with just `SKILL.md` installs as a pure context skill.
- Slidev resolves `theme: x` to the package `slidev-theme-x` (or `@slidev/theme-x`) and
  `addons: [y]` to `slidev-addon-y`, by package name in `node_modules`, so a git URL
  install (`npm i github:org/repo#vN`) works as long as `package.json.name` matches.
  Addons may also be listed in the deck's `package.json` under `slidev.addons`.
- Setup hooks (`setup/transformers.ts`, `setup/main.ts`, `setup/shortcuts.ts`) are loaded
  from every root: theme, addons, user. So rehearsal mode can ship as an addon.
- The current deck depends on the corporate theme through raw CSS classes
  (`cards cols-3`, `card purple`, `lead`, `note`: 47 sites) far more than through
  components (11 sites). The two existing styles differ in composition rules, not only
  colours (rwb-minimal forbids cards and page-wide fills; rwb-tech is built on them).

## Principles

1. **Curator carries markdown, npm carries code, git carries the talk.** No Curator
   shims, no interpreters, no scaffolded scripts. The agent reads context from
   `.agents/skills/`, Slidev runs code from `node_modules`, the deck repo holds content
   and pins.
2. **Every building block is one git repo, tagged once, read by both channels.** Curator
   reads its `SKILL.md`/`references/`/`examples/`; npm reads its `package.json` and code.
   The kit and every RWB theme have the same shape. Third-party Slidev themes lack the
   markdown half and still work, with the kit's generic rules as fallback.
3. **Nothing is both copied and maintained upstream.** Templates are copied once by
   `deck init` and become the deck's own files. Code is installed, never copied.
4. **Tools are theme-agnostic by construction.** The audit measures each layout's real
   content box (height minus padding) instead of hardcoded theme numbers; lint and
   rehearsal do not know what a theme is.
5. **One pin per concern.** `Skillfile.json` pins what the agent reads, `package.json`
   pins what Slidev runs, git tags pin what was said. `deck doctor` checks that the
   Skillfile tag and the npm tag of the same repo are equal.

## Repositories

```
relux-works/slidev-deck                 the kit — npm slidev-addon-deck · Curator skill "deck"
  SKILL.md                              when to use, the workflow in ten lines, commands
  references/workflow.md                content → deck → rehearsal → release loop
  references/conventions.md             clicks, titles, notes, ёлочки, no invented figures, UNRESOLVED
  references/quality-gates.md           lint, audit, contact sheet, PDF, release checklist
  references/theme-contract.md          what every RWB theme provides (below)
  references/themes.md                  choose / pin / add a theme, third-party fallback
  examples/contract.md                  conformance deck: core vocabulary only
  templates/deck/                       scaffold copied by `deck init` (README.deck.md, slides.md,
                                        package.json, .github/workflows, docs/HOW_TO_RUN.md,
                                        UNRESOLVED_QUESTIONS.md, .gitignore)
  setup/transformers.ts, main.ts, shortcuts.ts   rehearsal mode (FLAT=1), badge
  styles/index.ts                       badge styles
  bin/deck.mjs · lib/audit.mjs · lib/lint.mjs · lib/sheet.mjs
  package.json                          name slidev-addon-deck, bin { deck }, peer slidev

relux-works/slidev-theme-rwb-tech       look #1: corporate cards (current theme/)
relux-works/slidev-theme-rwb-minimal    look #2: dark typographic (git 43e4de6:theme, the first kit)
  package.json                          name slidev-theme-<x>, slidev.defaults, engines.slidev
  layouts/ components/ styles/ setup/ assets/ uno.config.ts
  examples/example.md                   showcase; also the conformance run in CI
  SKILL.md                              the canon in ten rules + vocabulary beyond the contract
  references/style-guide.md             full guide: tokens, layouts, components, dos/don'ts

<deck repo>                             the talk
  Skillfile.json                        deck @ vK, rwb-tech @ vT
  package.json                          @slidev/cli, slidev-addon-deck @ vK, slidev-theme-rwb-tech @ vT,
                                        playwright-chromium; scripts: dev, dev:flat, lint, audit, build, export
  slides.md                             theme: rwb-tech · addons: [deck]
  content/ public/ docs/HOW_TO_RUN.md UNRESOLVED_QUESTIONS.md .github/workflows/
```

Gone from the deck repo: `theme/`, `.scripts/`, `setup/`, `style.css`, `docs/style-guide.md`.

## Commands (npm bin `deck`, run as `npx deck …` or via npm scripts)

| Command | Does |
| --- | --- |
| `deck init [--theme <npm spec>]` | copy `templates/deck/`, pin kit + theme at the kit's own version, `npm install` |
| `deck theme use <npm spec>` | `npm i` the theme, set `theme:` in `slides.md`, `curator add` the same repo/tag when a Skillfile exists, print its `SKILL.md` |
| `deck lint [file]` | frontmatter safety (unquoted `: ` / ` #`), tag/num presence |
| `deck audit [file]` | build + Playwright: vertical overflow, clipped `pre`, boxes/svg text, console errors; writes contact sheet |
| `deck doctor` | node/npm/gh present, Skillfile vs package.json tags equal, theme declares the contract |

Rehearsal: `FLAT=1 slidev slides.md` (npm script `dev:flat`); the addon strips clicks
server-side and shows the FLAT badge. Release stays `git tag -s vX && git push --tags`;
the scaffolded workflow builds, audits, exports PDF and publishes the GitHub Release.

## Theme contract (references/theme-contract.md)

Core, mandatory for an RWB theme (both existing themes already have it):

- layouts: `cover` (event, who, role[], contacts, image?), `section` (num, title),
  `statement`, `default` (tag), `two-cols` (::title:: ::default:: ::right:: ::bottom::),
  `code-side`, `demo` (num), `end` (who, contacts, qrs)
- frontmatter: `tag`, `num`, `class: dense`
- semantic classes: `lead` (takeaway), `note` (footnote), `sec` (secondary), `small`
- components: `BigNum{value,caption,tone}`, `Boxes{items,arrows,reveal,color,colors}`,
  `Stack{layers,reveal}`, `Tag{text}`, `PixelMotif{pattern,cell,gap}`
- tokens: `--rwb-bg --rwb-txt --rwb-sec --rwb-lilac --rwb-orange --rwb-lime --rwb-node`
  (names fixed, values free)
- diagram text: 13px mono default inside SVG

Extensions are the theme's own and documented in its `SKILL.md`: rwb-tech — `cards
cols-N`, `card {purple|lilac|lime|orange|big|num}`, `Squares`, `RwbChrome`, section
`icon:`, SVG helpers `t-* n-* e m`; rwb-minimal — `SourceNote`, `Ph`, `source:`, `rule`.

Conformance: the theme's CI runs `deck audit` on the kit's `examples/contract.md` with
the theme selected; green means the deck vocabulary renders. A finished deck is not
expected to survive a theme swap untouched (hand-tuned SVG widths, `dense`, line breaks
are style-specific); the agent re-lays it out, guided by the target theme's `SKILL.md`.

## Curator specifics

- Both the kit and the themes are pure context skills: no `agent-skill.json` commands,
  so no interpreter or shim constraints. Optional `agent-skill.json` only for
  `dependencies.commands` (node ≥ 20, npm, git, gh) so a missing runtime fails early
  with a hint.
- Curator strips `README*` everywhere it finds them, so the scaffold's README is
  `templates/deck/README.deck.md` and `deck init` renames it.
- The agent's flow: `curator add deck --git …/slidev-deck --tag vK && curator install`
  → reads `SKILL.md` → `npx github:relux-works/slidev-deck#vK init --theme rwb-tech`
  → `npm run dev`. Environment bootstrap is `npm install`; nothing else.
- Third-party themes never enter the Skillfile (no `SKILL.md`); `deck theme use` just
  installs them and the kit's generic rules apply.
- Nice-to-have for curator-spec later: a `dependencies.resources` kind for git repos
  without `SKILL.md`. Not needed for this design.

## Migration

1. Write `theme-contract.md` from the two style guides; add `examples/contract.md`.
2. Extract themes: `slidev-theme-rwb-tech` from `theme/` at HEAD, `slidev-theme-rwb-minimal`
   from `git show 43e4de6:theme` + the first kit's README as its guide. Add `SKILL.md`,
   `references/style-guide.md`, CI conformance. Tag v1.0.0 each.
3. Build the kit: move `.scripts/audit-overflow.mjs`, `check-frontmatter.py` (port to
   node), `setup/*` and the FLAT badge into `slidev-deck`; make the audit measure the
   layout box instead of 494/480; write SKILL.md + references from what this project
   learned; scaffold templates from this repo's tooling. Tag v0.1.0.
4. Switch this deck: delete `theme/ .scripts/ setup/ style.css`, add pins, `Skillfile.json`,
   `addons: [deck]`; require an identical contact sheet before and after.
5. Fresh-directory test: `curator init` → `curator add deck` → `curator install` →
   `npx … init --theme rwb-minimal` → `deck audit` green on the contract deck.

## Decisions needed

- GitHub org (`relux-works` next to curator, or `ivanopcode`) and visibility. Themes
  public is the practical choice: deck CI installs them by git URL without tokens.
- Names: kit `slidev-deck` (npm `slidev-addon-deck`, bin `deck`); themes `rwb-tech`
  (current corporate) and `rwb-minimal` (the first, typographic one).
- Whether the kit keeps `deck theme use` writing the Skillfile, or themes stay
  npm-only and the agent reads the guide from `node_modules`.
