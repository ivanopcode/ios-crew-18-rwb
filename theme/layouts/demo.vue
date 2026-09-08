<script setup lang="ts">
defineProps<{ tag?: string, question?: string, expect?: string, where?: string, fallback?: string, source?: string }>()
</script>
<template>
  <div class="slidev-layout rwb-demo">
    <Tag v-if="tag" :text="tag" />
    <slot name="title" />
    <div class="grid">
      <div class="qa">
        <p v-if="question"><span class="k">Вопрос: </span>{{ question }}</p>
        <p v-if="expect"><span class="k">Что увидите: </span>{{ expect }}</p>
        <p v-if="where"><span class="k">Куда смотреть: </span>{{ where }}</p>
        <p v-if="fallback" class="sec small"><span class="k">Если запись не откроется: </span>{{ fallback }}</p>
      </div>
      <div class="cfg"><slot /></div>
    </div>
    <SourceNote :text="source || 'Запись ≤ 90 секунд до checkpoint · таймстемпы реальные · ускорение подписано в кадре'" />
  </div>
</template>
