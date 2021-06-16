<template>
  <div id="app">
    <TypeSelector></TypeSelector>
    <DragZone></DragZone>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TypeSelector from "./components/TypeSelector.vue";
import DragZone from "./components/DragZone.vue";

export default Vue.extend({
  components: {
    TypeSelector,
    DragZone
  }
});
</script>
