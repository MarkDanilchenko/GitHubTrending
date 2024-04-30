import gsap from 'gsap';
export default {
	mounted() {
		gsap.to('#detailedCard_repo', {
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
	},
};
