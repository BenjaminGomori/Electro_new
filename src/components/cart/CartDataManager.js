import CartPageLinks from './CartPageLinks.js';
import CartIconCounter from './CartIconCounter.js';

export default class CartDataManager {
	constructor(onCartDataChange) {
		this.cartData = { count: 0 };
		this.onCartDataChange = onCartDataChange;
		this._getLocalStorage();
	}

	addToCart = (prod) => {
		if (prod && prod.title && prod.mainImage && !isNaN(prod.amount)) {
			if (this.cartData[prod.title]) {
				this.cartData[prod.title].amount =
					(this.cartData[prod.title].amount || 0) + prod.amount;
			} else {
				this.cartData[prod.title] = {
					amount: prod.amount,
					mainImage: prod.mainImage,
					price: prod.price,
				};
			}
			this.cartData.count += +prod.amount;
			this.onCartDataChange(+prod.amount);
			this._storeLocaly();
		}
	};

	setProdAmount = (oldAmount, newAmount, title) => {
		if (title && !isNaN(newAmount) && +newAmount > -1) {
			if (this.cartData[title]) {
				this.cartData[title].amount = +newAmount;
				this.cartData.count += +newAmount - oldAmount;
				this.onCartDataChange(+newAmount - oldAmount);
				this._storeLocaly();
			}
		}
	};

	_getLocalStorage = () => {
		let storageCount = localStorage.getItem('count');
		let currentCount = JSON.parse(storageCount);
		this.cartData.count += +currentCount;
		this.onCartDataChange(+currentCount);

		if (currentCount > 0) {
			let keys = Object.keys(localStorage);

			for (let k of keys) {
				if (k === 'count') continue;
				let storage = localStorage.getItem(k);
				if (!storage.includes('INFO')) {
					let value = JSON.parse(storage);
					if (value) {
						this.cartData[k] = value;
					}
				}
			}
		}
	};

	getProdAount = (prodName) => {
		return this.cartData[prodName.amount];
	};

	getCartData = () => {
		return this.cartData;
	};

	removeProduct = (prodName) => {
		if (this.cartData[prodName] && this.cartData[prodName].amount) {
			this.cartData.count += -this.cartData[prodName].amount;
			this.cartData[prodName].amount = 0;
			this.onCartDataChange(-this.cartData[prodName].amount);
			this._storeLocaly();
		}
	};

	_storeLocaly = () => {
		for (let name in this.cartData) {
			if (this.cartData.hasOwnProperty(name)) {
				localStorage.setItem(name, JSON.stringify(this.cartData[name]));
			}
		}
		localStorage.setItem('count', this.cartData.count);

		let c = localStorage.getItem('count');
	};

	substractProduct = (prodName) => {
		if (this.cartData[prodName] && this.cartData[prodName].amount) {
			this.cartData.count += -this.cartData[prodName].amount;
			this.cartData[prodName].amount = this.cartData[prodName].amount - 1;
			this._storeLocaly(-this.cartData[prodName].amount);
			this.onCartDataChange();
		}
	};
}
