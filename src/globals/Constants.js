

export const isTouchDevice = () => {

	return (('ontouchstart' in window) ||
			window.DocumentTouch &&
			document instanceof window.DocumentTouch) ||
			navigator.msMaxTouchPoints ||
			false;

}

window.DEBUG = false;