export default class backdrop {
	constructor() {
		this.element = document.querySelector('.backdrop');
	}
	open = () => {
		this.element.style.transform = 'translateX(0px)';
	};
	close = () => {
		this.element.style.transform = 'translateX(150vw)';
	};

	addClickEvent = (f) => {
		this.element.addEventListener('click', f);
	};
}
