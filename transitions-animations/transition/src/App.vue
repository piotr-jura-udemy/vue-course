<script setup>
import { ref } from "vue"
import Heart from "./Heart.vue"
import Fade from "./Fade.vue"
import FadeTransition from "./FadeTransition.vue"
import TransitionBetween from "./TransitionBetween.vue"

const showMe = ref(true)
</script>

<template>
  <Heart />
  <Fade />

  <FadeTransition>
    <div v-if="showMe">
      <p>I'm visible</p>
      <button @click="showMe = false">Hide me!</button>
    </div>
  </FadeTransition>
  <TransitionBetween />
</template>

<style>
body {
  font-size: 2em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 100px;
}
</style>