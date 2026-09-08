import { defineAppSetup } from '@slidev/types'

// Rehearsal mode: `npm run dev:flat` sets VITE_FLAT_CLICKS, style.css then
// shows every v-click element at once so each slide reads as one whole.
export default defineAppSetup(() => {
  if (import.meta.env.VITE_FLAT_CLICKS)
    document.documentElement.classList.add('flat-clicks')
})
