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

PDF/PPTX export renders through headless Chromium, which is **not** in the lockfile:

```bash
npm install --no-save playwright-chromium
npm run export
```

## Distribution

`npm run build` produces a **fully static SPA** in `dist/` — `index.html`, `404.html`,
`assets/*` and a Netlify `_redirects` file. Nothing server-side is required to show the
deck; any static file host will do.

Two constraints come with that:

- **Asset paths are absolute** (`/assets/...`), so opening `dist/index.html` over `file://`
  does not work. Serve it over HTTP: `npx serve dist`. Hosting under a subpath needs a
  matching base: `npx slidev build --base /ios-crew-18-rwb/`.
- **Client-side routing** drives `/1`, `/2`, `/presenter`, so the host must fall back to
  `index.html` on unknown paths. `404.html` covers GitHub Pages, `_redirects` covers
  Netlify; nginx/Caddy need a `try_files` rule.

### CI

[`.github/workflows/build.yml`](.github/workflows/build.yml) runs on every push to `main`,
on pull requests and on demand. It publishes two workflow artifacts:

| Artifact | Contents | Retention |
| --- | --- | --- |
| `slides-html` | `dist/` — the static SPA | 90 days |
| `slides-pdf` | `ios-crew-18-rwb.pdf` | 90 days |

Grab them from the run page, or via CLI:

```bash
gh run download --name slides-pdf
gh run download --name slides-html && npx serve dist
```

This path works on a private repo on the Free plan — no public URL involved.

### Public hosting

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) is wired for GitHub Pages but
`workflow_dispatch`-only, because **Pages is unavailable for private repositories on the
Free plan**. To use it: make the repo public (or move to Pro/Team), set
*Settings → Pages → Source: GitHub Actions*, then run the workflow. It builds with
`--base /<repo>/` so the assets resolve under the Pages subpath.

For a private URL instead, point Cloudflare Pages / Netlify / Vercel at this repo — all
three build private repos on their free tiers; Cloudflare Access can put the site behind
auth without leaving the free plan.

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
