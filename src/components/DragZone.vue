<template>
  <div>
    <div
      id="dragzone"
      class="area"
      :class="{ active: active }"
      draggable="true"
      @dragenter="dragenter"
      @dragleave="dragleave"
      @drop="drop"
    >
      <label class="label" for="fileElem"
        >Choose files or drag and drop your HEIC files here
      </label>
      <input
        id="fileElem"
        class="input"
        type="file"
        multiple
        accept="image/*"
        @onchange="handleFiles"
      />
    </div>
    <ul>
      <li v-for="(src, index) in images" :key="index">
        <img :id="index" :src="src" alt="preview" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DragZone",
  data: () => {
    return {
      active: false,
      images: []
    };
  },
  methods: {
    dragenter: function (event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.active = true;
      return false;
    },
    dragleave: function (event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      this.active = !this.active;
    },
    drop: function (event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      console.log("File(s) dropped");
      const files = event.dataTransfer.items;
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < files.length; i++) {
        // If dropped items aren't heic, reject them
        if (files[i].type === "image/png") {
          const file = files[i].getAsFile();
          this.convertToHeic(file);
          // const preview = URL.createObjectURL(file);
          // this.images.push(preview);
        } else {
          // Do something here
        }
      }
    },
    convertToHeic: (file: any) => {
      (async () => {
        // const inputBuffer = file;
        // const outputBuffer = await convert({
        //   buffer: inputBuffer, // the HEIC file buffer
        //   format: "JPEG", // output format
        //   quality: 1 // the jpeg compression quality, between 0 and 1
        // });
        // console.log(outputBuffer);
        debugger;
      })();
    },
    handleFiles: () => {}
  }
});
</script>

<style lang="scss" scoped>
.area {
  position: relative;
  width: 90vw;
  height: 90vw;
  border-radius: 50%;
  max-width: 300px;
  max-height: 300px;
  margin: 2rem auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset -8px -8px 10px 0 rgba(255, 255, 255, 0.5),
    inset 8px 8px 10px 0 rgba(13, 39, 80, 0.16);
  transition: box-shadow 0.3s ease-in;
  &.active,
  &:hover {
    box-shadow: -8px -8px 10px 0 rgba(255, 255, 255, 0.5), 8px 8px 10px 0 rgba(0, 39, 80, 0.16);
  }
}

.label {
  max-width: 80%;
  color: var(--brand-label);
  letter-spacing: -0.24px;
  text-shadow: 2px 2px 2px rgb(0 0 0 / 10%);
}

.input {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  &:focus {
    outline: none;
  }
}
</style>
