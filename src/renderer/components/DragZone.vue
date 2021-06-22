<template>
  <div>
    <div class="progress-wrapper" v-if="isLoading">
      <span class="text"> Loading... </span>
      <div class="progress-bar">
        <span class="progress-bar-fill" :style="`width: ${progress}%`"></span>
      </div>
    </div>
    <div
      id="dragzone"
      class="area"
      :class="{ active: active, hasFiles: totalFiles > 0 }"
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
    <ul class="list" :class="{ opacity: isLoading }">
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
              <use xlink:href="#svg-arrow" />
            </svg>
          </div>
        </div>
        <div v-else class="list-item-preview">
          <div class="list-item-title" :class="{ isError: image.error }">
            <span v-if="!image.error">Converting... </span> {{ image.name }}
          </div>
          <div class="list-item-svg" v-if="!image.error">
            <svg viewBox="0 0 20 20">
              <use xlink:href="#svg-spinner" />
            </svg>
          </div>
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
      isFired: false,
      images: [] as Items,
      totalFiles: 0,
      indexItem: 0,
      progress: 0
    };
  },
  methods: {
    dragenter: function (event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.reset();
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
      this.totalFiles += files.length;
      for (var i = 0; i < files.length; i++) {
        const file: MyFile = files[i];
        if (file.type === "image/heic") {
          this.convertFile(file.path, file.name);
        } else {
          this.errorFile();
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
      this.active = false;
      this.indexItem++;
      this.progress = (this.indexItem * 100) / this.totalFiles;

      if (this.indexItem === this.totalFiles) {
        this.isLoading = false;
      }
    },
    reset: function () {
      this.progress = 0;
      this.active = true;
    },
    errorFile() {
      electron.send("formatError");
      this.totalFiles += -1;
      if (this.indexItem === this.totalFiles) {
        this.active = false;
        this.isLoading = false;
      }
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
  width: 240px;
  height: 240px;
  margin: 2rem auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset -8px -8px 10px 0 rgba(255, 255, 255, 0.5),
    inset 8px 8px 10px 0 rgba(13, 39, 80, 0.16);
  transition: box-shadow 0.3s ease-in;
  &.active {
    box-shadow: -8px -8px 10px 0 rgb(228 228 228 / 50%),
      8px 8px 10px 0 rgb(218 218 218 / 16%);
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
    box-shadow: -4px -4px 4px 0 rgb(255 255 255 / 30%),
      4px 4px 10px 0 rgb(0 39 80 / 16%);
    border-radius: 50px;
    width: 35px;
    height: 35px;
    align-self: center;
    &:hover {
      background-color: darken($color: #eaebf3, $amount: 1.5);
    }
    svg {
      margin: 0 auto;
      width: 18px;
    }
  }
  &-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
}

// Loader
.progress {
  &-wrapper {
    margin: 32px 0;
  }
  &-bar {
    margin-top: 2px;
    width: 100%;
    background: var(--brand-bg);
    box-shadow: inset -8px -8px 10px rgba(255, 255, 255, 0.5),
      inset 8px 8px 10px rgba(13, 39, 80, 0.16);
    border-radius: 3px;
    &-fill {
      display: block;
      height: 12px;
      border-radius: 3px;
      background-color: var(--brand-selector);
      transition: width 500ms ease-in-out;
    }
  }
}

.opacity {
  opacity: 0.1;
}

.isError {
  text-align: center;
  color: #e24640;
}
</style>
