import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: () => import('../layout/main.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
