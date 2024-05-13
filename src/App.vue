<template>
  <main class="w-5/12">
    <DateTime />
    <div class="mt-20">
      <Weather />
    </div>
  </main>
</template>

<script setup>
import DateTime from './components/DateTime.vue'
import Weather from './components/Weather.vue'
import dayjs from 'dayjs'

setInterval(() => {
  document.body.classList.remove('text-white', 'text-slate-400')
  if (dayjs().hour() > 6 && dayjs().hour() < 7) {
    document.body.classList.add('text-white')
  } else {
    document.body.classList.add('text-slate-400')
  }
}, 60000 * 15)
</script>

<style scoped></style>
