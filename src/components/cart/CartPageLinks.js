export default class CartPageLinks {
	constructor() {
		this.cartHyperLink = document.querySelector('.nav__link-cart');
		this.cartIconLink = document.querySelector('.cart');
		this.allwaysDisplayHyperLink = false;
		this.alwaysDisableIcon = false;
	}

	shouldDisplayLinks = (val) => {
		val > 0 ? this._displayLinks() : this._hideLinks();
	};

	_displayLinks = () => {
		this._displayHyperLink();
		this._activateIconLink();
	};

	_hideLinks = () => {
		this._hideHyperLink();
		this._disableIconLink();
	};

	adjustLinksForCartPage = () => {
		this.allwaysDisplayHyperLink = true;
		this.alwaysDisableIcon = true;
	};

	adjustLinksForProductPage = () => {
		this.allwaysDisplayHyperLink = false;
		this.alwaysDisableIcon = false;
	};

	_displayHyperLink = () => {
		this.cartHyperLink.style.display = 'inline-block';
	};

	_hideHyperLink = () => {
		if (this.allwaysDisplayHyperLink) {
			this.cartHyperLink.style.display = 'inline-block';
		} else {
			this.cartHyperLink.style.display = 'none';
		}
	};

	_activateIconLink = () => {
		if (this.alwaysDisableIcon) {
			this.cartIconLink.classList.add('disable-icon');
		} else {
			this.cartIconLink.classList.remove('disable-icon');
		}
	};

	_disableIconLink = () => {
		this.cartIconLink.classList.add('disable-icon');
	};
}
