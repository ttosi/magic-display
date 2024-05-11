<template>
  <div v-if="weather.result" class="justify-center">
    <div class="flex items-center justify-center">
      <div class="bg-sunny-128"></div>
      <div class="text-7xl">
        {{ Math.round(weather.result.currently.temperature) }}&deg;
      </div>
    </div>
    <div class="flex items-center justify-between text-2xl">
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
        {{ Math.round(weather.result.currently.precipProbability * 100) }}%
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="weather-windy" class="text-slate-500" />
        {{ Math.round(weather.result.currently.windSpeed) }}
        mph
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="water-percent" class="text-blue-700" />
        {{ Math.round(weather.result.currently.humidity) }}%
      </div>
      <div class="flex items-center gap-1">
        <div><mdicon name="weather-sunset-up" class="text-yellow-300" /></div>
        <div>
          {{
            dayjs
              .unix(weather.result.daily.data[0].sunriseTime)
              .format('h:mm A')
          }}
        </div>
        <div class="ml-3">
          <mdicon name="weather-sunset-down" class="text-yellow-300" />
        </div>
        <div>
          {{
            dayjs.unix(weather.result.daily.data[0].sunsetTime).format('h:mm A')
          }}
        </div>
      </div>
    </div>
  </div>
  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
  <div class="flex items-center justify-center text-slate-400">
    <div v-for="day in forecast" :id="day.time" class="text-center">
      <div class="w-36">
        <div>{{ dayjs.unix(day.time).format('dddd') }}</div>
        <div class="justify-center flex">
          <div class="bg-clear-64">&nbsp;</div>
        </div>
      </div>
      <div>
        <div class="flex justify-center items-center gap-1">
          <div><mdicon name="umbrella" size="18" /></div>
          <div>{{ day.precipProbability }}%</div>
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
  // https://api.pirateweather.net/forecast/[apikey]/32.1145,-110.9392
  const response = await fetch(
    `https://api.pirateweather.net/forecast/${apiKey}/32.1145,-110.9392`
  )

  weather.result = await response.json()
  console.log('===>', weather.result)
}

// skip today's forecast and only bring in 5 days
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
}, 60000 * 60)
</script>

<style lang="scss" scoped></style>
