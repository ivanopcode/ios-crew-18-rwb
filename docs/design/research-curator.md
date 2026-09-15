# Curator research findings (2026-09-15)

Sources (both public):
- curator-spec (1.0.0-rc.9, 2026-08-23, MIT): protocol/core.md, profiles/manager.md, protocol/environments.md, cli/curator.md, schemas/v1/, decisions/0004-compile-only-build-drivers.md
- curator (Go reference impl, Apache-2.0): README.md, docs/cli.md, docs/authoring-cli-commands.md, docs/source-closure-adapter-conformance.md, internal/skillspec/types.go

## 1. What Curator is
README: "Curator is an agent environment manager (AEM). The software manages what an AI coding agent receives in a project environment: skill packages, transitive dependencies, executable command shims, MCP server requirements, per-agent delivery adapters, and security verification gates. Declarative configuration produces reproducible installations."
Spec README: "an open protocol for declarative, reproducible, security-gated installation of AI agent skills."
Runtime: single Go binary `curator` (macOS/Linux/Windows). Install: brew relux-works/tap/curator, install.sh, scoop, `go install github.com/relux-works/curator/cmd/curator@latest`. Home `~/.curator` (runtime store ~/.curator/runtime/<skill>/<commit>, build cache).
Lifecycle: `curator bootstrap --if-missing`, `curator init` (Skillfile.json), `curator add <name> --git URL --tag vX`, `curator install [--dry-run --strict-tags --audit strict]`, `upgrade`, `update`, `status --check --json`, `skill check <dir>`, `global ...`, `hybrid ...`, `profile install <git-url|path>`, `shell-init --install` (optional), `gc`, `audit`, `ui`.
Install layout: context `.agents/skills/<name>/`, shims `.agents/bin/<cmd>` (.cmd on Windows), `.agents/env.sh|env.ps1` (PATH + CSK_PROJECT_ROOT), markers `.csk-install.json`, adapter ledger `.csk-managed.json`.

## 2. Skill model
core.md §3: "A skill package is a git snapshot or a directory within one. Its root MUST contain `SKILL.md` with YAML frontmatter containing non-empty `name` and `description` strings. The frontmatter `name` MUST equal the declared skill name. `triggers`, when present, is a list of non-empty strings."
"An installer MUST NOT execute package-provided code while resolving, validating, auditing, or installing a skill."
§3.1 context roots: SKILL.md agents/ references/ .skill_triggers/ assets/ templates/ examples/ data/ ; "`scripts/` is additionally eligible only when the package exports no commands." Excluded: .git .github .venv __pycache__ node_modules tests test README* CHANGELOG* LICENSE* Makefile setup.py pyproject.toml requirements*.txt.
Optional machine manifest `agent-skill.json` (legacy csk-skill.json), schemas 1..8: 1 script/system commands; 2 runtime_roots; 3 capabilities REQUIRED; 4 transitive skill deps; 5 MCP requirements; 6 go-v1 build commands + build_roots; 7 external build repos go-repository-v1; 8 script-worker-v1 policy + modules. "agent-skill.json is OPTIONAL for a pure context skill".
Localization: locales/metadata.json + .skill_triggers/<locale>.md; agents/openai.yaml rendered (display_name, short_description, default_prompt).
Discovery: Skillfile.json {name, source|git, tag|branch|revision}; `source` = path under machine `skills_root`; `git` otherwise. Skillfile.dev.json = uncommitted local path substitutions. Sources are git only; canonical identity host/path; allowlist. The "registry" is an audit registry (signed audit records), not a package index. Scopes: project / global (mirrored to ~/.claude/skills etc.) / hybrid (targets by alias/glob).

## 3. Environment dependencies
Not supported as install-time action. Zero-execution install is a core invariant.
- dependencies.commands: {"type":"system","command":"node","hint":"..."} — "A missing system command fails installation with the hint." Declares, never installs.
- capabilities (§4.3): "an audit surface, not a runtime sandbox" (network/filesystem/exec/secrets/env_read/prompt_scope).
- script commands: {"type":"script","unix_path","win_path"} under runtime_roots → shims. Schema 8 interpreters closed set: internal/skillspec/types.go `ScriptInterpreters = {"node-v1","python3-v1"}`; shells deliberately absent. script-worker-v1 is rejected by current Go impl: "script_execution_policy_unsupported ... Curator currently lacks a script worker process".
- build commands: only go-v1 / go-repository-v1, vendored, networkless. core §4.2: "A package MUST NOT select a program, arguments, environment, tags, flags, toolchain, output path, build script, hook, plugin, generator, or post-build action." decisions/0004: "npm lifecycle scripts and Node/TypeScript bundler configuration, loaders, and plugins were rejected." Go builds refused on Linux (build_execution_control_unavailable).
- internal/npmsource, pnpmsource, yarn*source, rustsource, swiftpmsource: source-closure adapters (lockfile capture, lifecycle suppression) for planned drivers; not admitted from manifests.
- No postinstall/setup hook, no OS-package manifest, no sandbox. environments.md: "Profiles are data end to end. No file in a package snapshot is executed, sourced, or interpreted as configuration for the manager itself."
- MCP: dependencies.mcp_servers {hint, transport?, required_in any|all}; read-only check of .mcp.json / ~/.claude.json / .codex/config.toml etc. "A manager MUST NOT launch, install, enable, or modify an MCP server".

## 4. External git resources / packs / templates / plugins
- dependencies.skills.<name> = {git, ref:{kind tag|revision}, mode full|runtime|context, commands?}; "branch and range syntax is forbidden". A theme/template repo can be pulled only if it is itself a skill package (has SKILL.md), e.g. mode "context". One name → one commit per closure (§7).
- build_repositories (schema 7): git + locked_commit full sha (+tag) — only for go-repository-v1 targets via skill-build.json.
- environments protocol: agent-context.json context packages with git + semver range/tag/revision + directory, requires.contexts/skills/mcp, weights/overlays — an "umbrella/pack" concept for root context + profiles, not arbitrary assets.
- No generic fetch-URL primitive; templates/ assets/ examples/ are just context dirs inside the package; no plugin/hook system.

## 5. Claude Code / Codex relation
manager.md §5 adapters: claude_code .claude/skills / ~/.claude/skills; codex_cli .codex/skills / ~/.codex/skills; cursor .cursor/rules; gemini .gemini/skills; opencode/windsurf native .agents/skills. "Adapter entries are symlinks, copies, or automatic symlink-with-copy-fallback." Canonical root .agents/skills/<name>/ mirrored — same shape as manual agents/skills + symlinks, tool-managed with ledger. curator repo itself uses manual symlink pattern (.claude/skills/skill-go-testing-tools -> ../../agents/skills/...).
SKILL.md: compatible with Anthropic format (frontmatter name+description; optional triggers). Spec never cites Anthropic; only agents/openai.yaml for Codex. Anthropic-style skill dir installs as "pure context skill" without agent-skill.json.

## 6. Versioning / pinning / lockfiles
- Skillfile.json: exactly one of tag|branch|revision; no ranges; transitive deps tag|revision only. Resolved commit + content hashes in .csk-install.json markers (v1..v4); `status` reports drift codes; --strict-tags makes a moved tag an error. No Skillfile.lock — markers are the pin record. Skillfile.dev.json for local overrides.
- environments: context-lock-v1 lock (machine state, "The lock is the identity"), SemVer v-prefixed tags, node-semver ranges (^ ~ x || ), only profile install/update move it.
- Audit registry: signed records by content hash; operator pins `curator audit --allow <hash> --reason`.
