import Card from './Card.js';

export default class Products {
	constructor(hook, cartDataManager, productsData, productsTitle, modal) {
		this.element = null;
		this.hook = hook;
		this.cartDataManager = cartDataManager;
		this.titleElement = null;
		this.subtitleElement = null;
		this.productsData = productsData;
		this.modal = modal;
		this.title = productsTitle;
		this.productCardsInstances = [];
		this._initializeElements();
		this._prepareProductsDataForCards();
		this._appendProductsCrads();
	}

	_initializeElements() {
		this.element = document.createElement('div');
		this.titleElement = document.createElement('h2');
		this.subtitleElement = document.createElement('h3');
		this.element.classList.add('grid-products');
		this.titleElement.classList.add('products-title');
		this.subtitleElement.classList.add('products-subtitle');
		this.titleElement.innerHTML = this.title;
		this.subtitleElement.innerHTML = this.productsData.length + ' products';
		this.element.addEventListener('click', this._onAddProductToCart);
		this.hook.insertAdjacentElement('beforeend', this.titleElement);
		this.hook.insertAdjacentElement('beforeend', this.subtitleElement);
		this.hook.insertAdjacentElement('beforeend', this.element);
	}

	_prepareProductsDataForCards() {
		for (let i = 0; i < this.productsData.length; i++) {
			this.productsData[i].addToCart = true;
			this.productsData[i].amount = 1;
		}
	}

	_appendProductsCrads() {
		for (let i = 0; i < this.productsData.length; i++) {
			let hook = this.element;
			let cardData = this.productsData[i];
			let cardNumber = i;
			let productCardInstance = new Card(hook, cardData, cardNumber);
			this.productCardsInstances.push(productCardInstance);
		}
	}

	//opens modal
	_onAddProductToCart = (event) => {
		event.stopPropagation();
		if (event.target.classList.contains('btn-open-modal')) {
			//find inputs data
			let amount = +event.target.nextElementSibling.value;
			let prodIndex = +event.target.getAttribute('data-card-number');

			//prepare prod object
			let prodData = this.productsData[prodIndex];
			prodData.amount = amount;
			this.modal.open(prodData, this.onReturnFromModal.bind(this, prodIndex));
		}
	};

	onReturnFromModal(prodIndex, wasPurchased) {
		if (wasPurchased) {
			this.productCardsInstances[prodIndex].inputElement.value = '1';
		}
	}
}
