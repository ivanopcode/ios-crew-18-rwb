<script setup lang="ts">
defineProps<{ text?: string }>()
</script>
<template><div class="rwb-source"><slot>{{ text }}</slot></div></template>
