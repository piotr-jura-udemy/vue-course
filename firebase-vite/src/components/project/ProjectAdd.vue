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
      class="block w-full rounded-md shadow-sm text-lg p-4"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { addProject } from "@/firebase/project"
import { setActiveProjectId } from "@/firebase/user"

const showMenu = ref(false)
const projectName = ref("")
const project = ref(null)

watch(showMenu, () => setTimeout(() => project?.value?.focus(), 100))

const projectAdded = async () => {
  const id = await addProject(projectName.value)
  console.log(id)
  await setActiveProjectId(id)
  projectName.value = ""
  showMenu.value = false
}
</script>