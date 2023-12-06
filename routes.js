module.exports = [
  {
    path: "/",
    meta: {
      title: "刘家堡汾河大桥安全监测系统",
    },
    component: () => import('@/page/index.vue')
  },
  {
    path: "/facilities",
    meta: {
      title: "刘家堡汾河大桥安全监测系统",
    },
    component: () => import('@/page/facilities.vue')
  },
];

const routes = require('@/router/routes.js')
