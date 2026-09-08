import { defineTransformersSetup } from '@slidev/types'

// Rehearsal mode (`npm run dev:flat`, VITE_FLAT_CLICKS=1): strip every click
// from the markdown before Slidev compiles it, so slides carry no internal
// steps at all — nothing for the client to skip. Runs in Node, hence
// process.env rather than import.meta.env.
const FLAT = !!process.env.VITE_FLAT_CLICKS

export default defineTransformersSetup(() => {
  if (!FLAT)
    return {}
  return {
    pre: [
      (ctx) => {
        // <v-clicks> … </v-clicks>, <v-click> … </v-click>: keep the content
        ctx.s.replace(/<\/?v-clicks?(?:\s[^>]*)?>/g, '')
        // v-click / v-click="2" / v-click="[1, 2]" attributes on any element
        ctx.s.replace(/\sv-click(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=[\s>/])/g, '')
        // ```bash {all|7|8|all} → ```bash {all}: first highlight state only
        ctx.s.replace(/^(```[^\n{]*\{)([^}|\n]*)\|[^}\n]*\}/gm, '$1$2}')
      },
    ],
  }
})
