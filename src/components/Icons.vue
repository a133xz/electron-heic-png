<template>
  <div style="display: none">
    <svg
      id="svg-search-icon"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="width: 0; height: 0"
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
    <svg
      id="svg-spinner"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2400 2400"
      style="width: 0; height: 0"
    >
      <g stroke-width="200" stroke-linecap="round" stroke="#000" fill="none">
        <path d="M1200 600V100" />
        <path opacity=".5" d="M1200 2300v-500" />
        <path opacity=".917" d="M900 680.4l-250-433" />
        <path opacity=".417" d="M1750 2152.6l-250-433" />
        <path opacity=".833" d="M680.4 900l-433-250" />
        <path opacity=".333" d="M2152.6 1750l-433-250" />
        <path opacity=".75" d="M600 1200H100" />
        <path opacity=".25" d="M2300 1200h-500" />
        <path opacity=".667" d="M680.4 1500l-433 250" />
        <path opacity=".167" d="M2152.6 650l-433 250" />
        <path opacity=".583" d="M900 1719.6l-250 433" />
        <path opacity=".083" d="M1750 247.4l-250 433" />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
          values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
          dur="0.83333s"
          begin="0s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
      </g>
    </svg>
  </div>
</template>
