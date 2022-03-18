import {createSSRApp} from "vue";
import App from "./App.vue";
import store from './store'
import '@/static/css/index.scss';
import '@/static/font/iconfont.css'
import api from '@/api';
import {setupGlobalDirectives} from './directives/index.js';
export function createApp() {
	const app = createSSRApp(App);
	app.use(store)
	app.config.globalProperties.$api = api.modules
	setupGlobalDirectives(app)
	return {
		app,
	};
}
