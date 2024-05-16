<template>
  <div>
    <div class="text-8xl text-center">{{ time }}</div>
    <div class="text-3xl text-center">{{ date }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const time = ref('')
const date = ref('')

const updateDateTime = () => {
  time.value = dayjs().format('h:mm A')
  date.value = dayjs().format('dddd, MMMM DD')
}

updateDateTime()
const dateTimeInterval = setInterval(() => {
  updateDateTime()
}, 15000)
</script>

<style lang="scss" scoped></style>
