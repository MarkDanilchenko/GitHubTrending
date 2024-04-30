import gsap from 'gsap';
export default {
	mounted() {
		gsap.fromTo('#getTrendingRepos_btn', { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' }, { duration: 1, ease: 'sine.inOut', repeat: -1, yoyo: true, boxShadow: '0 0 20px 5px rgba(7, 151, 98, 0.5)' });
	},
};
