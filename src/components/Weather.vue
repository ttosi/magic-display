<template>
  <div v-if="weather.result" class="justify-center">
    <div class="flex items-center justify-center mb-3 gap-4">
      <div :class="`bg-${weather.result.currently.icon}-128`"></div>
      <div class="text-7xl">
        {{ Math.round(weather.result.currently.temperature) }}&deg;
      </div>
    </div>
    <div class="flex items-center justify-between text-3xl">
      <div class="flex items-center gap-1">
        <div class="text-red-500"><mdicon name="thermometer-high" /></div>
        <div>
          {{ Math.round(weather.result.daily.data[0].temperatureHigh) }}&deg;
        </div>
        <div class="text-blue-300">
          <mdicon name="thermometer-low" />
        </div>
        <div>
          {{ Math.round(weather.result.daily.data[0].temperatureLow) }}&deg;
        </div>
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="umbrella" class="text-blue-700" />
        {{ Math.floor(weather.result.currently.precipProbability * 100) }}%
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="weather-windy" class="text-slate-500" />
        {{ Math.round(weather.result.currently.windSpeed) }}
        mph
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="water-percent" class="text-blue-700" />
        {{ Math.floor(weather.result.currently.humidity * 100) }}%
      </div>
      <div class="flex items-center gap-1">
        <div><mdicon name="weather-sunset-up" class="text-yellow-300" /></div>
        <div>
          {{
            dayjs.unix(weather.result.daily.data[0].sunriseTime).format('h:mm')
          }}
        </div>
        <div class="ml-3">
          <mdicon name="weather-sunset-down" class="text-yellow-300" />
        </div>
        <div>
          {{
            dayjs.unix(weather.result.daily.data[0].sunsetTime).format('h:mm')
          }}
        </div>
      </div>
    </div>
  </div>
  <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
  <div class="flex items-center justify-center text-xl gap-3">
    <div v-for="day in forecast" :id="day.time" class="text-center">
      <div class="w-36">
        <div>{{ dayjs.unix(day.time).format('dddd') }}</div>
        <div class="justify-center flex">
          <div :class="`bg-${day.icon}-64`">&nbsp;</div>
        </div>
      </div>
      <div>
        <div class="flex justify-center items-center gap-1">
          <div>{{ Math.round(day.temperatureHigh) }}&deg;</div>
          <div>/</div>
          <div>{{ Math.round(day.temperatureLow) }}&deg;</div>
        </div>
        <div class="flex justify-center items-center gap-0">
          <div><mdicon name="umbrella" size="18" /></div>
          <div>{{ Math.floor(day.precipProbability * 100) }}%</div>
          <div class="ml-2"><mdicon name="weather-windy" size="18" /></div>
          <div>{{ Math.round(day.windSpeed) }}mph</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import dayjs from 'dayjs'

const apiKey = import.meta.env.VITE_PIRATE_WEATHER_API_KEY
const weather = reactive({ result: undefined })

const updateWeather = async () => {
  const response = await fetch(
    `https://api.pirateweather.net/forecast/${apiKey}/32.2540,-110.9742`
  )

  weather.result = await response.json()
}

// skip today's forecast and display next 5 days
const forecast = computed(() => {
  if (weather.result) {
    const days = []
    for (let d = 1; d < 6; d++) {
      days.push(weather.result.daily.data[d])
    }
    return days
  }
})

updateWeather()
const updateWeatherInterval = setInterval(() => {
  updateWeather()
}, 60000 * 5)
</script>

<style lang="scss" scoped></style>
