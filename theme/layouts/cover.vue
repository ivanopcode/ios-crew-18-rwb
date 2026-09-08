<script setup lang="ts">
defineProps<{ event?: string, who?: string, role?: string, contacts?: string, logo?: boolean, motif?: 'arrow' | 'check' | 'plus' | 'none' }>()
</script>
<template>
  <div class="slidev-layout rwb-cover">
    <Tag v-if="event" :text="event" class="absolute left-16 top-9" />
    <RwbLogo v-if="logo !== false" class="absolute right-16 top-8" />
    <slot />
    <div v-if="who" class="who">{{ who }}<br v-if="role" />{{ role }}</div>
    <div v-if="contacts" class="contacts">{{ contacts }}</div>
    <PixelMotif v-if="motif !== 'none'" :pattern="motif || 'arrow'" class="absolute right-16 bottom-12" />
  </div>
</template>
