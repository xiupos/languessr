import App from "./App.svelte";
import "@picocss/pico/css/pico.classless.min.css";
import "fork-awesome/css/fork-awesome.min.css";

/** @type {?HTMLElement} */
const app = document.getElementById("app");

export default app && new App({
  target: app,
});
