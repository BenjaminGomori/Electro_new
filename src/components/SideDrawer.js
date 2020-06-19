export default class SideDrawer {
	constructor() {
		this.element = document.querySelector('.side-drawer');
	}

	open = () => {
		this.element.style.transform = ' translateX(0rem)';
		this.element.style.opacity = ' 1';
	};

	close = () => {
		this.element.style.opacity = '0';
		setTimeout(() => {
			this.element.style.transform = ' translateX(-12rem)';
		}, 350);
	};
}
