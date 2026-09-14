<script setup lang="ts">
// Лесенка квадратов — пиксельный мотив корпоративного шаблона в масштабе слайда (модуль 69 px).
// Наборы подобраны так, чтобы не пересекаться с логотипом, футером, иконкой и текстом.
withDefaults(defineProps<{ set?: 'section' | 'demo' | 'end' | 'statement' }>(), { set: 'section' })
const M = 69
const SETS: Record<string, { c: string, x: number, y: number, w: number, h: number }[]> = {
  // открывашка: лесенка у верхней кромки справа + сиреневый квадрат у нижней кромки под иконкой
  section: [
    { c: 'lilac', x: 636, y: 0, w: 2 * M, h: M }, { c: 'orange', x: 636 + 2 * M, y: M, w: M, h: M },
    { c: 'lilac', x: 520, y: 483, w: M, h: M },
  ],
  // демо: оранжевый в правом верхнем углу, фиолетовая лесенка в правом нижнем
  demo: [
    { c: 'orange', x: 911, y: 0, w: M, h: M },
    { c: 'purple', x: 911, y: 345, w: M, h: M }, { c: 'purple', x: 842, y: 414, w: M, h: M },
  ],
  statement: [
    { c: 'lilac', x: 842, y: 0, w: 2 * M, h: M }, { c: 'orange', x: 773, y: 413, w: M, h: M },
    { c: 'lilac', x: 636, y: 482, w: 2 * M, h: M },
  ],
  // финал: светлые квадраты, чтобы не спорить с фиолетовым фоном
  end: [
    { c: 'lilac', x: 566, y: 0, w: 2 * M, h: M }, { c: 'lilac', x: 911, y: 207, w: M, h: M },
    { c: 'orange', x: 842, y: 276, w: M, h: 2 * M }, { c: 'lilac', x: 704, y: 482, w: 2 * M, h: M },
  ],
}
</script>
<template>
  <div class="rwb-squares" aria-hidden="true">
    <span v-for="(s, i) in SETS[set] || SETS.section" :key="i" :class="'sq-' + s.c" :style="{ left: s.x + 'px', top: s.y + 'px', width: s.w + 'px', height: s.h + 'px' }" />
  </div>
</template>
