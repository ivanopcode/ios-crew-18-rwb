<script setup lang="ts">
defineProps<{ tag?: string, source?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-content rwb-code-side">
    <slot name="title" />
    <div class="grid">
      <div><slot /></div>
      <div class="card purple side"><slot name="side" /></div>
    </div>
    <SourceNote v-if="source" :text="source" />
    <RwbChrome kind="content" :tag="tag" />
  </div>
</template>
