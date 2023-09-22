import { App } from "vue";

import JSButton from "./button/JSButton";
import TSXButton from "./button/TSXButton";
import SFCButton from "./button/SFCButton.vue";

import "uno.css";

export default {
  install(app: App): void {
    app.component(JSButton.name, JSButton);
    app.component(TSXButton.name, TSXButton);
    app.component(SFCButton.name, SFCButton);
  },
};

export { JSButton, SFCButton, TSXButton };
