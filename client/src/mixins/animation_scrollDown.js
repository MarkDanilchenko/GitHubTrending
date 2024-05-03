import gsap from 'gsap';
export default {
	mounted() {
		gsap.to('#scrollDownBtn', {
			y: 5,
			yoyo: true,
			repeat: -1,
			ease: 'sine.inOut',
			duration: 1,
		});
	},
};
