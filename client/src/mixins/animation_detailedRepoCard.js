import gsap from 'gsap';
export default {
	mounted() {
		this.applyAnimation();
	},
	methods: {
		applyAnimation() {
			const element = document.getElementById('detailedCard_repo');
			if (element) {
				gsap.to(element, {
					transformOrigin: '50% 50%',
					translateY: 'random(-15, 15)',
					rotateY: 'random(-5, 5)',
					rotateZ: 'random(-5, 5)',
					rotateX: 'random(-5, 5)',
					repeat: -1,
					yoyo: true,
					duration: 2.5,
					ease: 'sine.inOut',
					borderBottom: '2px solid rgba(7, 151, 98, 1)',
				});
			}
		},
	},
};
