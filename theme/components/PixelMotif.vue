<script setup lang="ts">
// Пиксельный мотив — вектор. 1 = сирень, 2 = оранжевый, 3 = лайм. Один мотив на слайд.
// arrow/check/plus — титул, открывашка, финал; cross/tick — вердикт «так не делаем / так делаем»; smile — финал.
import { computed } from 'vue'
const props = withDefaults(defineProps<{ pattern?: 'arrow' | 'check' | 'plus' | 'cross' | 'tick' | 'smile', cell?: number, gap?: number }>(), { pattern: 'arrow', cell: 22, gap: 5 })
const P: Record<string, number[][]> = {
  arrow: [[0,0,1,0,0],[0,0,0,1,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0]],
  check: [[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,2]],
  plus:  [[0,1,0],[1,1,1],[0,1,0]],
  cross: [[2,0,0,0,2],[0,2,0,2,0],[0,0,2,0,0],[0,2,0,2,0],[2,0,0,0,2]],
  tick:  [[0,0,0,0,3],[0,0,0,3,0],[3,0,3,0,0],[0,3,0,0,0]],
  smile: [[0,1,0,0,0,1,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,1],[0,1,0,0,0,1,0],[0,0,1,1,1,0,0]],
}
const grid = computed(() => P[props.pattern] || P.arrow)
const size = computed(() => ({ w: grid.value[0].length * (props.cell + props.gap) - props.gap, h: grid.value.length * (props.cell + props.gap) - props.gap }))
</script>
<template>
  <svg :width="size.w" :height="size.h" :viewBox="`0 0 ${size.w} ${size.h}`" aria-hidden="true">
    <template v-for="(row, r) in grid" :key="r">
      <template v-for="(v, c) in row" :key="c">
        <rect v-if="v" :x="c * (cell + gap)" :y="r * (cell + gap)" :width="cell" :height="cell" :fill="v === 2 ? 'var(--rwb-orange)' : v === 3 ? 'var(--rwb-lime)' : 'var(--rwb-lilac)'" />
      </template>
    </template>
  </svg>
</template>
