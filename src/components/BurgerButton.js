export default class BurgerButton {
	constructor(sideDrawer, backdrop) {
		this.burgerButton = document.querySelector('.btn-burger');
		this.btnLines = document.querySelectorAll('.btn-burger__line');
		this.isActive = false;
		this.sideDrawer = sideDrawer;
		this.backdrop = backdrop;
		this.burgerButton.addEventListener('click', this.onClicked);
	}

	onClicked = () => {
		if (!this.isActive) {
			this.transformBurgerLinesToX();
			this.backdrop.open();
			this.sideDrawer.open();
			this.isActive = true;
			return;
		}

		this.resetBurgerLinesBack();
		this.backdrop.close();
		this.sideDrawer.close();
		this.isActive = false;
	};

	transformBurgerLinesToX = () => {
		for (let i = 0; i < this.btnLines.length; i++) {
			if (i === 0) {
				this.btnLines[i].style.position = 'absolute';
				this.btnLines[i].style.top = '18.5';
				this.btnLines[i].style.transform = 'rotate(45deg)';
				this.btnLines[i].style.height = '3px';
				continue;
			}

			if (i === 1) {
				this.btnLines[i].style.position = 'absolute';
				this.btnLines[i].style.top = '18.5';
				this.btnLines[i].style.transform = ' rotate(-45deg)';
				this.btnLines[i].style.height = '3px';
				continue;
			}

			this.btnLines[i].style.display = 'none';
		}
	};

	resetBurgerLinesBack = () => {
		for (let i = 0; i < this.btnLines.length; i++) {
			if (i === 0) {
				this.btnLines[i].style.transform = 'translateY(0px)rotate(0deg)';
				this.btnLines[i].style.position = 'static';
				this.btnLines[i].style.height = '2px';
			}

			if (i === 1) {
				this.btnLines[i].style.transform = 'translateY(0px) rotate(0deg)';
				this.btnLines[i].style.position = 'static';
				this.btnLines[i].style.height = '2px';
			}

			this.btnLines[i].style.display = 'inline-block';
		}
	};

	openSideDrawer = () => {
		this.sideDrawer.open();
	};

	closeSideDrawer = () => {
		this.sideDrawer.close();
	};

	openBackdrop = () => {
		this.backdrop.open();
	};

	closeBackdrop = () => {
		this.backdrop.close();
	};
}
