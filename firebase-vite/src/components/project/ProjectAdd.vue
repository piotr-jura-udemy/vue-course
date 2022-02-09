<template>
  <div>
    <button
      class="w-full rounded-md mb-2 p-2 text-left hover:bg-gray-200"
      @click="showMenu = !showMenu"
    >
      <span v-if="!showMenu">➕ Add New</span>
      <span v-else>➖ Cancel</span>
    </button>
  </div>
  <div v-if="showMenu" class="mb-2">
    <input
      ref="project"
      type="text"
      placeholder="Enter project and hit enter"
      @keyup.enter="projectAdded"
      @keyup.esc="showMenu = false"
      v-model="projectName"
      class="block w-full rounded-md shadow-sm text-lg p-2"
    />
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue"
import { addProject } from "@/firebase/project"
import { setActiveProjectId } from "@/firebase/user"

const showMenu = ref(false)
const projectName = ref("")
const project = ref(null)

onUpdated(() => project?.value?.focus())

const projectAdded = async () => {
  showMenu.value = false
  const id = await addProject(projectName.value)
  projectName.value = ""
  await setActiveProjectId(id)
}
</script>