<template>
  <div id="app">
    <TypeSelector @update-format="updateFormat"></TypeSelector>
    <DragZone :format="format"></DragZone>
    <Icons />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TypeSelector from "./components/TypeSelector.vue";
import DragZone from "./components/DragZone.vue";
import Icons from "./components/Icons.vue";

export default defineComponent({
  components: {
    TypeSelector,
    DragZone,
    Icons
  },
  data: () => ({
    format: "PNG"
  }),
  methods: {
    updateFormat(format: string) {
      this.format = format;
    }
  }
});
</script>
