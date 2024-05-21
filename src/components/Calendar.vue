<template>
  <div>
    <div class="border-slate-500 border">
      <div class="flex bg-slate-700">
        <div
          v-for="weekDay in month.weekdays"
          class="w-1/6 justify-center flex p-2">
          {{ weekDay }}
        </div>
      </div>
      <div v-for="week in month.weeks">
        <!-- {{ week }} -->
        <div class="flex">
          <div
            v-for="day in week"
            class="w-1/6 flex justify-center p-2"
            :class="[
              {
                'not-current-month':
                  day.type === 'previous' || day.type === 'next',
              },
              { 'current-day': day.day === 20 },
            ]">
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createDateMatrix } from 'date-matrix'

const month = createDateMatrix(new Date(), { firstDay: 'sunday' })
console.log(month)
</script>

<style lang="scss" scoped>
.not-current-month {
  @apply text-slate-600;
}

.current-day {
  @apply bg-slate-900 rounded-full font-semibold;
}
</style>
