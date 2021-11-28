<template>
  <div class="p-4 border-t border-gray-100 flex">
    <div v-if="!showMenu">
      <BaseTextButton @click="toggleMenu" class="mr-2" color="indigo">Move</BaseTextButton>
      <BaseTextButton color="red">Delete</BaseTextButton>
    </div>

    <TodoListItemMenuMove v-else @closed="toggleMenu" />
  </div>
</template>

<script>
import BaseTextButton from "./../base/BaseTextButton.vue";
import TodoListItemMenuMove from "./TodoListItemMenuMove.vue";

export default {
  components: {
    BaseTextButton,
    TodoListItemMenuMove,
  },
  data: function () {
    return { showMenu: false };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
};
</script>