<template>
  <h1>Hello World, {{ name }}</h1>
  <button @click="$emit('geklickt')">Klick mich</button>


</template>

<script setup>
defineProps(['name'])
defineEmits(['geklickt'])
</script>