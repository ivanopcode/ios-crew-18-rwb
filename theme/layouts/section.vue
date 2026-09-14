<script setup lang="ts">
// Открывашка части. icon — 3D-иконка корпоративного шаблона: server · cubes · computer · notepad.
import server from '../assets/icons/server.webp'
import cubes from '../assets/icons/cubes.webp'
import computer from '../assets/icons/computer.webp'
import notepad from '../assets/icons/notepad.webp'
const ICONS: Record<string, string> = { server, cubes, computer, notepad }
withDefaults(defineProps<{ num?: string, sub?: string, icon?: 'server' | 'cubes' | 'computer' | 'notepad' | 'none', motif?: string }>(), { icon: 'none' })
</script>
<template>
  <div class="slidev-layout rwb-section">
    <Squares set="section" />
    <div v-if="num" class="num">{{ num }}</div>
    <slot />
    <div v-if="sub" class="sub">{{ sub }}</div>
    <img v-if="icon && icon !== 'none' && ICONS[icon]" class="icon" :src="ICONS[icon]" alt="" />
    <RwbChrome kind="purple" />
  </div>
</template>
