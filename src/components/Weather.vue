<template>
  <div v-if="weather.data" class="justify-center">
    <div class="flex items-center justify-center mb-3 gap-1">
      <div>
        <!-- <img :src="weather.data.current.condition.icon" class="w-32 h-32" /> -->
        <!-- <div :class="`bg-${weather.result.currently.icon}-128`"></div> -->
        <div
          :class="weatherIcon(weather.data.current.condition.icon, 128)"></div>
      </div>
      <div class="text-7xl font-normal">
        {{ Math.round(weather.data.current.temp_f) }}&deg;
      </div>
    </div>
    <div class="flex items-center justify-center gap-6 text-3xl">
      <div class="flex items-center gap-1">
        <div class="text-red-500"><mdicon name="thermometer-high" /></div>
        <div>
          {{
            Math.round(weather.data.forecast.forecastday[0].day.maxtemp_f)
          }}&deg;
        </div>
        <div class="text-blue-300">
          <mdicon name="thermometer-low" />
        </div>
        <div>
          {{
            Math.round(weather.data.forecast.forecastday[0].day.mintemp_f)
          }}&deg;
        </div>
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="umbrella" class="text-blue-500" />
        {{ weather.data.forecast.forecastday[0].day.daily_chance_of_rain }}%
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="weather-windy" class="text-slate-300" />
        {{ Math.round(weather.data.current.wind_mph) }}
        mph
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="water-percent" class="text-blue-500" />
        {{ weather.data.current.humidity }}%
      </div>
      <!-- <div class="flex items-center gap-1">
        <div><mdicon name="weather-sunset-up" class="text-yellow-300" /></div>
        <div>
          {{
            weather.data.forecast.forecastday[0].astro.sunrise
              .replace(/^0+/, '')
              .replace('AM', '')
          }}
        </div>
        <div class="ml-3">
          <mdicon name="weather-sunset-down" class="text-yellow-300" />
        </div>
        <div>
          {{
            weather.data.forecast.forecastday[0].astro.sunset
              .replace(/^0+/, '')
              .replace('PM', '')
          }}
        </div>
      </div> -->
    </div>
  </div>
  <hr class="h-px my-6 mx-20 bg-gray-200 border-0 dark:bg-gray-700" />
  <div class="flex items-center justify-center text-xl gap-3">
    <div v-for="day in forecast" class="text-center">
      <div class="w-36">
        <div>{{ dayjs(day.date).format('dddd') }}</div>
        <div class="justify-center flex">
          <!-- <div><img :src="day.day.condition.icon" /></div> -->
          <div :class="weatherIcon(day.day.condition.icon, 64)"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-center items-center gap-1">
          <div>{{ Math.round(day.day.maxtemp_f) }}&deg;</div>
          <div>/</div>
          <div>{{ Math.round(day.day.mintemp_f) }}&deg;</div>
        </div>
        <div class="flex justify-center items-center gap-0">
          <div><mdicon name="umbrella" size="18" /></div>
          <div>{{ day.day.daily_chance_of_rain }}%</div>
          <div class="ml-2"><mdicon name="weather-windy" size="18" /></div>
          <div>{{ Math.round(day.day.maxwind_mph) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import dayjs from 'dayjs'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const weather = reactive({ data: undefined })

const updateWeather = async () => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=85716&days=6&alerts=yes&astro=yes`
  )
  weather.data = await response.json()
  console.log(weather.data)
}

// skip today's forecast and only display next 5 days
const forecast = computed(() => {
  if (weather.data) {
    // const days = []
    // for (let d = 1; d < 5; d++) {
    //   days.push(weather.data.forecast.forecastday[d])
    // }
    // console.log(weather.data.forecast.forecastday.slice(1))
    return weather.data.forecast.forecastday.slice(1)
  }
})

const weatherIcon = (iconUrl, size) => {
  // console.log(weather.data.current.condition)
  // console.log(iconUrl)
  const iconUrlParts = iconUrl.split('/')
  // console.log(iconUrlParts)
  return `${iconUrlParts[5]}-${iconUrlParts[6].replace('.png', '')}-${size}`
}

// const weatherIcons64 = (iconUrl) => {
//   const iconUrlParts = iconUrl.split('/')
//   return `${iconUrlParts[5]}-${iconUrlParts[6].replace('.png', '')}`
// }

updateWeather()
const updateWeatherInterval = setInterval(() => {
  updateWeather()
}, 60000 * 5)
</script>

<style lang="scss" scoped></style>
