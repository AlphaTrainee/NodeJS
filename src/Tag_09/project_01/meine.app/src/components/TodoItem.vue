<!-- kindkomponente -->
<template>
  <li>
    {{ todo.text }}
    <button @click="$emit('toggle', todo.id)">
      {{ todo.done ? "ja" : "offen" }}
    </button>
  </li>
</template>

<script setup>
defineProps(["todo"]);
defineEmits(["toggle"]);
</script>
