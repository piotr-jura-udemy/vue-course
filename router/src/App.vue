<template>
  <div>
    <div><RouterLink :to="{ name: 'home' }">Home page</RouterLink></div>
    <div><RouterLink :to="{ name: 'about' }">About page</RouterLink></div>
    <div>
      <RouterLink :to="{ name: 'articles', params: { id: 1 } }"
        >Article 1</RouterLink
      >
    </div>
  </div>
  <RouterView />
</template>

<script>
export default {
  name: "App",
};
</script>

