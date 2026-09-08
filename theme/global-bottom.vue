<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>
<template><div class="rwb-pagenum">{{ $page }}</div></template>
<style scoped>
.rwb-pagenum { position: absolute; right: 24px; bottom: 12px; font-family: 'JetBrains Mono', monospace; font-size: 9px; color: var(--rwb-dim); }
</style>
