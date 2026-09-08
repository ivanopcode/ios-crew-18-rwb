<script setup lang="ts">
withDefaults(defineProps<{ who?: string, contacts?: string, qrs?: string[], logo?: boolean, motif?: 'arrow' | 'check' | 'plus' | 'cross' | 'tick' | 'smile' | 'none' }>(), { logo: true })
</script>
<template>
  <div class="slidev-layout rwb-end">
    <slot />
    <div v-if="who" class="contacts">{{ who }}<br v-if="contacts" />{{ contacts }}</div>
    <div v-if="qrs && qrs.length" class="qrs">
      <div v-for="q in qrs" :key="q"><div class="qr">QR</div><div class="qr-cap">{{ q }}</div></div>
    </div>
    <PixelMotif v-if="motif !== 'none'" :pattern="motif || 'arrow'" class="absolute right-16 top-16" />
    <RwbLogo v-if="logo !== false" class="absolute right-16 bottom-10" />
  </div>
</template>
