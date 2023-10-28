import { App } from "vue";

import JSButton from "./src/JSButton";
import TSXButton from "./src/TSXButton";
import SFCButton from "./src/SFCButton.vue";

import "uno.css";

export default {
  install(app: App): void {
    app.component(JSButton.name, JSButton);
    app.component(TSXButton.name, TSXButton);
    app.component(SFCButton.__name, SFCButton);
  },
};

export { JSButton, SFCButton, TSXButton };
