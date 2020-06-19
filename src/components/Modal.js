import inputToNonNegInteger from '../utilities/inputToNonNegInteger.js';

const BASE = '.modal__content__';

export default class Modal {
	constructor(cartDM) {
		this.elementContainer = document.querySelector('.center-modal');
		this.body = document.querySelector('body');
		this.titleElement = this.elementContainer.querySelector(`${BASE}title`);
		this.imgElement = this.elementContainer.querySelector(`${BASE}img`);
		this.amountElement = this.elementContainer.querySelector(`${BASE}amount`);
		this.totalElement = this.elementContainer.querySelector(`${BASE}total`);
		this.btnAddToCart = this.elementContainer.querySelector('.btn-add-to-cart');
		this.price = 0;
		this.cartDM = cartDM;
		this.prodData = null;
		this.returnToCallFn = null;

		this._addEvents();
	}

	_addEvents() {
		this.elementContainer.addEventListener('click', this.close);
		this.amountElement.addEventListener('change', this._onAmountChange);
		this.btnAddToCart.addEventListener('click', this._onAddToCart);
	}

	open = (prodData, returnToCallFn) => {
		this.returnToCallFn = returnToCallFn;
		this.prodData = prodData;
		this.elementContainer.classList.remove('is-not-displayed');
		this._updateTitle();
		this._updateImg();
		this._updateAmount();
		this._updateTotal();
		this.body.style.overflowY = 'hidden';
	};

	close = (event, addedToCart = false) => {
		if (!addedToCart && !event.target.classList.contains('center-modal'))
			return;

		this.elementContainer.classList.add('is-not-displayed');
		this.body.style.overflowY = 'scroll';
		this.returnToCallFn(addedToCart);
	};

	_updateTitle = () => {
		this.titleElement.innerHTML = null; //TODO
		this.titleElement.innerHTML = this.prodData.title;
	};

	_updateImg = () => {
		this.imgElement.src = this.prodData.mainImage;
	};

	_updateAmount = () => {
		this.amountElement.value = this.prodData.amount;
	};

	_updateTotal = () => {
		this.totalElement.innerHTML = null; //TODO
		this.totalElement.innerHTML =
			' $' + +this.prodData.price * +this.prodData.amount;
	};

	_onAmountChange = (event) => {
		event.stopPropagation();
		let noZero = true;
		event.target.value = inputToNonNegInteger(event.target.value, noZero);
		this.prodData.amount = +event.target.value;
		this._updateTotal();
	};

	_onAddToCart = (event) => {
		event.stopPropagation();
		this.cartDM.addToCart(this.prodData);
		this.close(null, true);
	};
}
