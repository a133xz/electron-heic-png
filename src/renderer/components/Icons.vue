<template>
  <div style="display: none">
    <svg
      id="svg-error"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-x"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
    <svg
      id="svg-arrow"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.2866C21 12.0749 20.912 11.888 20.7361 11.7258L14.2949 5.26806C14.1162 5.08935 13.9196 5 13.7052 5C13.4935 5 13.3175 5.0701 13.1773 5.21031C13.0371 5.35052 12.967 5.5251 12.967 5.73404C12.967 5.83851 12.9835 5.93747 13.0165 6.03093C13.0495 6.1244 13.1017 6.20413 13.1732 6.27012L15.7134 8.84744L19.2887 12.1382L19.466 11.6969L16.4722 11.5278H3.75053C3.52784 11.5278 3.34708 11.5993 3.20824 11.7423C3.06941 11.8852 3 12.0667 3 12.2866C3 12.5065 3.06941 12.688 3.20824 12.8309C3.34708 12.9739 3.52784 13.0454 3.75053 13.0454H16.4722L19.466 12.8763L19.2887 12.4433L15.7134 15.7258L13.1732 18.3031C13.1045 18.3691 13.0529 18.4488 13.0185 18.5423C12.9842 18.6357 12.967 18.7347 12.967 18.8392C12.967 19.0481 13.0371 19.2227 13.1773 19.3629C13.3175 19.5031 13.4935 19.5732 13.7052 19.5732C13.9113 19.5732 14.0955 19.4949 14.2577 19.3382L20.7361 12.8474C20.912 12.6852 21 12.4983 21 12.2866Z"
        fill="black"
      />
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
