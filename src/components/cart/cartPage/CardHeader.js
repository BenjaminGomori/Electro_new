export default class CartHeader {
	// static  subtotal = 0;
	constructor(hook) {
		this.hook = hook;
		this.element = null;
		this.description = null;
		this._append();
	}
	
		_append = () => {
			this._initializeElement();
			this._appendProductDiv();
			this._appendProductTxt();
			this._appendAmountTxt();
			this._appendPriceTxt();
			this._appendTotalPriceTxt();

			this.hook.insertAdjacentElement('beforeend', this.element);
		};
	
		_initializeElement = () => {
			this.element = document.createElement('div');
			this.element.classList.add('cart-header');
		};

		_appendProductDiv = (prod) => {
			this.description = document.createElement('div');
			this.description.classList.add('cart-header__description');
			this.element.insertAdjacentElement('beforeend', this.description);
		};

		_appendProductTxt = () => {
			let header = document.createElement('div');
			header.classList.add('cart-header__description__title');
			header.innerHTML = 'Product';
			this.description.insertAdjacentElement('beforeend', header);
			return;
		};

		_appendAmountTxt = () => {
			let amount = document.createElement('div');
			amount.classList.add('cart-header__amount');
			amount.innerHTML = 'Units';
			this.element.insertAdjacentElement('beforeend', amount);
		};

		_appendPriceTxt = () => {
			let price = document.createElement('div');
			price.classList.add('cart-header__price');
			price.innerHTML = 'Price';
			this.element.insertAdjacentElement('beforeend', price);
		};

		_appendTotalPriceTxt = () => {
			let totalPrice = document.createElement('div');
			totalPrice.classList.add('cart-header__total');
			totalPrice.innerHTML = 'Total';
			this.element.insertAdjacentElement('beforeend', totalPrice);
		};

}
