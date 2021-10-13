<template>
  <div>The id parameter vue is {{ $route.params.id }}</div>
  <div v-if="article">{{ article.title }}</div>
</template>

<script>
const articles = {
  1: { title: "Title for article 1" },
  2: { title: "Title for article 2" },
  3: { title: "Title for article 3" },
};
export default {
  data() {
    return {
      article: null,
    };
  },
  watch: {
    "$route.params": {
      handler: function (newVal) {
        this.article = articles[newVal.id];
      },
      immediate: true,
    },
  },
};
</script>