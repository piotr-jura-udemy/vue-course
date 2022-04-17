<script setup>
import { reactive } from 'vue'
import ListItem from './components/ListItem.vue'
const items = reactive([
  {
    id: 1,
    name: 'Milk',
    price: 5
  },
  {
    id: 2,
    name: 'Honey',
    price: 7
  }
])

const randomNr = () => Math.floor(Math.random() * items.length)

setInterval(() => {
  const random = randomNr()
  items.splice(random, 0, {
    id: items.length + 1,
    name: `Item nr ${random}`,
    price: 4
  })
}, 2000)

setInterval(() => items.splice(randomNr(), 1), 3000)
</script>

<template>
  <TransitionGroup>
    <ListItem v-for="item in items" :item="item"
      :key="item.id" />
  </TransitionGroup>
</template>

<style>
body {
  font-size: 2em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 100px;
}

.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-leave-active {
  position: absolute;
}
</style>
