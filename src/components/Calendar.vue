<template>
  <div>
    <!-- <div class="border-slate-500 border font-normal">
      <div class="flex bg-slate-700">
        <div
          v-for="weekDay in month.weekdays"
          class="w-1/6 justify-center flex p-2">
          {{ weekDay }}
        </div>
      </div>
      <div v-for="week in month.weeks">
        <div class="flex">
          <div
            v-for="day in week"
            class="w-1/6 flex justify-center p-2"
            :class="[
              {
                'not-current-month':
                  day.type === 'previous' || day.type === 'next',
              },
              { 'current-day': day.day.toString() === dayjs().format('DD') },
            ]">
            {{ day.day }}
          </div>
        </div>
      </div>
    </div> -->
    <div>
      <div v-for="(events, day) in events.data" class="mb-2">
        <div
          class="w-full p-1 pl-2 font-semibold text-xl border border-slate-400 mb-2">
          {{ dayjs(day).format('dddd, MMMM DD').toUpperCase() }}
        </div>
        <!-- <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" /> -->

        <div v-for="event in events" class="bg-black ml-3 p-0.5 flex">
          <div class="mr-3 w-20 font-normal text-xl">
            {{ dayjs(event.start.dateTime).format('h a') }}
          </div>
          <div class="truncate font-normal text-xl">
            {{ event.summary }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createDateMatrix } from 'date-matrix'
import dayjs from 'dayjs'
import { reactive } from 'vue'

const month = createDateMatrix(new Date(), { firstDay: 'sunday' })
const events = reactive({ data: undefined })

const updateEvents = async () => {
  const response = await fetch('http://127.0.0.1:3000/')
  const data = await response.json()

  const days = {}
  data.forEach((e) => {
    const date = dayjs(e.start.dateTime).format('MM-DD-YYYY')
    if (!days.hasOwnProperty(date)) {
      days[date] = []
    }
    days[date].push(e)
  })

  events.data = days
}

updateEvents()
const updateEventsInterval = setInterval(() => {
  updateEvents()
}, 60000 * 15)
</script>

<style lang="scss" scoped>
.not-current-month {
  @apply text-slate-600;
}

.current-day {
  @apply bg-slate-900 rounded-full font-semibold;
}
</style>
