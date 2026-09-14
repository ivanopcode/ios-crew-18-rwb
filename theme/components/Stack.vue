<script setup lang="ts">
// Строки «термин — пояснение»: [label, description, tone?]. reveal — по одной строке на клик.
// На фоне — линейки между строками; внутри карточки — те же строки светлыми линейками.
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
<style>
.rwb-stack { display: grid; margin: 0 0 16px 0; }
.rwb-stack .layer { display: grid; grid-template-columns: 38% 1fr; column-gap: 20px; align-items: baseline; padding: 10px 0; border-top: 1px solid var(--rwb-rule); }
.rwb-stack .layer:first-child { border-top: 0; padding-top: 0; }
.rwb-stack .label { font-weight: 500; font-size: 17px; color: var(--rwb-txt); }
.rwb-stack .desc { color: var(--rwb-sec); font-size: 15px; line-height: 1.35; }
.rwb-stack .layer.tone-lilac .label { color: var(--rwb-lilac); }
.rwb-stack .layer.tone-lime .label { color: var(--rwb-lime); }
.rwb-stack .layer.tone-orange .label { color: var(--rwb-orange); }
.card .rwb-stack { margin: 0; }
.card .rwb-stack .layer { border-color: var(--rwb-rule-card); grid-template-columns: 40% 1fr; column-gap: 14px; padding: 8px 0; }
.card .rwb-stack .label { font-size: 16px; }
.card .rwb-stack .desc { color: var(--rwb-sec-card); font-size: 14px; }
.card.purple .rwb-stack .layer { border-color: rgba(255, 255, 255, 0.28); }
.card.purple .rwb-stack .label { color: var(--rwb-txt); }
.card.purple .rwb-stack .desc { color: rgba(255, 255, 255, 0.82); }
</style>
