<template>
  <div>
    <div class="loader" v-if="isLoading">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div
      id="dragzone"
      class="area"
      :class="{ active: active, hasFiles: hasFiles }"
      draggable="true"
      @dragenter="dragenter"
      @dragleave="dragleave"
      @drop="drop"
      v-if="!isLoading"
    >
      <label class="label" for="fileElem">Drop your .HEIC files here </label>
      <input
        id="fileElem"
        class="input"
        type="file"
        multiple
        accept="image/*"
        @onchange="handleFiles"
      />
    </div>
    <ul class="list">
      <li v-for="(image, index) in images" :key="index">
        <div
          class="list-item"
          v-on:click="openLink(image.path)"
          v-if="image.path"
        >
          <div class="list-item-img" v-if="image.path">
            <img :src="image.src" alt="preview" />
          </div>
          <div class="list-item-text">
            <div class="list-item-title">
              {{ image.name }} converted to .PNG
            </div>
            <div class="list-item-subtitle">Open folder</div>
          </div>
          <div class="list-item-svg">
            <svg class="svg-item" viewBox="0 0 20 20">
              <use xlink:href="#svg-search-icon" />
            </svg>
          </div>
        </div>
        <div v-else class="list-item-preview">
          <div class="list-item-title">Converting {{ image.name }}</div>
          <svg viewBox="0 0 20 20" style="width: 18px">
            <use xlink:href="#svg-spinner" />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const expose: any = window;
const electron = expose.electron;

export default defineComponent({
  name: "DragZone",
  props: {
    format: {
      type: String
    }
  },
  data: () => {
    return {
      active: false,
      isLoading: false,
      hasFiles: false,
      images: [] as Items,
      indexItem: 0,
      isFired: false
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
      this.isLoading = true;
      event.preventDefault();
      event.stopPropagation();
      // Use DataTransferItemList interface to access the file(s)
      const files = event.dataTransfer.files;
      for (var i = 0; i < files.length; i++) {
        this.hasFiles = true;
        const file: MyFile = files[i];
        if (file.type === "image/heic") {
          this.convertFile(file.path, file.name);
        } else {
          // Do something here, like error
        }
      }
      return false;
    },
    convertFile: function (filePath: string, fileName: string) {
      const outputFormat = this.format;
      // Set a preview version
      this.images.push({
        src: "",
        name: fileName.substring(0, 10) + "...",
        path: ""
      });
      electron.send("convertToHeic", { filePath, fileName, outputFormat });
      // Only the first time. I guess it could be part of Vuejs init event
      if (!this.isFired) {
        electron.on(
          "fileConverted",
          (event: any, base64: string, newPath: string) => {
            this.isCompleted(base64, newPath);
          }
        );
        this.isFired = true;
      }
    },
    isCompleted: function (base64: string, fullPath: string) {
      this.images[this.indexItem].src = base64;
      this.images[this.indexItem].path = fullPath;
      this.isLoading = false;
      this.active = false;
      this.indexItem++;
    },
    openLink(path: string) {
      electron.send("openLink", path);
    }
  }
});
</script>

<style lang="scss" scoped>
// Area
.area {
  position: relative;
  border-radius: 50%;
  width: 280px;
  height: 280px;
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
    box-shadow: -8px -8px 10px 0 rgba(255, 255, 255, 0.5),
      8px 8px 10px 0 rgba(0, 39, 80, 0.16);
  }
  &.hasFiles {
    border-radius: 106px;
    max-height: 100px;
  }
}

// Input
.label {
  max-width: 80%;
  color: var(--brand-label);
  letter-spacing: -0.24px;
  font-size: 15px;
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

// List
.list {
  max-width: 350px;
  margin: 0 auto;
}
.list-item {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding-bottom: 25px;
  cursor: pointer;

  &-img {
    display: flex;
    max-height: 45px;
    max-width: 45px;
    img {
      width: 100%;
      height: auto;
    }
  }
  &-text {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &-title {
    font-size: 12px;
  }
  &-subtitle {
    font-size: 9px;
    text-decoration: underline;
    cursor: pointer;
  }
  &-svg {
    display: flex;
    align-items: center;
    /* text-align: center; */
    background: --var(brand-bg);
    box-shadow: -8px -8px 10px 0 rgb(255 255 255 / 50%),
      8px 8px 10px 0 rgb(0 39 80 / 16%);
    border-radius: 50px;
    width: 30px;
    height: 25px;
    align-self: center;
    svg {
      margin: 0 auto;
    }
  }
  &-preview {
    display: flex;
    justify-content: space-between;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff !important;
    background: var(--brand-bg);
    padding: 15px 10px;
    border-radius: 10px;
    border: 0.0625rem solid #f3f3f3;
    margin-bottom: 15px;
  }
}

// Loader
.loader {
  margin: 30px auto;
  height: 60px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,
.right {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  animation: pulse 1.4s linear infinite;
}
.right {
  animation-delay: 0.7s;
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(0);
    opacity: 0.1;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
