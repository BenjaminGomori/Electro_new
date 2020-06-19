import CartDataManager from './cart/CartDataManager.js';
import LinksToCartPage from './cart/CartPageLinks.js';
import CartIcon from './cart/CartIcon.js';
import CartIconCounter from './cart/CartIconCounter.js';
import Nav from './Nav.js';
import Backdrop from './Backdrop.js';
import Modal from './Modal.js';
import BurgerButton from './BurgerButton.js';
import SideDrawer from './SideDrawer.js';
import fetchCameras from '../utilities/fetchCameras.js';
import fetchLaptops from '../utilities/fetchLaptops.js';
import fetchPhones from '../utilities/fetchPhones.js';
import Products from './Products.js';
import Cart from './cart/cartPage/Cart.js';

class App {
	constructor() {
		this.productsHook = document.querySelector('.grid-page__content');
		this.cartHook = document.querySelector('.grid-page__content-cart-page');
		this.cartHook.style.display = 'none';
		this.state = {
			productsInstances: { cameras: null, laptops: null, phones: null },
			cartInstacne: null,
			currentElementDisplayed: 'cameras',
		};
		this.APIcallers = {
			products: {
				cameras: fetchCameras.bind(
					null,
					this._appendProducts.bind(this, 'Cameras')
				),
				laptops: fetchLaptops.bind(
					null,
					this._appendProducts.bind(this, 'Laptops')
				),
				phones: fetchPhones.bind(
					null,
					this._appendProducts.bind(this, 'Phones')
				),
			},
		};
		this._instantiatePagesCommonComponents();
		this.APIcallers.products.cameras();
	}

	_appendProducts(title, productsData) {
		if (productsData) {
			let products = new Products(
				this.productsHook,
				this.cartDM,
				productsData,
				title,
				this.modal
			);
			let lowerCaseTitle = title.toLocaleLowerCase();
			this.state.productsInstances[lowerCaseTitle] = products;
			this.state.currentElementDisplayed = lowerCaseTitle;
		}
	}

	_onNavClick(linkTxt) {
		let lowerLinkTxt = linkTxt.toLocaleLowerCase();
		this._hideCurrentDisplaedElement();

		//if product element was already renderd)
		if (this.state.productsInstances[lowerLinkTxt]) {
			this._adjustCartLinksToProductPage();
			this._adjustContainerClassToProducts();
			this._hideCurrentDisplaedElement();
			this._displayExistingProductElement(
				this.state.productsInstances[lowerLinkTxt]
			);
		} else if (lowerLinkTxt === 'cart' || lowerLinkTxt === 'cart icon') {
			this._adjustCartLinksToCartPage();
			this._adjustContainerClassToCart();
			this.state.cartInstacne = new Cart(this.cartHook, this.cartDM); //TODO??
			this.state.currentElementDisplayed = 'cart';
		} else {
			this._adjustCartLinksToProductPage();
			this._adjustContainerClassToProducts();
			this.APIcallers.products[lowerLinkTxt]();
		}

		//burgerButton also closes sideDrawer and backdrop
		if (lowerLinkTxt !== 'cart icon') this.burgerButton.onClicked();
	}

	_hideCurrentDisplaedElement = () => {
		if (this.state.productsInstances[this.state.currentElementDisplayed]) {
			this.state.productsInstances[
				this.state.currentElementDisplayed
			].element.style.display = 'none';
			this.state.productsInstances[
				this.state.currentElementDisplayed
			].titleElement.style.display = 'none';
			this.state.productsInstances[
				this.state.currentElementDisplayed
			].subtitleElement.style.display = 'none';
		}
	};

	_displayExistingProductElement = (existingProductInstance) => {
		existingProductInstance.element.style.display = 'grid';
		existingProductInstance.titleElement.style.display = 'block';
		existingProductInstance.subtitleElement.style.display = 'block';
		this.state.currentElementDisplayed = existingProductInstance.title.toLocaleLowerCase();
	};

	_instantiatePagesCommonComponents() {
		this.linksToCartPageInstance = new LinksToCartPage();
		this.cartIconCounterInstance = new CartIconCounter();
		this.onCartDataChange = (productCountChanged) => {
			this.cartIconCounterInstance.adjustValue(productCountChanged);
			this.linksToCartPageInstance.shouldDisplayLinks(
				this.cartIconCounterInstance.getValue()
			);
		};
		this.cartDM = new CartDataManager(this.onCartDataChange);
		let navInstance = new Nav(this._onNavClick.bind(this));
		new CartIcon(this._onNavClick.bind(this, 'cart icon'), navInstance);
		this.backdrop = new Backdrop();
		console.log(this.cartDM);
		this.modal = new Modal(this.cartDM);
		this.sideDrawer = new SideDrawer();
		this.burgerButton = new BurgerButton(this.sideDrawer, this.backdrop);
		this.backdrop.addClickEvent(this.burgerButton.onClicked);
		this.backdrop.addClickEvent(this.modal.close);
	}

	_adjustContainerClassToCart = () => {
		this.cartHook.style.display = 'block';
		this.productsHook.style.display = 'none';
	};

	_adjustContainerClassToProducts = () => {
		this.productsHook.style.display = 'block';
		this.cartHook.style.display = 'none';
		this.cartHook.innerHTML = null;
	};

	_adjustCartLinksToCartPage = () => {
		this.linksToCartPageInstance.adjustLinksForCartPage();
		this.linksToCartPageInstance.shouldDisplayLinks(this.cartDM.cartData.count);
	};

	_adjustCartLinksToProductPage = () => {
		this.linksToCartPageInstance.adjustLinksForProductPage();
		this.linksToCartPageInstance.shouldDisplayLinks(this.cartDM.cartData.count);
	};
}

new App();
