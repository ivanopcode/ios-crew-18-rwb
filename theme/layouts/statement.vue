<script setup lang="ts">
defineProps<{ tag?: string, after?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-statement">
    <Squares set="statement" />
    <div class="statement"><slot /></div>
    <div v-if="after" class="after">{{ after }}</div>
    <RwbChrome kind="demo" :tag="tag" />
  </div>
</template>
