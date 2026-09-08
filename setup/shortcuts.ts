import { defineShortcutsSetup } from '@slidev/types'

// Rehearsal mode (`npm run dev:flat`): →/Space/PageDown jump straight to the
// next slide, so a slide has no internal click steps. Normal mode keeps
// Slidev's defaults.
export default defineShortcutsSetup((nav, base) => {
  if (!import.meta.env.VITE_FLAT_CLICKS)
    return base
  return base.map((s) => {
    if (s.name === 'next_space' || s.name === 'next_right' || s.name === 'next_page_key')
      return { ...s, fn: () => nav.nextSlide() }
    if (s.name === 'prev_space' || s.name === 'prev_left' || s.name === 'prev_page_key')
      return { ...s, fn: () => nav.prevSlide() }
    return s
  })
})
