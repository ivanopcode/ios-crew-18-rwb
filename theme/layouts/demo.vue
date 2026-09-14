<script setup lang="ts">
// Бампер перед демо: метка «Демо N», крупный заголовок и подзаголовок из содержимого слайда.
defineProps<{ tag?: string, num?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-demo">
    <Squares set="demo" />
    <div v-if="num" class="num">{{ num }}</div>
    <slot />
    <RwbChrome kind="demo" :tag="tag" />
  </div>
</template>
