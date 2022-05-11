<template>
  <h1>Welcome to The Game 🤡</h1>
  <div>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink> |
    <RouterLink :to="{
      name: 'hall-of-fame'
    }">Hall of Fame
    </RouterLink>
  </div>
  <RouterView />
</template>