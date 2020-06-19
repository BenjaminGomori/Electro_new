import inputToNonNegInteger from '../utilities/inputToNonNegInteger.js';

export default class Card {
	constructor(hook, cardData, cardNumber) {
		this.element = null;
		this.inputElement = null;
		this.hook = hook;
		this.cardData = cardData;
		this.cardNumber = cardNumber;
		this.labelId = 'lbl_' + cardNumber;
		this.inputId = '' + cardNumber;
		this.inputName = '' + cardNumber;
		this._appendCard();
	}

	_appendCard = () => {
		this.element = document.createElement('div');
		this.element.classList.add('card');
		this._appendElements();
		this.hook.insertAdjacentElement('beforeend', this.element);
	};

	_appendElements = () => {
		this._appendImage();
		this._appendName();
		this._appendAttributes();
		//disabled for product cards since height is set
		//this._appendProperties();
		this._appendPrice();
		this._appendAddToCartBtn();
		this._appendAddToCartAmountInput();
	};

	_appendImage = () => {
		let img = document.createElement('img');
		img.classList.add('card__image');
		img.src = this.cardData.mainImage;
		img.alt = 'Image';
		this.element.insertAdjacentElement('beforeend', img);
	};

	_appendName = () => {
		let name = document.createElement('p');
		name.classList.add('card__title');
		name.innerHTML = this.cardData.title;
		this.element.insertAdjacentElement('beforeend', name);
	};

	_appendAttributes = () => {
		let attribute = document.createElement('p');
		attribute.classList.add('card__attributes');
		//only one attributes fits in card
		attribute.innerHTML = this.cardData.attributes[0];
		this.element.insertAdjacentElement('beforeend', attribute);
	};

	//not used in this project
	_appendProperties = () => {
		if (this.cardData.properties && this.cardData.properties.length > 0) {
			for (let property of this.cardData.properties) {
				let prop = document.createElement('p');
				prop.classList.add('card__prop');
				prop.innerHTML = property;
				this.element.insertAdjacentElement('beforeend', prop);
			}
		}
	};

	_appendPrice = () => {
		let prices = document.createElement('p');
		let oldPrice = null;
		let discountPrice = null;
		let noDisPrice = null;

		prices.classList.add('card__prices');

		if (this.cardData.oldPrice) {
			oldPrice = document.createElement('span');
			discountPrice = document.createElement('span');
			oldPrice.classList.add('card__prices__old');
			discountPrice.classList.add('card__prices__discount');
			oldPrice.innerHTML = '$' + this.cardData.oldPrice;
			discountPrice.innerHTML = '  $' + this.cardData.price;

			prices.insertAdjacentElement('beforeend', discountPrice);
		} else {
			noDisPrice = document.createElement('span');
			noDisPrice.classList.add('card__prices__price');
			noDisPrice.innerHTML = '$' + this.cardData.price;
			prices.insertAdjacentElement('beforeend', noDisPrice);
		}

		this.element.insertAdjacentElement('beforeend', prices);
	};

	_appendAddToCartBtn = () => {
		let btn = document.createElement('div');
		btn.classList.add('btn-open-modal');
		btn.setAttribute('data-card-number', this.cardNumber);
		btn.innerHTML = 'Add to Cart';
		this.element.insertAdjacentElement('beforeend', btn);
	};

	_appendAddToCartAmountInput = () => {
		let label = document.createElement('label');
		this.inputElement = document.createElement('input');
		this.inputElement.classList.add('input-add-cart-amount');
		label.classList.add('accessibility-only');
		this.inputElement.setAttribute('data-card-number', this.cardNumber);
		this.inputElement.type = 'number';
		this.inputElement.id = this.inputId;
		this.inputElement.name = this.inputName;
		this.inputElement.min = '1';
		this.inputElement.value = '1';
		label.innerHTML = 'Amount';
		label.id = this.labelId;
		label.setAttribute('for', this.inputId);
		this.inputElement.addEventListener('change', this._onAmountChange);
		this.element.insertAdjacentElement('beforeend', this.inputElement);
		this.element.insertAdjacentElement('beforeend', label);
	};

	//input of positive integers only
	_onAmountChange = (event) => {
		event.target.value = inputToNonNegInteger(event.target.value, true);
	};
}
