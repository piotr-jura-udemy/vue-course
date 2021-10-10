<template>
  <div>
    <div><RouterLink to="/">Home page</RouterLink></div>
    <div><RouterLink to="/about">About page</RouterLink></div>
  </div>
  <RouterView />
</template>

<script>
export default {
  name: "App",
};
</script>

