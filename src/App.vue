<template>
  <div>
    <p>
      <Example />
    </p>
    <p class="text">{{ data }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Example from "./components/Example.vue"

export default Vue.extend({
  components: {
    Example,
  },
  data() {
    return {
      data: "Hello from Vuejs :)",
    }
  },
})
</script>

<style lang="scss" scoped>
.text {
  color: green;
}
</style>
