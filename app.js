const app = Vue.createApp({
  data() {
    return {}
  },
  methods: {},
  computed: {}
});

app.component('hello-world-item', {
  template: `<div>Hello World!</div>`
});

app.mount('#app');