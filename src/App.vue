<template>
  <div id="app">
    <TypeSelector></TypeSelector>
    <DragZone></DragZone>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TypeSelector from "./components/TypeSelector.vue";
import DragZone from "./components/DragZone.vue";

export default defineComponent({
  components: {
    TypeSelector,
    DragZone
  }
});
</script>
