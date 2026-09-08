<script setup lang="ts">
defineProps<{ tag?: string, source?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-default">
    <Tag v-if="tag" :text="tag" />
    <slot />
    <SourceNote v-if="source" :text="source" />
  </div>
</template>
