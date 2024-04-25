export default {
	mounted() {
		// .dot{} color initialization
		// .dot{} color initialization
		// .dot{} color initialization
		try {
			const colorMode = $('html').attr('data-bs-theme');
			if (colorMode === null) {
				throw new Error('The color theme switched to light-mode as default');
			} else {
				if (colorMode == 'dark') {
					$('.dot').css('background', '#ffffff');
				} else {
					$('.dot').css('background', '#000000');
				}
			}
		} catch (e) {
			$('.dot').css('background', '#000000');
		}
	},
};
