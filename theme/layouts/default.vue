<script setup lang="ts">
// tag уходит в футер (global-bottom), здесь принимается, чтобы не падать атрибутом на корень
defineProps<{ tag?: string, source?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-content rwb-default">
    <slot />
    <SourceNote v-if="source" :text="source" />
    <RwbChrome kind="content" :tag="tag" />
  </div>
</template>
