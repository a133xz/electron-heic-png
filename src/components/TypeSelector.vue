<template>
  <div class="radio-toolbar">
    <input
      id="png"
      type="radio"
      name="selector"
      value="PNG"
      checked
      v-model="picked"
    />
    <label class="text" for="png">.PNG</label>
    <input
      id="jpg"
      type="radio"
      name="selector"
      value="JPEG"
      v-model="picked"
    />
    <label class="text" for="jpg">.JPG</label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "TypeSelector",
  data() {
    return {
      picked: ""
    };
  },
  watch: {
    picked() {
      this.$emit("update-format", this.picked);
    }
  }
});
</script>

<style lang="scss" scoped>
// https://markheath.net/post/customize-radio-button-css
.radio-toolbar {
  box-shadow: -8px -8px 10px 0 rgba(255, 255, 255, 0.3),
    8px 8px 10px 0 rgba(0, 39, 80, 0.16);
  border-radius: 5px;
  display: flex;
  text-align: center;

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 4px;
    width: 100%;
    border: 2px solid transparent;
    text-align: center;
    &:hover {
      background-color: darken($color: #eaebf3, $amount: 1.5);
    }
  }

  input[type="radio"] {
    &:focus + label {
      //  border: 2px dashed #444;
    }

    &:checked + label {
      background-image: linear-gradient(
        to right,
        var(--brand-selector),
        var(--brand-selector)
      );
      background-position: bottom center;
      background-repeat: no-repeat;
      background-size: 80% 5px;
      transition: background-size 0.5s ease;
      border-bottom: 0px;
    }
  }
}
</style>
