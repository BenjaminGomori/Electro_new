export default class Cart {
	constructor(onClickParentEvent, navInstacne) {
		this.element = document.querySelector('.cart');
		this.element.addEventListener('click', this._onIconClick.bind(this));
		this.navInstacne = navInstacne;
		this.onClickParentEvent = onClickParentEvent;
	}

	_onIconClick(event) {
		event.stopPropagation();
		this.navInstacne._adjustDisabledLink('Cart');
		this.onClickParentEvent('cart icon');
	}
}
