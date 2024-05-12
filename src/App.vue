<script setup>
import DateTime from './components/DateTime.vue'
import Weather from './components/Weather.vue'
</script>

<template>
  <main class="w-5/12">
    <DateTime />
    <div class="mt-20">
      <Weather />
    </div>
  </main>
</template>

<style scoped></style>
