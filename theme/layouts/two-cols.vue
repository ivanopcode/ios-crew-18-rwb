<script setup lang="ts">
// Левая колонка — серая карточка, правая — фиолетовая. right-tone / left-tone меняют заливку.
withDefaults(defineProps<{ tag?: string, source?: string, leftTone?: 'neutral' | 'purple' | 'lilac', rightTone?: 'neutral' | 'purple' | 'lilac' }>(), { leftTone: 'neutral', rightTone: 'purple' })
const tone = (t: string) => t === 'neutral' ? '' : t
</script>
<template>
  <div class="slidev-layout rwb-content rwb-two-cols">
    <slot name="title" />
    <div class="cols">
      <div class="card" :class="tone(leftTone)"><slot /></div>
      <div class="card" :class="tone(rightTone)"><slot name="right" /></div>
    </div>
    <slot name="bottom" />
    <SourceNote v-if="source" :text="source" />
    <RwbChrome kind="content" :tag="tag" />
  </div>
</template>
