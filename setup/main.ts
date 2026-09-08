import { defineAppSetup } from '@slidev/types'
import { useNav } from '@slidev/client'

// Rehearsal mode: `npm run dev:flat` sets VITE_FLAT_CLICKS.
// - style.css shows every v-click element at once
// - →/Space/PageDown and ←/Shift+Space/PageUp move by whole slides
// The key handler sits on window in the capture phase, ahead of Slidev's
// own shortcuts, so it works even if a stale bundle still has the defaults.
export default defineAppSetup(() => {
  if (!import.meta.env.VITE_FLAT_CLICKS)
    return
  document.documentElement.classList.add('flat-clicks')
  const badge = document.createElement('div')
  badge.textContent = 'FLAT · no clicks'
  badge.setAttribute('style', 'position:fixed;left:12px;bottom:10px;z-index:9999;font:11px "JetBrains Mono",monospace;letter-spacing:.08em;color:#94E330;opacity:.8;pointer-events:none')
  document.body.appendChild(badge)

  const NEXT = new Set(['ArrowRight', 'PageDown'])
  const PREV = new Set(['ArrowLeft', 'PageUp'])
  window.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement | null
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable))
      return
    if (e.metaKey || e.ctrlKey || e.altKey)
      return
    let dir = 0
    if (e.key === ' ')
      dir = e.shiftKey ? -1 : 1
    else if (NEXT.has(e.key) && !e.shiftKey)
      dir = 1
    else if (PREV.has(e.key) && !e.shiftKey)
      dir = -1
    if (!dir)
      return
    e.preventDefault()
    e.stopPropagation()
    const nav = useNav()
    if (dir > 0)
      nav.nextSlide()
    else
      nav.prevSlide()
  }, { capture: true })
})
