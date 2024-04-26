import * as VueRouter from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home_page',
		component: () => import('@/views/Home_page.vue'),
	},
	{
		path: '/main',
		name: 'Main_page',
		component: () => import('@/views/Main_page.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404_page',
		component: () => import('@/views/404_page.vue'),
	},
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
});

export default router;
