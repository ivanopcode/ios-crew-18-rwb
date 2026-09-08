# iOS Crew #18 & RWB

Presentation as code for the **iOS Crew #18 & RWB** meetup, built with [Slidev](https://sli.dev).

The deck lives in [`slides.md`](./slides.md) — plain Markdown with Vue components, code
highlighting, Mermaid diagrams and presenter notes. Everything is versioned, diffable and
reviewable like normal source.

## Quick start

```bash
npm install
npm run dev     # http://localhost:3030
```

Presenter mode: press `p` while the deck is open, or go to `/presenter`.
Overview of all slides: press `o`.

## Structure

| Path | Purpose |
| --- | --- |
| `slides.md` | The deck itself — one `---` separated block per slide |
| `components/` | Custom Vue components usable directly inside `slides.md` |
| `snippets/` | External code samples imported into slides via `<<< @/snippets/file.swift` |
| `public/` | Static assets (images, video, fonts) served from `/` |
| `.scripts/` | Reusable project scripts |
| `.temp/` | Scratch artifacts, exports, logs — **gitignored** |

## Tools

| Tool | What it's for | How to run | Output |
| --- | --- | --- | --- |
| `@slidev/cli` | Dev server with hot reload | `npm run dev` | `http://localhost:3030` |
| `@slidev/cli` | Static SPA build (deployable) | `npm run build` | `dist/` |
| `@slidev/cli` | PDF export | `npm run export` | `.temp/export/ios-crew-18-rwb.pdf` |
| `@slidev/cli` | PPTX export | `npm run export:pptx` | `.temp/export/ios-crew-18-rwb.pptx` |
| `@slidev/cli` | Speaker notes export | `npm run notes` | `.temp/export/notes.pdf` |
| `npm` | Dependency management | `npm install` | `node_modules/` |

### Export prerequisites

PDF/PPTX export renders through headless Chromium, which is **not** installed by default:

```bash
npm install -D playwright-chromium
npm run export
```

## Authoring cheatsheet

- `---` on its own line separates slides; a slide may start with a YAML frontmatter block
  (`layout:`, `transition:`, `class:` …).
- `<v-click>` / `<v-clicks>` reveal content step by step.
- ` ```swift {all|1-3|5-9} ` cycles line highlighting on each click.
- `<!-- ... -->` at the end of a slide becomes presenter notes.
- Layouts: `default`, `center`, `cover`, `two-cols`, `image-right`, `quote`, `end`.
- Full reference: <https://sli.dev/guide/syntax>

## Conventions

- Deck copy in the language of the talk; repo docs, commit messages and code comments in English.
- Assets go to `public/`, never inlined as base64 in `slides.md`.
- Long code samples live in `snippets/` and are imported, so they stay compilable and lintable.
