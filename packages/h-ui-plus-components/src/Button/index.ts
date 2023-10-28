import { App } from "vue";

import SFCButton from "./src/SFCButton.vue";

import "uno.css";

export default {
  install(app: App): void {
    app.component(SFCButton.__name, SFCButton);
  },
};

export { SFCButton };
