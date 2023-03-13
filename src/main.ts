import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '/@/styles/index.less';
import '/@/styles/reset.less';
import 'uno.css';

// 支持SVG
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(router);
app.mount('#app');
