<script setup>
import { ref } from 'vue'
const button = ref('next')
</script>

<template>
  <div>
    <button>I'm here too!</button>
    <Transition mode="out-in">
      <button v-if="button == 'next'"
        @click="button = 'cancel'">Next</button>
      <button v-else-if="button == 'cancel'"
        @click="button = 'done'">Cancel</button>
      <button v-else-if="button == 'done'"
        @click="button = 'next'">Done</button>
    </Transition>
  </div>
</template>

<style scoped>
/* 
Being absolute makes the button visually take place of the button
that disappears. Otherwise, at the beginning, they would be placed
next to another
*/
button {
  /* position: absolute; */
}

/*
The alternative to the above, is to set the Transition mode
to out-in. It would first animate the 1st element disappearance,
only then animate then 2nd element appearing.
*/

.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(60px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
</style>