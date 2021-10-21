<template>
  <div>The id parameter vue is {{ $route.params.id }}</div>
  <div v-if="article">{{ article.title }}</div>
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
  created() {
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
};
</script>