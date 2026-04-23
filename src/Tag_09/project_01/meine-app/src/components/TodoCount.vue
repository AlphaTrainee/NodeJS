<!-- > Erstellt eine neue Komponente `TodoCount.vue`:
> - Bekommt `openCount` und `doneCount` als Props
> - Zeigt beide Werte an
> - Bindet sie in `App.vue` ein -->

<template>
    <p>Offen: {{ openCount }} Done: {{ doneCount }}</p>
</template>

<script setup>
defineProps(['openCount', 'doneCount'])
</script>