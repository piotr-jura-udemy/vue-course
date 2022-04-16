<script setup>
import { ref } from "vue"
const animate = ref(false)
const dim = ref(false)
</script>

<template>
  <section :class="{ dim }" class="transitioned">
    <p>Click on the card to animate</p>
    <button class="heart" @click="animate = !animate"
      :class="{ 'animate-pulse': animate }">🂱</button>
    <div>
      <button @click="dim = !dim" class="dim-button">💡 Dim
        the
        lights!</button>
    </div>
  </section>
</template>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.6);
    color: tomato;
  }

  30% {
    transform: scale(1.3);
  }

  60% {
    transform: scale(1.5);
  }

  70% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    color: red;
  }
}

.animate-pulse {
  animation-name: pulse;
  animation-duration: 2s;
  animation-iteration-count: 1;
  /* default is 1 */
  animation-fill-mode: forwards;
}

.heart {
  font-size: 4em;
  display: inline-block;
  position: relative;
  color: gray;
  margin-left: 40px;
}

.dim {
  opacity: 0.3;
}

.transitioned {
  transition: opacity 2s ease;
}

.dim-button {
  border: 1px gray dotted;
  border-radius: 6px;
  padding: 8px;
}

button {
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
</style>
