<template>
  <div class="p-4 border-t border-gray-100 flex">
    <div v-if="!showMenu">
      <BaseTextButton @click="toggleMenu" class="mr-2" color="indigo">Move</BaseTextButton>
      <BaseTextButton color="red" @click="taskRemoved">Delete</BaseTextButton>
    </div>

    <TodoListItemMenuMove v-else @closed="toggleMenu" />
  </div>
</template>

<script>
import BaseTextButton from "./../base/BaseTextButton.vue";
import TodoListItemMenuMove from "./TodoListItemMenuMove.vue";
import { REMOVE_TASK } from "./../../store/mutation-types";
import { mapMutations } from "vuex";

export default {
  components: {
    BaseTextButton,
    TodoListItemMenuMove,
  },
  inject: ["task", "projectId"],
  data: function () {
    return { showMenu: false };
  },
  methods: {
    ...mapMutations([REMOVE_TASK]),
    taskRemoved() {
      this[REMOVE_TASK]({
        taskId: this.task.id,
        projectId: this.projectId
      });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
};
</script>