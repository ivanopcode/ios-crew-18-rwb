<script setup lang="ts">
withDefaults(defineProps<{ who?: string, contacts?: string, qrs?: string[], logo?: boolean, motif?: string }>(), { logo: true })
</script>
<template>
  <div class="slidev-layout rwb-end">
    <Squares set="end" />
    <slot />
    <div v-if="qrs && qrs.length" class="qrs">
      <div v-for="q in qrs" :key="q"><div class="qr">QR</div><div class="qr-cap">{{ q }}</div></div>
    </div>
    <div v-if="who" class="contacts">{{ who }}<br v-if="contacts" />{{ contacts }}</div>
    <RwbChrome kind="end" />
  </div>
</template>
