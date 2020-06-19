import CartHeader from './CardHeader.js';
import CartItem from './CartItem.js';
import CartSubtotal from './CartSubtotal.js';

export default class Cart {
	constructor(hook, cartDM) {
		this.element = document.createElement('div');
		this.titleElement = null;
		this.title = 'Cart'; //used in App only
		this.cartDM = cartDM;
		this.cartData = cartDM.getCartData();
		this.cartSubtotalElement = null;
		this.subtotalVal = 0;

		this.element.classList.add('cart-items');
		hook.insertAdjacentElement('beforeend', this.element);

		this._appendCartElements();
	}

	_appendCartElements() {
		this._appendCartTitle();
		this._appendCartHeader();
		this._appendCartItems();
		this._appendCartSubtotal();
		this._appendCheckOutBtn();
	}

	_appendCartTitle() {
		this.titleElement = document.createElement('h2');
		this.titleElement.classList.add('cart-title');
		this.titleElement.innerHTML = 'Shopping cart';
		this.element.insertAdjacentElement('beforeend', this.titleElement);
	}

	_appendCartHeader() {
		new CartHeader(this.element);
	}

	_appendCartItems = () => {
		let cartItemData = '';

		for (let prod in this.cartData) {
			if (this.cartData.hasOwnProperty(prod) && prod !== 'count') {
				cartItemData = this._prepaireProdForCartItem(prod, this.cartData[prod]);
				let cartItem = new CartItem(
					this.element,
					cartItemData,
					this.cartDM,
					this._updateCartSubtotal
				);
				this.subtotalVal += cartItem.subtotal;
			}
		}
	};

	_appendCartSubtotal = () => {
		this.cartSubtotalElement = new CartSubtotal(this.element, this.subtotalVal);
	};

	_updateCartSubtotal = (subVal, addVal) => {
		this.cartSubtotalElement.updateSubtotalValueElement(subVal, addVal);
	};

	_appendCheckOutBtn = () => {
		let div = document.createElement('div');
		let checkOutBtn = document.createElement('div');
		div.classList.add('cart-items__btn-checkout');
		checkOutBtn.classList.add('btn-checkout');
		checkOutBtn.innerHTML = 'To Be Continued...';
		div.insertAdjacentElement('beforeend', checkOutBtn);
		this.element.insertAdjacentElement('beforeend', div);
	};

	_prepaireProdForCartItem(name, objData) {
		let cartItemData = { title: name, ...objData };
		return cartItemData;
	}
}
