<script setup lang="ts">
defineProps<{ num?: string, sub?: string, motif?: 'arrow' | 'check' | 'plus' | 'cross' | 'tick' | 'smile' | 'none' }>()
</script>
<template>
  <div class="slidev-layout rwb-section">
    <div v-if="num" class="num">{{ num }}</div>
    <slot />
    <div v-if="sub" class="sub">{{ sub }}</div>
    <PixelMotif v-if="motif !== 'none'" :pattern="motif || 'check'" class="absolute right-16 top-24" />
  </div>
</template>
