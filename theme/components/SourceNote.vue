<script setup lang="ts">
defineProps<{ text?: string }>()
</script>
<template><div class="rwb-source"><slot>{{ text }}</slot></div></template>
<style scoped>
.rwb-source { position: absolute; left: 64px; right: 64px; bottom: 34px; font-size: 13px; color: var(--rwb-sec); line-height: 1.3; }
</style>
