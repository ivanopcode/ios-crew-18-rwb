<script setup lang="ts">
defineProps<{ tag?: string, source?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-code-side">
    <Tag v-if="tag" :text="tag" />
    <slot name="title" />
    <div class="grid">
      <div><slot /></div>
      <div class="side"><slot name="side" /></div>
    </div>
    <SourceNote v-if="source" :text="source" />
  </div>
</template>
