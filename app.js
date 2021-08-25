let nextTaskId = 100;

const app = Vue.createApp({
  data() {
    return {
      tasks: [{
        id: 1,
        description: 'Buy food for the dog',
        priority: false,
        done: false
      },
      {
        id: 2,
        description: 'Pay the bills',
        priority: true,
        done: false
      },
      {
        id: 3,
        description: 'Buy some computer games',
        priority: false,
        done: false
      },
      {
        id: 4,
        description: 'Go to the gym',
        priority: false,
        done: false
      }]
    }
  },
  methods: {
    taskAdded(task) {
      this.tasks.push({
        id: nextTaskId++,
        description: task,
        done: false,
        priority: false
      });
    }
  },
  computed: {}
});

app.component('todo-list-item', {
  props: {
    task: {
      type: Object,
      required: true,
      // validator(value) {
      //   return "Okay" === value;
      // }
    },
    // id: {
    //   required: false,
    //   type: Number,
    //   validator(value) {
    //     return value >= 1 && value <= 100;
    //   },
    //   // default() {
    //   //   return [];
    //   // }
    // }
  },
  template: `<div 
    class="bg-white shadow-sm rounded-md text-gray-700 text-xs md:text-sm p-4">
      {{task.description}}
    </div>`
});

app.component('add-task-input', {
  emits: ['added'],
  data() {
    return {
      task: ''
    }
  },
  methods: {
    add() {
      this.$emit('added', this.task);
      this.task = '';
    }
  },
  template: `<input type="text" 
    placeholder="Enter task and hit enter"
    @keyup.enter="add"
    v-model="task"
    class="block w-full rounded-md shadow-sm text-lg p-4" />`
});

app.mount('#app');