<template>
  <div v-if="weather.result" class="justify-center">
    <div class="flex items-center justify-center">
      <div class="bg-sunny-128"></div>
      <div class="text-7xl">
        {{ Math.round(weather.result.main.temp) }}&deg;
      </div>
    </div>
    <div class="flex items-center justify-between text-2xl">
      <div class="flex items-center gap-1">
        <div class="text-red-500"><mdicon name="thermometer-high" /></div>
        <div>{{ Math.round(weather.result.main.temp_max) }}&deg;</div>
        <div class="text-blue-300">
          <mdicon name="thermometer-low" />
        </div>
        <div>{{ Math.round(weather.result.main.temp_min) }}&deg;</div>
      </div>
      <!-- <div class="flex"><mdicon name="umbrella" class="mt-1 mr-2" />0%</div> -->
      <div class="flex items-center gap-1">
        <mdicon name="weather-windy" class="text-slate-500" />{{
          Math.round(weather.result.wind.speed)
        }}
        mph
      </div>
      <div class="flex items-center gap-1">
        <mdicon name="water-percent" class="text-blue-700" />{{
          Math.round(weather.result.main.humidity)
        }}%
      </div>
      <div class="flex items-center gap-1">
        <div><mdicon name="weather-sunset-up" class="text-yellow-300" /></div>
        <div>6:53 AM</div>
        <div class="ml-3">
          <mdicon name="weather-sunset-down" class="text-yellow-300" />
        </div>
        <div>7:13 PM</div>
      </div>
    </div>
  </div>
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
  <div v-if="weather.result" class="justify-center items-center flex gap-6">
    <div v-for="day in forecast.result" :id="day.dt">
      {{ dayjs.unix(day.dt).format("dddd") }}
      <div class="bg-clear-64"></div>
      <div class="flex justify-center gap-1">
        <div>{{ Math.round(day.main.temp_min) }}&deg;</div>
        <div>/</div>
        <div>{{ Math.round(day.main.temp_max) }}&deg;</div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import dayjs from "dayjs";

// const apiKey = "ddbf85f45a7e0395dadd41d36ce35687";
const apiKey = "aybNUYnBNDLYdNAt1KbYGSDmb8IXm2ly";
const weather = reactive({ result: undefined });
const forecast = reactive({ result: [] });

const updateWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=5318313&units=imperial&appid=${apiKey}`
  );

  weather.result = await response.json();
  console.log("===>", weather.result);
};

const updateForeccast = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=5318313&units=imperial&appid=${apiKey}`
  );

  const data = await response.json();
  for (let i = 3; i < data.list.length; i += 8) {
    forecast.result.push(data.list[i]);
  }

  console.log(forecast.result);
};

updateWeather();
updateForeccast();
</script>

<style lang="scss" scoped></style>
