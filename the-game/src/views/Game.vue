<script setup>
import { useCounterStore } from './../stores/counter'
import { ref, computed } from 'vue'
import Counter from './../components/Counter.vue'
const store = useCounterStore()

const started = ref(false)
const timer = ref(5)
const gameDone = computed(
  () => timer.value === 0
)

const reset = () => store.$reset()
const runGame = () => setTimeout(gameTick, 1000)
const gameTick = () => {
  timer.value--

  if (gameDone.value) {
    started.value = false
    store.addScore()
  } else {
    runGame()
  }
}

const startGame = () => {
  timer.value = 5
  started.value = true
  runGame()
}
</script>

<template>
  <div v-if="started">
    <Counter />
  </div>
  <div v-else>
    <div>The game has not started yet! 🏁</div>
    <div style="margin-bottom: 100px">
      Current Best Score is {{ store.highScore }} 🥇
    </div>
    <div>
      <button @click="reset">Rest the Game!</button>
    </div>
    <div>
      <button @click="startGame">Start</button>
    </div>
  </div>
</template>