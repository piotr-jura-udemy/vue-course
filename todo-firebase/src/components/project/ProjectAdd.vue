<template>
  <div>
    <button
      class="w-full rounded-md mb-2 p-2 text-left hover:bg-gray-200"
      @click="showMenu = !showMenu"
    >
      <span v-if="!showMenu">Add New</span>
      <span v-else>Cancel</span>
    </button>
  </div>
  <div class="mb-2" v-if="showMenu">
    <input
      ref="project"
      type="text"
      placeholder="Enter project and hit enter"
      class="block w-full rounded-md shadow-sm text-lg p-2"
      v-model="projectName"
      @keyup.enter="projectAdded"
      @keyup.esc="showMenu = false"
    />
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue"
import { addProject } from "./../../firebase/project"
import { setActiveProjectId } from "./../../firebase/user"
const showMenu = ref(false)
const project = ref(null)
onUpdated(() => project?.value?.focus())
const projectName = ref("")
const projectAdded = async () => {
  showMenu.value = false
  const id = (await addProject(projectName.value)).id
  projectName.value = ""
  setActiveProjectId(id)
}
</script>