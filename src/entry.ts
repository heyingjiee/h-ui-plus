import { App } from "vue";

import JSButton from "../src/button/JSButton";
import TSXButton from "../src/button/TSXButton";
import SFCButton from "../src/button/SFCButton.vue";

export { JSButton, SFCButton, TSXButton };

export default {
  install(app: App): void {
    app.component(JSButton.name, JSButton);
    app.component(TSXButton.name, TSXButton);
    app.component(SFCButton.name, SFCButton);
  },
};
