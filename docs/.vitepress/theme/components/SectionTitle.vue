<script setup>
defineProps({
  icon: { type: String, default: '' },
  title: { type: String, required: true },
  sub: { type: String, default: '' },
  spacious: { type: Boolean, default: false }
})
</script>

<template>
  <p class="section-title" :class="{ spacious }">
    <span v-if="icon" class="icon">{{ icon }}</span>{{ icon ? ' ' : '' }}{{ title }}
    <span v-if="sub" class="sub">— {{ sub }}</span>
  </p>
</template>

<style scoped>
.section-title {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 24px 0 8px;
}
.section-title.spacious {
  margin: 32px 0 8px;
}
.icon {
  /* 이모지는 그대로 표시 */
}
.sub {
  color: var(--vp-c-text-2);
  font-weight: 400;
  font-size: 0.85em;
}
</style>
