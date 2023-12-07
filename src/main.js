import Vue from 'vue';
import App from './components/com/App.vue';

Vue.config.productionTip = false;

//element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//路由
import VueRouter from "vue-router";
Vue.use(VueRouter);

/**工具类*/
import tools from './components/module/tools.vue';
Vue.prototype.$tools = tools;

/**工具类*/
import {request} from './components/module/NetHttp.js';
Vue.prototype.$request = request;

//rem 适配  1rem = 14px
import './components/module/fontSize.js';

//框架
import Antd from 'ant-design-vue';
Vue.use(Antd);

import VueParticles from 'vue-particles';
Vue.use(VueParticles);

// 图表工具
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import * as Swiper from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.css';

//公共css
import 'ant-design-vue/dist/antd.css';
import './assets/css/com/lib.css';

// import Index from './page/index.vue';
// import Facilities from './page/facilities.vue';

// const routes = [{
// 	path: '/',
// 	meta: {
// 		title: '刘家堡汾河大桥安全监测系统'
// 	},
// 	component: Index,
// },{
// 	path: '/facilities',
// 	meta: {
// 		title: '刘家堡汾河大桥安全监测系统'
// 	},
// 	component: Facilities,
// }];
const routes = require('@/router/routes.js')

const router = new VueRouter({
	routes,
	mode: "hash",
	linkActiveClass: 'active'
});

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
