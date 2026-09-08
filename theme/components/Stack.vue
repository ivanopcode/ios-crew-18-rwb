<script setup lang="ts">
// Вертикальные слои: [label, description, color?]
defineProps<{ layers: string[][] }>()
</script>
<template>
  <div class="rwb-stack">
    <div v-for="(l, i) in layers" :key="i" class="layer" :class="l[2] || 'dim'">
      <div class="label">{{ l[0] }}</div><div class="desc">{{ l[1] }}</div>
    </div>
  </div>
</template>
<style scoped>
.rwb-stack { display: grid; gap: 10px; margin: 6px 0 16px 0; }
.layer { display: grid; grid-template-columns: 38% 1fr; align-items: center; border: 1.25px solid var(--rwb-dim); border-radius: 4px; background: var(--rwb-node); padding: 12px 18px; }
.layer.lilac { border-color: var(--rwb-lilac); } .layer.lime { border-color: var(--rwb-lime); } .layer.orange { border-color: var(--rwb-orange); } .layer.sec { border-color: var(--rwb-sec); }
.label { font-weight: 700; font-size: 17px; } .desc { color: var(--rwb-sec); font-size: 15px; }
</style>
