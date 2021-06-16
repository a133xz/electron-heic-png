import { createApp } from "vue";
import App from "./App";
import "./scss/main.scss";

//new Vue({ render: (createElement) => createElement(App) }).$mount("#app");
const app = createApp(App);
app.mount("#app");
