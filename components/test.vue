<!-- ChildComp.vue -->
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>计数器：{{ count }}</p>
    <button @click="count++">+1</button>
    <p class="log">{{ log }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

const props = defineProps({ title: String })
const count = ref(0)
const log = ref('')

onMounted(() => {
  log.value += 'mounted | '
})

onUnmounted(() => {
  log.value += 'unmounted | '
})

onActivated(() => {
  log.value += 'activated | '
})

onDeactivated(() => {
  log.value += 'deactivated | '
})
</script>
