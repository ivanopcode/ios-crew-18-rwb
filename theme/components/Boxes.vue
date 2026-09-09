<script setup lang="ts">
// Ряд контурных блоков со стрелками: шаги процесса, элементы контракта. Без заливок.
// reveal — блоки появляются по одному клику каждый (стрелка приходит вместе со своим блоком).
withDefaults(defineProps<{ items: string[], arrows?: boolean, reveal?: boolean, color?: 'lilac' | 'lime' | 'orange' | 'dim' | 'sec' }>(), { arrows: true, reveal: false, color: 'lilac' })
</script>
<template>
  <div class="rwb-boxes">
    <template v-if="reveal">
      <div v-for="(it, i) in items" :key="i" v-click class="cell">
        <div v-if="arrows && i > 0" class="arr">→</div>
        <div class="box" :class="'tone-' + color">{{ it }}</div>
      </div>
    </template>
    <template v-else>
      <template v-for="(it, i) in items" :key="i">
        <div class="box" :class="'tone-' + color">{{ it }}</div>
        <div v-if="arrows && i < items.length - 1" class="arr">→</div>
      </template>
    </template>
  </div>
</template>
<style scoped>
.rwb-boxes { display: flex; align-items: stretch; gap: 10px; margin: 8px 0 16px 0; }
.cell { flex: 1; display: flex; align-items: stretch; gap: 10px; }
.cell .box { flex: 1; }
.box.tone-dim { border-color: var(--rwb-dim); }
.box { flex: 1; color: var(--rwb-txt); border: 1.25px solid var(--rwb-dim); border-radius: 4px; background: var(--rwb-node); padding: 14px 10px; text-align: center; font-weight: 700; font-size: 16px; display: grid; place-items: center; }
.box.tone-lilac { border-color: var(--rwb-lilac); } .box.tone-lime { border-color: var(--rwb-lime); } .box.tone-orange { border-color: var(--rwb-orange); } .box.tone-sec { border-color: var(--rwb-sec); }
.arr { color: var(--rwb-sec); align-self: center; font-size: 18px; }
</style>
