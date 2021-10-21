<template>
  <h3>Home</h3>
  <ArticleList :articles="articles" />
</template>

<script>
import ArticleList from "./../components/ArticleList.vue";
import { articles } from "./../data";
export default {
  components: { ArticleList },
  computed: {
    articles() {
      return articles;
    },
  },
};
</script>