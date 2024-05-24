<template>
  <div class="w-full mr-5">
    <div v-for="project in projects.data" class="mb-2">
      <div>
        <div
          class="w-full p-1 pl-2 border border-slate-400 font-semibold mb-2 text-xl">
          {{ project.name.toUpperCase().replace('INBOX', 'UNCATEGORIZED') }}
        </div>
        <div
          v-if="project.tasks"
          v-for="task in project.tasks"
          class="bg-black ml-3 p-1 flex text-xl font-normal">
          <div class="truncate">
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
const projects = reactive({ data: undefined })

const updateTodos = async () => {
  projects.data = await await todoistApi.getProjects()
  const tasks = await todoistApi.getTasks()

  tasks.forEach((t) => {
    const project = projects.data.find((p) => p.id === t.projectId)
    if (!project.hasOwnProperty('tasks')) {
      project.tasks = []
    }
    project.tasks.push(t)
  })
}

updateTodos()
const updateTodosInterval = setInterval(() => {
  updateTodos()
}, 60000 * 30)
</script>

<style lang="scss" scoped></style>
