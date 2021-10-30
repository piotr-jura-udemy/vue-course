<template>
  <div v-if="article">
    <h3>{{ article.title }}</h3>
    <div>
      <RouterLink :to="{ name: 'articles.comments', params: { id } }"
        >See Comments</RouterLink
      >
      |
      <RouterLink :to="{ name: 'articles.author' }">About Author</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
import { articles } from "./../data";

export default {
  props: ["id"],
  data() {
    return {
      article: null,
    };
  },
  watch: {
    id() {
      this.loadArticle();
    },
  },
  created() {
    this.loadArticle();
  },
  methods: {
    loadArticle() {
      if (undefined === articles[this.id]) {
        return this.$router.push({
          name: "not-found",
          params: {
            url: "wrong",
          },
        });
      }
      this.article = articles[this.id];
    },
  },
};
</script>