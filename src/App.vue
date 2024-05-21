<template>
  <main class="flex w-full m-12 gap-7 items-center justify-center">
    <div class="w-1/4 h-full">
      <Calendar />
    </div>
    <div class="w-1/2">
      <div class="w-full">
        <DateTime />
        <div class="mt-20">
          <Weather />
        </div>
      </div>
    </div>
    <div class="w-1/4 h-full">
      <Todos />
    </div>
  </main>
</template>

<script setup>
import DateTime from './components/DateTime.vue'
import Weather from './components/Weather.vue'
import Calendar from './components/Calendar.vue'
import Todos from './components/Todos.vue'

// import dayjs from 'dayjs'

// setInterval(() => {
//   document.body.classList.remove('text-white', 'text-slate-400')
//   if (dayjs().hour() > 6 && dayjs().hour() < 7) {
//     document.body.classList.add('text-white')
//   } else {
//     document.body.classList.add('text-slate-400')
//   }
// }, 60000 * 15)
</script>

<style scoped></style>
