<script setup lang="ts">
import logo from '../assets/rwb-logo-white.png'
withDefaults(defineProps<{ height?: number }>(), { height: 28 })
</script>
<template><img :src="logo" alt="RWB" :style="{ height: height + 'px', width: 'auto', opacity: 0.95 }" /></template>
