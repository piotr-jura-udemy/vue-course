<template>
  <input
    type="text"
    ref="input"
    placeholder="Enter task and hit enter"
    @keyup.enter="add"
    v-model="task"
    class="block w-full rounded-md shadow-sm text-lg p-4"
  />
</template>

<script>
export default {
  emits: ["added"],
  data() {
    return {
      task: "",
    };
  },
  methods: {
    add() {
      this.$emit("added", this.task);
      this.task = "";
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>