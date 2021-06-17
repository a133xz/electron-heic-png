<template>
  <div id="app">
    <TypeSelector @update-format="updateFormat"></TypeSelector>
    <DragZone :format="format"></DragZone>
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
  },
  data: () => ({
    format: ""
  }),
  methods: {
    updateFormat(format: string) {
      this.format = format;
    }
  }
});
</script>
