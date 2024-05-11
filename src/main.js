import { createApp } from "vue";
import App from "./App.vue";

import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";
import "./assets/index.css";

const app = createApp(App).use(mdiVue, {
  icons: mdijs,
});
app.mount("#app");
