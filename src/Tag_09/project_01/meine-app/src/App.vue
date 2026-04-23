<template>
  <HelloWorld name="Bob" @geklickt="onGeklickt" />
  <p>{{ meldung }}</p>

  <input v-model="newTodo" placeholder="Neues Todo" />
  <button @click="addTodo">Hinzufügen</button>
  <TodoCount :openCount="openCount" :doneCount="doneCount" />

  <ul>
    <TodoItem
      v-for="item in todo"
      :key="item.id"
      :todo="item"
      @toggle="toggleTodo"
    />
  </ul>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TodoItem from "./components/TodoItem.vue";
import TodoCount from "./components/TodoCount.vue";
import { ref, reactive, computed } from "vue";

const meldung = ref("");

function onGeklickt() {
  meldung.value = "Button geklickt";
}

const newTodo = ref("");
const todo = reactive([]);

let nextId = 1;

const openCount = computed(() => todo.filter((t) => !t.done).length);
const doneCount = computed(() => {
  return todo.filter((todo) => todo.done).length;
});

function addTodo() {
  if (newTodo.value.trim() === "") return;
  todo.push({ id: nextId++, text: newTodo.value, done: false });
  newTodo.value = "";
}

function toggleTodo(id) {
  const item = todo.find((t) => t.id === id);
  if (item) item.done = !item.done;
}
</script>
