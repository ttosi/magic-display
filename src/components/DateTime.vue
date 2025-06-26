<template>
  <div>
    <div class="text-8xl font-normal text-center w-full">
      <div v-if="second === 0">{{ timeColon }}</div>
      <div v-else>{{ timeNoColon }}</div>
    </div>
    <div class="text-3xl text-center">{{ date }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const second = ref('')
const timeColon = ref('')
const timeNoColon = ref('')
const date = ref('')

const updateDateTime = () => {
  second.value = Number(dayjs().format('ss')) % 2
  timeColon.value = dayjs().format('h:mm A')
  timeNoColon.value = dayjs().format('h mm A')
  date.value = dayjs().format('dddd, MMMM DD')
}

updateDateTime()
const dateTimeInterval = setInterval(() => {
  updateDateTime()
}, 1000)
</script>

<style lang="scss" scoped></style>
