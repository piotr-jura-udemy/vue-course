// Things covered in code:
// - Registering component (global)
// - Refs (using ref to reference DOM)
// - Emitting custom events
// - Emitting value with an event
// - Handling custom component events
// - Props (passing data to component)
// - Props typing
// - Defining emitted events
// - Component reusability (using mutliple checkboxes)
// Needs explanation:
// - How to reference component by name?
// - Using v-model on custom components
// - Slots
// - Dynamic components
// - DOM template caveats
// - Element placement restrictions
// - Case sensitivity?

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
      }],
      onlyPending: false
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
    },
    taskToggled(task) {
      console.log(`Toggling task ${task.id}`);
      const foundTask = this.tasks
        .find(t => t.id === task.id);

      if (foundTask) {
        foundTask.done = task.done;
      }
    },
    taskPrioritized(task) {
      console.log(`Prioritizing task ${task.id}`);
      this.tasks.find(t => t.id === task.id)
        .priority = task.priority;
    }
  },
  computed: {
    sortedTasks() {
      return [...this.tasks].sort(
        (a, b) => Number(b.priority) - Number(a.priority)
      ).filter(task => !this.onlyPending || !task.done);
    }
  }
});

app.component('add-task', {
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
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
  template: `
    <input type="text" 
      class="block w-full rounded-md shadow-sm text-lg p-4" 
      placeholder="Enter task and hit enter" 
      @keyup.enter="add" 
      v-model="task"
      ref="input" />`
});

app.component('todo-item', {
  props: {
    task: Object,
    done: Boolean,
    priority: Boolean,
  },
  emits: ['update:done', 'update:priority'],
  template: `
    <div 
      class="bg-white shadow-sm rounded-md text-gray-700 text-xs md:text-sm" 
      :class="{'opacity-25 line-through': task.done}">
    <div class="p-4 border-b border-gray-100">
      {{task.description}}
    </div>
    <div class="p-4 bg-white">
      <base-checkbox @update:model-value="$emit('update:done', $event)"
        :model-value="done" label="Done" class="mb-1"></base-checkbox>
      <base-checkbox @update:model-value="$emit('update:priority', $event)"
        :model-value="priority" label="Prioritized"></base-checkbox>
    </div>
  </div>`
});

app.component('base-checkbox', {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  template: `
    <div class="flex items-center">
      <input type="checkbox" 
        @change="onChange" :checked="modelValue"
        class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"/>
      <label>{{label}}</label>
    </div>`,
  methods: {
    onChange() {
      this.$emit('update:modelValue', !this.modelValue);
    }
  }
});

app.mount('#app');