import gsap from 'gsap';
export default {
	mounted() {
		// animation for all of the 4 logos
		for (let i = 1; i <= 4; i++) {
			gsap.to(`#logos img:nth-child(${i})`, {
				y: -1 * (Math.round(Math.random() * 10)) - 5,
				yoyo: true,
				repeat: -1,
				ease: 'sine.inOut',
				duration: 'random(0.5, 1.5)',
			});
		}
	},
};
