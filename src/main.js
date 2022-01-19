import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import 'normalize.css/normalize.css'
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
