<script setup lang="ts">
defineProps<{ tag?: string, source?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-two-cols">
    <Tag v-if="tag" :text="tag" />
    <slot name="title" />
    <div class="cols">
      <div><slot /></div>
      <div><slot name="right" /></div>
    </div>
    <slot name="bottom" />
    <SourceNote v-if="source" :text="source" />
  </div>
</template>
