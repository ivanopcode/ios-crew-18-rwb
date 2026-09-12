# Unresolved questions

Open items for the talk that need the author's decision or a measurement before the
final run. Slide numbers refer to the current `slides.md`.

## Needs a measurement

- **Context size per agent.** The memory slides show weights at 16.5 GB and contexts as
  relative bars. Measure the actual KV size for Qwen3.8-27B at 8K / 16K / 64K from the
  `llama-server` startup log and put the numbers on the slide.
- **Aggregate throughput.** "10 t/s single session, ~35 t/s across eight contexts (×3–4)"
  is an estimate from memory-bandwidth-bound decode. Measure on the demo machine with
  `-np 4` and `-np 8` and replace.
- **Quantization sizes.** Only UD-Q4_K_M (16.5 GB) and UD-Q6_K (22 GB) are published;
  BF16 / Q8_0 / Q3 / Q2 sizes are derived from bit width. Check against the unsloth
  repo before the talk.
- **Subscription token limits.** "×5 fewer tokens than three months ago, still ×3 above
  metered" comes from community estimates. Cite a source or soften the wording.
- **Upgrade payback.** "M5 24 GB → M5 Max 64 GB pays back in 2–3 months" — write down
  the assumed token volume and price so the number can be defended from the stage.
- **Admin rights.** Check whether building llama.cpp and downloading the Qwen GGUF
  require administrator rights on a corporate Mac (Homebrew, network policy).

- **Pi `models.json`.** The provider block on the "Подключаем агентскую среду" slide is
  written from memory of pi-coding-agent's format (`providers.<name>.{baseUrl, api,
  apiKey, models[]}`). Verify against the installed pi version before the demo.
- **Intelligence Index chart.** Live figures from artificialanalysis.ai on 2026-09-09:
  Qwen3.8-27B 34 (dense 27B), Muse Glimmer 18 (dense 30B), gpt-oss-120b 12 (MoE
  117B/5.1B), GLM-5.3 45 (MoE 753B/40B), Claude Opus 5 (max) 51 from its own model page, Claude
  Fable 5.1 53. Opus 5 is quoted elsewhere at 59 / 61 / 63 and Fable 5.1 at 66 — those
  are other index versions and effort tiers; do not mix them into this chart. An
  earlier Artificial Analysis article gave 54 for the best open model and a 3–6 point
  gap — a different index version. Index versions change between releases; re-check
  the week of the talk and keep one version throughout.
- **Year-of-work calculation.** ~100 t/s aggregate on M5 Max 64 GB is extrapolated from
  a published ~30 t/s single-stream figure for a 27B Q4 model (llmcheck.net) times the
  ×3–4 parallel-context multiplier; API prices $0.24/$0.90 per M from pricepertoken.com;
  the 1 500-in / 500-out step shape and the 16K context are assumptions about agentic
  loops. Hardware payback uses MacBook Pro 14" M5 Max: $3 599 at 36 GB and $4 099 at 48 GB
  are published, the 64 GB configuration is estimated at ≈ $4 300 by one memory step
  and needs checking on apple.com. The 36 → 64 GB delta of ≈ $700 is the number the
  argument actually rests on, since the laptop is bought either way. Measure throughput on the demo machine and check the step
  shape against a real session log.

- **Reasoning preserve on Qwen3.8.** The server line passes `--reasoning on
  --reasoning-format deepseek --reasoning-preserve --reasoning-budget -1`.
  `--reasoning-preserve` only works when the GGUF chat template declares
  `supports_preserve_reasoning`; check the llama-server startup log on the pinned
  engine commit and confirm `reasoning_content` comes back in multi-turn tool calls.
- **Pi compat block.** `compat.thinkingFormat: "reasoning_effort"`,
  `supportsReasoningEffort: true`, `supportsDeveloperRole: false`,
  `maxTokensField: "max_tokens"` — from pi's docs/models.md; verify the installed pi
  version honours them and that `reasoning_effort` shows up in the server log.

- **Core-LLM thesis.** The new slide claims context engineering loses value for
  Fable/Astra-class models while local models trend toward a "core-LLM" with little
  world knowledge. This is the author's read, not a cited claim — decide whether to
  soften it or name a source.

- **gpt-oss-120b as last year's ceiling.** Artificial Analysis placed it behind
  DeepSeek R1 and Qwen3 235B but called it the most intelligent model runnable on a
  single H100 — so the chart says «потолок на одну машину», not «лучшая открытая
  модель». Dropping the qualifier entirely would make the claim false.
- **Mac Studio 256 GB.** The heavy-category column offers it as the alternative to
  cramming a 320–552B model into 128 GB; confirm the configuration exists and its
  price before the talk.

## Needs a decision

- **Token-burn meme.** Embed the "how fast tokens go" meme or just reference it? Not in
  the deck now.
- **"Junior → middle inference engineer" line.** Currently only in speaker notes for the
  "loops are a bug" slide. Keep, soften, or drop.
- **Relux code sample.** Now three click-swapped blocks condensed from relux-sample
  (`Notes.Business.Effect/Action`, `Notes.Business.State`, `Notes.Module`). Check the
  condensation reads right to a Relux user.
- **Demo 4 scope.** Project from scratch with a cloud orchestrator is marked as an
  experiment. Decide whether to record it or show a table of expected measurements.
- **Bazel.** Mentioned "with an asterisk" — leave as a spoken aside or cut.
- **Deck length.** 42 slides including 4 section openers and 4 demo bumpers. Confirm it
  fits the slot with live demos.
- **Slide transitions.** Disabled (`transition: none`) for rehearsal; only in-slide
  clicks animate. Decide whether to re-enable a cut/fade for the talk.
