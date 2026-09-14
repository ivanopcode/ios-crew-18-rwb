<script setup lang="ts">
// Титул. image — карточка конференции на весь слайд (файл из public/); subline — строка, дорисованная поверх карточки под именем. Без image — текстовый титул темы.
import { withBase } from '../utils/base'
withDefaults(defineProps<{ event?: string, who?: string, role?: string | string[], contacts?: string, logo?: boolean, image?: string, subline?: string, motif?: string }>(), { logo: true })
</script>
<template>
  <div class="slidev-layout rwb-cover" :class="{ 'has-image': !!image }">
    <img v-if="image" class="cover-img" :src="withBase(image)" alt="" />
    <div v-if="image && subline" class="subline">{{ subline }}</div>
    <Tag v-if="event && !image" :text="event" class="absolute left-9 top-8" />
    <RwbLogo v-if="logo !== false && !image" class="absolute right-9 top-8" />
    <slot />
    <div v-if="who" class="who">
      <div class="name">{{ who }}</div>
      <div v-for="(line, i) in (Array.isArray(role) ? role : role ? [role] : [])" :key="i">{{ line }}</div>
    </div>
    <div v-if="contacts" class="contacts">{{ contacts }}</div>
    <Squares v-if="!image" set="statement" />
  </div>
</template>
