<script setup lang="ts">
// Ряд плашек: шаги процесса, элементы контракта, категории. Заливки без обводок.
// color — тон плашки: серая (dim/sec/neutral), сирень, лайм, оранжевый, фиолетовый; светлые заливки — тёмный текст.
// colors — тон для каждой плашки отдельно (категории); reveal — плашки появляются по одному клику каждая.
const props = withDefaults(defineProps<{ items: string[], arrows?: boolean, reveal?: boolean, color?: 'lilac' | 'lime' | 'orange' | 'purple' | 'dim' | 'sec' | 'neutral', colors?: string[] }>(), { arrows: true, reveal: false, color: 'neutral' })
const tone = (i: number) => 'tone-' + ((props.colors && props.colors[i]) || props.color)
</script>
<template>
  <div class="rwb-boxes">
    <template v-if="reveal">
      <div v-for="(it, i) in items" :key="i" v-click class="cell">
        <div v-if="arrows && i > 0" class="arr">→</div>
        <div class="box" :class="tone(i)">{{ it }}</div>
      </div>
    </template>
    <template v-else>
      <template v-for="(it, i) in items" :key="i">
        <div class="box" :class="tone(i)">{{ it }}</div>
        <div v-if="arrows && i < items.length - 1" class="arr">→</div>
      </template>
    </template>
  </div>
</template>
<style scoped>
.rwb-boxes { display: flex; align-items: stretch; gap: 16px; margin: 0 0 16px 0; }
.cell { flex: 1; display: flex; align-items: stretch; gap: 16px; }
.cell .box { flex: 1; }
.box { flex: 1; min-width: 0; color: var(--rwb-txt); background: var(--rwb-card); border-radius: var(--rwb-radius); padding: 16px 18px; font-weight: 500; font-size: 17px; line-height: 1.3; min-height: 72px; box-sizing: border-box; }
.box.tone-lilac { background: var(--rwb-lilac); color: var(--rwb-ink); }
.box.tone-lime { background: var(--rwb-lime); color: var(--rwb-ink); }
.box.tone-orange { background: var(--rwb-orange); color: var(--rwb-ink); }
.box.tone-purple { background: var(--rwb-purple); }
.arr { color: var(--rwb-sec); align-self: center; font-size: 20px; }
</style>
