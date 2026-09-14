<script setup lang="ts">
// Обвязка слайда: логотип RWB в правом верхнем углу и футер — название доклада слева,
// тег части и номер справа. Живёт внутри раскладки, поэтому попадает и в показ, и в PDF
// (глобальные слои Slidev в печати рендерятся один раз на весь документ).
// kind: content — приглушённый логотип и футер; purple — белый логотип, светлый футер (открывашка);
// end — белый логотип, только номер; demo — без логотипа; none — ничего (титул).
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import logo from '../assets/rwb-logo-white.png'
const props = withDefaults(defineProps<{ kind?: 'content' | 'purple' | 'end' | 'demo' | 'none', tag?: string }>(), { kind: 'content' })
const { $slidev, $page } = useSlideContext()
const title = computed(() => String($slidev.configs.title || ''))
const logoKind = computed(() => props.kind === 'content' ? 'dim' : (props.kind === 'purple' || props.kind === 'end') ? 'white' : 'none')
</script>
<template>
  <template v-if="kind !== 'none'">
    <img v-if="logoKind !== 'none'" class="rwb-logo-corner" :class="{ dim: logoKind === 'dim' }" :src="logo" alt="RWB" />
    <div class="rwb-footer" :class="{ 'on-purple': kind === 'purple' || kind === 'end' }">
      <div class="ft-title">{{ kind === 'end' ? '' : title }}</div>
      <div class="ft-right">
        <span v-if="tag && kind !== 'end'" class="ft-tag">{{ tag }}</span>
        <span class="ft-page">{{ $page }}</span>
      </div>
    </div>
  </template>
</template>
