<script setup lang="ts">
// Число-якорь: карточка с крупным числом и подписью. tone — фиолетовая (по умолчанию) или серая с сиреневым числом.
withDefaults(defineProps<{ value: string, caption?: string, tone?: 'purple' | 'neutral', size?: 'md' | 'xl' }>(), { tone: 'purple', size: 'md' })
</script>
<template>
  <div class="card rwb-bignum" :class="[tone === 'purple' ? 'purple' : '', 'size-' + size]"><div class="v">{{ value }}</div><div v-if="caption" class="c">{{ caption }}</div></div>
</template>
<style scoped>
.rwb-bignum { display: flex; flex-direction: column; min-height: 140px; }
.v { font-size: 48px; font-weight: 500; line-height: 1.05; letter-spacing: -0.02em; }
.rwb-bignum:not(.purple) .v { color: var(--rwb-lilac); }
.c { font-size: 15px; line-height: 1.35; margin-top: 10px; color: rgba(255, 255, 255, 0.86); }
.rwb-bignum:not(.purple) .c { color: var(--rwb-sec-card); }
.size-xl { justify-content: center; }
.size-xl .v { font-size: 120px; line-height: 1; }
.size-xl .c { margin-top: 18px; font-size: 16px; }
</style>
