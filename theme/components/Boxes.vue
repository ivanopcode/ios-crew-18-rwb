<script setup lang="ts">
// Ряд контурных блоков со стрелками: шаги процесса, элементы контракта. Без заливок.
withDefaults(defineProps<{ items: string[], arrows?: boolean, color?: 'lilac' | 'lime' | 'orange' | 'dim' | 'sec' }>(), { arrows: true, color: 'lilac' })
</script>
<template>
  <div class="rwb-boxes">
    <template v-for="(it, i) in items" :key="i">
      <div class="box" :class="color">{{ it }}</div>
      <div v-if="arrows && i < items.length - 1" class="arr">→</div>
    </template>
  </div>
</template>
<style scoped>
.rwb-boxes { display: flex; align-items: stretch; gap: 10px; margin: 8px 0 16px 0; }
.box { flex: 1; border: 1.25px solid var(--rwb-dim); border-radius: 4px; background: var(--rwb-node); padding: 14px 10px; text-align: center; font-weight: 700; font-size: 16px; display: grid; place-items: center; }
.box.lilac { border-color: var(--rwb-lilac); } .box.lime { border-color: var(--rwb-lime); } .box.orange { border-color: var(--rwb-orange); } .box.sec { border-color: var(--rwb-sec); }
.arr { color: var(--rwb-sec); align-self: center; font-size: 18px; }
</style>
