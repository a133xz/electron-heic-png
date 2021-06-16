<template>
  <div class="radio-toolbar">
    <input id="png" type="radio" name="selector" value="png" checked />
    <label for="png">.PNG</label>

    <input id="jpg" type="radio" name="selector" value="jpg" />
    <label for="jpg">.JPG</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TypeSelector"
});
</script>

<style lang="scss" scoped>
// https://markheath.net/post/customize-radio-button-css
.radio-toolbar {
  box-shadow: -8px -8px 10px 0 rgba(255, 255, 255, 0.5), 8px 8px 10px 0 rgba(0, 39, 80, 0.16);
  border-radius: 5px;
  display: flex;
  text-align: center;

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label {
    padding: 10px 20px;
    border-radius: 4px;
    width: 100%;
    border: 2px solid transparent;
    color: var(--brand-label);
    letter-spacing: -0.24px;
    text-align: center;
    text-shadow: 2px 2px 2px rgb(0 0 0 / 10%);

    &:hover {
      background-color: darken($color: #eaebf3, $amount: 1.5);
    }
  }

  input[type="radio"] {
    &:focus + label {
      border: 2px dashed #444;
    }

    &:checked + label {
      background-image: linear-gradient(to right, var(--brand-selector), var(--brand-selector));
      background-position: bottom center;
      background-repeat: no-repeat;
      background-size: 80% 5px;
      transition: background-size 0.5s ease;
    }
  }
}
</style>
