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
    <ul class="list">
      <li v-for="(image, index) in images" :key="index">
        <div class="list-item" v-on:click="openLink(image.path)">
          <div class="list-item-img">
            <img :src="image.src" alt="preview" />
          </div>
          <div class="list-item-text">
            <div class="list-item-title">
              {{ image.name }} converted to .PNG
            </div>
            <div class="list-item-subtitle">
              click here to open your converted image
            </div>
          </div>
          <div class="list-item-svg">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M13.125,12.508125 L9.821875,9.1875 C11.4622067,7.20832018 11.2575238,4.28942367 9.35702986,2.55853848 C7.45653591,0.827653288 4.53126838,0.895930478 2.71359943,2.71359943 C0.895930478,4.53126838 0.827653288,7.45653591 2.55853848,9.35702986 C4.28942367,11.2575238 7.20832018,11.4622067 9.1875,9.821875 L12.508125,13.125 L13.125,12.508125 Z M2.1875,6.125 C2.1875,3.9503788 3.9503788,2.1875 6.125,2.1875 C8.2996212,2.1875 10.0625,3.9503788 10.0625,6.125 C10.0625,8.2996212 8.2996212,10.0625 6.125,10.0625 C3.9503788,10.0625 2.1875,8.2996212 2.1875,6.125 Z"
                  id="path-1"
                ></path>
                <filter
                  x="-50.8%"
                  y="-50.8%"
                  width="201.5%"
                  height="201.5%"
                  filterUnits="objectBoundingBox"
                  id="filter-2"
                >
                  <feOffset
                    dx="2"
                    dy="2"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  ></feOffset>
                  <feGaussianBlur
                    stdDeviation="1"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  ></feGaussianBlur>
                  <feColorMatrix
                    values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0"
                    type="matrix"
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                  ></feColorMatrix>
                  <feOffset
                    dx="-2"
                    dy="-2"
                    in="SourceAlpha"
                    result="shadowOffsetOuter2"
                  ></feOffset>
                  <feGaussianBlur
                    stdDeviation="1"
                    in="shadowOffsetOuter2"
                    result="shadowBlurOuter2"
                  ></feGaussianBlur>
                  <feColorMatrix
                    values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0"
                    type="matrix"
                    in="shadowBlurOuter2"
                    result="shadowMatrixOuter2"
                  ></feColorMatrix>
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                    <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <g
                id="Symbols"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Group" transform="translate(-245.000000, 3.000000)">
                  <g id="Group-2" transform="translate(248.000000, 0.000000)">
                    <g id="Actions-/-Operations-/-search-/-24">
                      <g id="Fill">
                        <use
                          fill="black"
                          fill-opacity="1"
                          filter="url(#filter-2)"
                          xlink:href="#path-1"
                        ></use>
                        <use
                          fill="#A9ACB0"
                          fill-rule="evenodd"
                          xlink:href="#path-1"
                        ></use>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// const convert = require("heic-convert");
// const { readFileSync } = expose.node;
const expose: any = window;
const electron = expose.electron;

interface MyFile extends File {
  path?: string;
}

interface Item {
  src: string;
  name: string;
  path: string;
}

interface Items extends Array<Item> {}

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
      console.log("File(s) dropped");

      // Use DataTransferItemList interface to access the file(s)
      const files = event.dataTransfer.files;
      for (var i = 0; i < files.length; i++) {
        this.hasFiles = true;
        const file: MyFile = files[i];
        if (file.type === "image/heic") {
          //this.convertToHeic(file.path);
          this.convertFile(file.path, file.name);
        } else {
          // Do something here, like error
        }
      }
      return false;
    },
    convertFile: function (filePath: string, fileName: string) {
      const outputFormat = this.format;
      electron.send("convertToHeic", { filePath, fileName, outputFormat });
      // Only the first time. I guess it could be part of Vuejs init event
      if (!this.isFired) {
        electron.on(
          "fileConverted",
          (event: any, base64: string, newPath: string) => {
            this.isCompleted(base64, fileName, newPath);
          }
        );
        this.isFired = true;
      }
    },
    isCompleted: function (base64: string, fileName: string, fullPath: string) {
      this.images.push({ src: base64, name: fileName, path: fullPath });
      this.isLoading = false;
      this.active = false;
    },
    openLink(path: string) {
      electron.send("openLink", path);
    }

    // convertToHeic: async function (filePath: String) {
    //   var start = performance.now();
    //   const inputBuffer = readFileSync(filePath);
    //   const outputBuffer = await convert({
    //     buffer: inputBuffer, // the HEIC file buffer
    //     format: "JPEG", // output format
    //     quality: 1 // the jpeg compression quality, between 0 and 1
    //   });
    //   const base64 = Buffer.from(outputBuffer).toString("base64");
    //   this.images.push("data:image/jpg;base64," + base64);
    //   // code being timed...
    //   var duration = performance.now() - start;
    //   console.log(duration);
    // },
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
  justify-content: space-around;
  padding-bottom: 25px;
  cursor: pointer;

  &-img {
    max-height: 35px;
    max-width: 35px;
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
    background: #eaebf3;
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
}

// Loader
.loader {
  margin: 0 auto;
  margin-top: 30px;
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
