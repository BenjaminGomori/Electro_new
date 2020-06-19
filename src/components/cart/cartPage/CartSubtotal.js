export default class CartSubtotal {
	// static  subtotal = 0;
	constructor(hook, subtotal) {
		this.hook = hook;
		this.element = null;
		this.subtotalValueElement = null;
		this.subtotal = subtotal;
		this._appendSubtotal();
	}
	_initializeElement = () => {
		this.element = document.createElement('div');
		this.element.classList.add('cart-subtotal');
	};

	_appendSubtotal = () => {
		this._initializeElement();
		let subtotalTitle = document.createElement('div');
		subtotalTitle.classList.add('cart-subtotal__txt');
		subtotalTitle.innerHTML = 'Subtotal:';
		this.element.insertAdjacentElement('beforeend', subtotalTitle);

		let subtotal = document.createElement('div');
		subtotal.classList.add('cart-subtotal__value');

		subtotal.innerHTML = '$' + this.subtotal.toFixed(2);

		this.subtotalValueElement = subtotal;
		this.element.insertAdjacentElement('beforeend', subtotal);
		this.hook.insertAdjacentElement('beforeend', this.element);
	};

	updateSubtotalValueElement = (subVal, addVal) => {
		this.subtotalValueElement.innerHTML = null; //TODO
		this.subtotal += addVal - subVal;
		this.subtotalValueElement.innerHTML = '$' + (+this.subtotal).toFixed(2); //TODO
	};
}
