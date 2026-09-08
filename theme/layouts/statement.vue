<script setup lang="ts">
defineProps<{ tag?: string, after?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-statement">
    <Tag v-if="tag" :text="tag" />
    <div class="statement"><slot /></div>
    <div v-if="after" class="after">{{ after }}</div>
  </div>
</template>
