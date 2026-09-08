<script setup lang="ts">
defineProps<{ value: string, caption?: string }>()
</script>
<template>
  <div class="rwb-bignum"><div class="v">{{ value }}</div><div v-if="caption" class="c">{{ caption }}</div></div>
</template>
<style scoped>
.rwb-bignum { display: inline-block; margin: 6px 40px 16px 0; vertical-align: top; max-width: 46%; }
.v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 44px; font-weight: 700; line-height: 1.1; }
.c { font-size: 16px; color: var(--rwb-sec); margin-top: 6px; max-width: 32ch; }
</style>
