let nextTaskId = 100;

const app = Vue.createApp({
  data() {
    return {
      onlyPending: false,
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
  computed: {
    displayedTasks() {
      return [...this.tasks].sort(
        (a, b) => Number(b.priority) - Number(a.priority)
      )
        .filter(
          task => !this.onlyPending || !task.done
        );
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
  }
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
    done: Boolean,
    priority: Boolean
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
  emits: ['update:done', 'update:priority'],
  template: `<div 
    class="bg-white shadow-sm rounded-md text-gray-700 text-xs md:text-sm p-4"
    :class="{'opacity-25 line-through': task.done}">
        <div>{{task.description}}</div>
        <div class="py-4 bg-white">
        <base-checkbox class="mb-2"
          @update:model-value="$emit('update:done', $event)"
          :model-value="done">Done</base-checkbox>
        <base-checkbox
          @update:model-value="$emit('update:priority', $event)"
          :model-value="priority">Prioritized</base-checkbox>
      </div>
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
  mounted() {
    this.$refs.input.focus();
  },
  template: `<input type="text" 
    ref="input"
    placeholder="Enter task and hit enter"
    @keyup.enter="add"
    v-model="task"
    class="block w-full rounded-md shadow-sm text-lg p-4" />`
});

app.component('base-checkbox', {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onChange() {
      this.$emit(
        'update:modelValue', !this.modelValue
      );
    }
  },
  template: `<div class="flex items-center">
    <input type="checkbox" 
      class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
      :checked="modelValue"
      @change="onChange"/>
    <label><slot>Checkbox</slot></label>
  </div>`
});

app.mount('#app');