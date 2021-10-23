<template>
  <h3>Articles matching tags: {{ matchingTags }}</h3>
  <ArticleList :articles="articles" />
</template>

<script>
import ArticleList from "../components/ArticleList.vue";
import { articles } from "../data";
export default {
  components: { ArticleList },
  props: { tags: Array },
  computed: {
    articles() {
      return Object.values(articles).filter(
        (article) =>
          article.tags.filter((tag) => this.tags.includes(tag)).length
      );
    },
    matchingTags() {
      return this.tags.join(", ");
    },
  },
};
</script>