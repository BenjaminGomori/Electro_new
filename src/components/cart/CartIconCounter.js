export default class CartIconCounter {
	constructor() {
		this.element = document.querySelector('.cart-item-counter');
		this.numElement = document.querySelector('.cart-item-counter__num');
		this._currentVal = 0;
	}

	adjustValue(amount) {
		this.numElement.innerHTML = null; //TODO
		this._currentVal += +amount;
		this.numElement.innerHTML = '' + this._currentVal;
		this.shouldDisplayOrNot();
	}

	getValue(val) {
		return this._currentVal;
	}

	_displayCounter = () => {
		this.element.style.visibility = 'visible';
	};
	_hideCounter = () => {
		this.element.style.visibility = 'hidden';
	};

	shouldDisplayOrNot() {
		if (this._currentVal <= 0) {
			this._hideCounter();
			return;
		}

		this._displayCounter();
	}
}
