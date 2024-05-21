<template>
  <div class="w-full mr-5">
    <div v-for="project in projects.response" class="mb-5">
      <div>
        <div class="w-full p-2 bg-slate-900 font-semibold mb-2 text-2xl">
          {{ project.name.toUpperCase() }}
        </div>
        <div
          v-if="!project.tasks"
          class="text-slate-600 italic ml-3 p-1 text-xl">
          No Items
        </div>
        <div
          v-else
          v-for="task in project.tasks"
          class="bg-black ml-3 p-1 flex">
          <div class="truncate text-xl">
            {{ task.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TodoistApi } from '@doist/todoist-api-typescript'
import { reactive } from 'vue'

const todoistApi = new TodoistApi(import.meta.env.VITE_TODOIST_API_KEY)
const projects = reactive({ response: undefined })

const updateTodos = async () => {
  projects.response = await await todoistApi.getProjects()
  const tasks = await todoistApi.getTasks()

  tasks.forEach((t) => {
    const project = projects.response.find((p) => p.id === t.projectId)
    if (!project.hasOwnProperty('tasks')) {
      project.tasks = []
    }
    project.tasks.push(t)
  })
}

updateTodos()
const updateTodosInterval = setInterval(() => {
  updateTodos()
}, 60000 * 5)
</script>

<style lang="scss" scoped></style>
