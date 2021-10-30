<template>
  <div v-for="article in articles" :key="article.id">
    <RouterLink
      :to="{ name: 'articles.comments', params: { id: article.id } }"
      >{{ article.title }}</RouterLink
    >
  </div>
</template>

<script>
export default {
  props: {
    articles: Object,
  },
};
</script>