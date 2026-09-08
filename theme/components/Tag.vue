<script setup lang="ts">
defineProps<{ text?: string }>()
</script>
<template><div class="rwb-tag"><slot>{{ text }}</slot></div></template>
<style scoped>
.rwb-tag { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--rwb-lilac); margin-bottom: 6px; }
</style>
