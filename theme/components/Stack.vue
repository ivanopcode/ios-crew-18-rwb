<script setup lang="ts">
// Вертикальные слои: [label, description, color?]. reveal — по одному слою на клик.
withDefaults(defineProps<{ layers: string[][], reveal?: boolean }>(), { reveal: false })
</script>
<template>
  <div class="rwb-stack">
    <template v-if="reveal">
      <div v-for="(l, i) in layers" :key="i" v-click class="layer" :class="'tone-' + (l[2] || 'neutral')">
        <div class="label">{{ l[0] }}</div><div class="desc">{{ l[1] }}</div>
      </div>
    </template>
    <template v-else>
      <div v-for="(l, i) in layers" :key="i" class="layer" :class="'tone-' + (l[2] || 'neutral')">
        <div class="label">{{ l[0] }}</div><div class="desc">{{ l[1] }}</div>
      </div>
    </template>
  </div>
</template>
<style scoped>
.rwb-stack { display: grid; gap: 10px; margin: 6px 0 16px 0; }
.layer.tone-dim { border-color: var(--rwb-dim); }
.layer { display: grid; grid-template-columns: 38% 1fr; align-items: center; border: 1.25px solid var(--rwb-dim); border-radius: 4px; background: var(--rwb-node); padding: 12px 18px; }
.layer.tone-lilac { border-color: var(--rwb-lilac); } .layer.tone-lime { border-color: var(--rwb-lime); } .layer.tone-orange { border-color: var(--rwb-orange); } .layer.tone-sec { border-color: var(--rwb-sec); }
.label { font-weight: 700; font-size: 17px; color: var(--rwb-txt); } .desc { color: var(--rwb-sec); font-size: 15px; }
</style>
