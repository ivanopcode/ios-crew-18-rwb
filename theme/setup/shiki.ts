import { defineShikiSetup } from '@slidev/types'
import rwbDark from './rwb-dark.json'

// Цвета синтаксиса из шаблона RWB: ключевые слова и флаги — сирень, строки и числа — оранжевый, комментарии — вторичный серый.
export default defineShikiSetup(() => ({
  themes: { dark: rwbDark as any, light: rwbDark as any },
}))
