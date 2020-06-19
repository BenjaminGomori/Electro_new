import inputToNonNegInteger from '../../../utilities/inputToNonNegInteger.js';

export default class CartItem {
	// static  subtotal = 0;
	constructor(hook, prod, cartDataManager, updateSubtotalFn) {
		this.hook = hook;
		this.element = null;
		//description div holds: img, name/tital, and remove button
		this.description = null;
		this.totalPriceElemnt = null;
		this.prodName = ''; //is prod name
		this.mainImage = '';
		this.amount = 0;
		this.price = 0;
		this.totalPrice = 0;
		this.subtotal = 0;
		this.cartDataManager = cartDataManager;
		this.updateSubtotalFn = updateSubtotalFn;

		// this.prodData = prod; //TODO CHANGE PAGE LOGIC TO THIS FORMAT

		this._append(prod);
	}

	_append = (prod) => {
		if (prod) {
			if (prod.amount && prod.price) {
				this._initializeElement();
				this._appendDiscreptionDiv();

				this._appendDivsImg(prod);
				this._appendDivsTitle(prod);
				this._appendDivsRemoveBtn();
				this._appendAmount(prod);
				this._appendPrice(prod);
				this._appendTotalPrice(prod);

				this.hook.insertAdjacentElement('beforeend', this.element);
			}
		}
	};

	_initializeElement = () => {
		this.element = document.createElement('div');
		this.element.classList.add('cart-item');
	};

	_appendDiscreptionDiv = (prod) => {
		this.description = document.createElement('div');
		this.description.classList.add('cart-item__description');
		this.element.insertAdjacentElement('beforeend', this.description);
	};

	_appendDivsImg = (prod) => {
		if (prod && prod.mainImage) {
			let div = document.createElement('div');
			let img = document.createElement('img');
			div.classList.add('cart-item__description__container-img');
			img.classList.add('cart-item__description__img');
			img.src = prod.mainImage;
			this.mainImage = prod.mainImage;
			div.insertAdjacentElement('beforeend', img);
			this.description.insertAdjacentElement('beforeend', div);
		}
	};

	_appendDivsTitle = (prod) => {
		if (prod.title) {
			let title = document.createElement('div');
			title.classList.add('cart-item__description__title');
			title.innerHTML = prod.title;
			this.prodName = prod.title;
			this.description.insertAdjacentElement('beforeend', title);
		}
	};

	onChageAmount = (e, isRemoved = false) => {
		let passedInValue = 0;

		if (!isRemoved && e) {
			e.target.value = inputToNonNegInteger(e.target.value);
			passedInValue = +e.target.value;
		}

		let oldPrice = this.totalPrice;
		let newTotalPrice = passedInValue * this.price;
		let oldAmount = this.amount;
		let newAmount = passedInValue;

		this.totalPrice = newTotalPrice;
		this.amount = newAmount;

		this.totalPriceElemnt.innerHTML = null; //TODO
		this.totalPriceElemnt.innerHTML = '$' + newTotalPrice.toFixed(2); //TODO
		this.cartDataManager.setProdAmount(oldAmount, newAmount, this.prodName);
		this.updateSubtotalFn(oldPrice, newTotalPrice);
	};

	_appendAmount = (prod) => {
		if (prod && prod.amount) {
			let amount = document.createElement('div');
			let label = document.createElement('label');
			label.classList.add('accessibility-only');

			let input = document.createElement('input');
			input.addEventListener('change', this.onChageAmount);
			input.type = 'number';
			input.id = prod.title;
			input.name = prod.title;
			input.min = '0';
			input.value = prod.amount;
			input.classList.add('input-cart-item-amount');
			amount.classList.add('cart-item__amount');
			this.amount = prod.amount;
			label.innerHTML = 'Amount';
			label.setAttribute('for', prod.title);
			amount.insertAdjacentElement('beforeend', label);
			amount.insertAdjacentElement('beforeend', input);
			this.element.insertAdjacentElement('beforeend', amount);
		}
	};

	_appendPrice = (prod) => {
		if (prod && prod.price) {
			let price = document.createElement('div');
			price.classList.add('cart-item__price');
			price.innerHTML = '$' + prod.price;
			this.price = prod.price;
			this.element.insertAdjacentElement('beforeend', price);
		}
	};

	_appendTotalPrice = (prod) => {
		if (prod && prod.price && prod.amount) {
			let totalPrice = document.createElement('div');
			totalPrice.classList.add('cart-item__total');
			let val = +prod.price * +prod.amount;
			totalPrice.innerHTML = '$' + val.toFixed(2);
			this.totalPrice = (+prod.price * +prod.amount).toFixed(2);
			this.element.insertAdjacentElement('beforeend', totalPrice);
			this.totalPriceElemnt = totalPrice;
			// CartItem.subtotal += +val;
			this.subtotal += +val;
		}
	};

	_appendDivsRemoveBtn = () => {
		this.remove = document.createElement('div');
		let btn = document.createElement('p');

		this.remove.classList.add('btn-cart-remove');
		this.remove.classList.add('cart-item__description__remove');
		btn.classList.add('btn-cart-remove__p');
		btn.innerHTML = 'Remove';
		btn.addEventListener('click', this._removeItem);

		this.remove.insertAdjacentElement('beforeend', btn);
		this.description.insertAdjacentElement('beforeend', this.remove);
	};

	_appendBtnPurchise = () => {
		this._initializeElement();
		this.element.style.border = '0px solid white';

		let cartItemLastColumn = document.createElement('div');
		let btnPurchise = document.createElement('div');
		let btnTxt = document.createElement('p');

		cartItemLastColumn.classList.add('cart-item__total');
		btnPurchise.classList.add('btn-purchise');
		btnTxt.innerHTML = 'TO BE CONTINUED...';

		cartItemLastColumn.insertAdjacentElement('beforeend', btnPurchise);
		btnPurchise.insertAdjacentElement('beforeend', btnTxt);
		this.element.insertAdjacentElement('beforeend', cartItemLastColumn);
		this.hook.insertAdjacentElement('beforeend', this.element);
	};

	_removeItem = () => {
		let isRemoved = true;
		this.onChageAmount(null, isRemoved);
		this.element.classList.add('is-not-displayed');
	};
}
