<!-- src/views/HomeView.vue -->
<template>
  <HelloWorld name="Bob" @geklickt="onGeklickt" />
  <p>{{ meldung }}</p>
</template>

<script setup>
import HelloWorld from "../components/HelloWorld.vue";
import { ref } from "vue";

const meldung = ref("");

function onGeklickt() {
  meldung.value = "Button geklickt";
}
</script>