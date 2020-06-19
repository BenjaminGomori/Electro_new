export default class Nav {
	constructor(onClickParentEvent) {
		this.element = document.querySelector('.nav');
		this.element.addEventListener('click', this._onLinkClick.bind(this));
		this.navLinks = {};
		this.disabledLink = '';
		this.onClickParentEvent = onClickParentEvent;
		this._queryNavLinks();
	}

	_queryNavLinks() {
		const links = document.querySelectorAll('.nav__link');

		for (const link of links) {
			this.navLinks[link.innerText] = link;

			if (link.classList.contains('disabled-link'))
				this.disabledLink = link.innerText;
		}
	}

	_onLinkClick(event) {
		event.stopPropagation();
		let isLink = this.verifyIsLink(event.target);
		let linkTxt = event.target.innerText;
		if (!isLink) return;

		this._adjustDisabledLink(linkTxt);
		this.onClickParentEvent(linkTxt);
	}

	_adjustDisabledLink = (linkTxt) => {
		if (this.disabledLink === linkTxt) return;

		this.navLinks[this.disabledLink].classList.remove('disabled-link');
		this.navLinks[linkTxt].classList.add('disabled-link');
		this.disabledLink = linkTxt;
	};

	verifyIsLink(link) {
		if (link.classList.contains('nav__link')) return true;

		return false;
	}
}
