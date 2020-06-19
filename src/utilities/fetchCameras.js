export default async function fetchCameras(f) {
	let host = location.hostname;
	let response = await fetch(
		'https://polar-hollows-32646.herokuapp.com/cameras'
	);
	if (response.ok) {
		let res = await response.json();
		f(res.data);
	}

	// const cameras = [
	// 	{
	// 		oldPrice: '79.99',
	// 		price: '59.99',
	// 		company: 'Canon',
	// 		attributes: ['Recomended'],
	// 		title: 'Canon 4th Generation 2FGL102',
	// 		mainImage: './images/cameras/matt-bero-MH55auBRiNY-unsplash.jpg',
	// 		images: [],
	// 	},
	// 	{
	// 		oldPrice: '224.25',
	// 		price: '129.99',
	// 		company: 'Canon',
	// 		attributes: ['Best Seller'],
	// 		title: 'Canon 3RD Generation HHGL02',
	// 		mainImage: './images/cameras/christian-fregnan-oSruNLr68yc-unsplash.jpg',
	// 		images: [],
	// 	},
	// 	{
	// 		oldPrice: '199.99',
	// 		price: '126.95',
	// 		company: 'KONOST',
	// 		attributes: ['Best Seller'],
	// 		title: 'KONOST 2nd G-Evolution 5.1',
	// 		mainImage: './images/cameras/mikkel-bech-xpa7Vfw-aP8-unsplash.jpg',
	// 		images: [],
	// 	},
	// 	{
	// 		oldPrice: '178.55',
	// 		price: '90.95',
	// 		company: 'FUJIFILM',
	// 		attributes: ['High Performance'],
	// 		title: 'FUJIFILM Pro 4.3V',
	// 		mainImage: './images/cameras/digital-camera-33879_1280.png',
	// 		images: [],
	// 	},
	// 	{
	// 		oldPrice: '',
	// 		price: '160.25',
	// 		company: 'FUJIFILM',
	// 		attributes: ['Recomended'],
	// 		title: 'FUJIFILM Pro 3.7V',
	// 		mainImage: './images/cameras/christian-lambert-EXl7WUg9QNU-unsplash.jpg',
	// 		images: [],
	// 	},
	// 	{
	// 		oldPrice: '',
	// 		price: '79.99',
	// 		company: 'FUJIFILM',
	// 		attributes: ['High Performance'],
	// 		title: 'FUJIFILM NEXT II74B5.',
	// 		mainImage: './images/cameras/christian-lambert-z4gbqMunm5s-unsplash.jpg',
	// 		images: [],
	// 	},
	// 	{
	// 		oldPrice: '129.99',
	// 		price: '87.95',
	// 		company: 'KONOST',
	// 		attributes: ['Recomended'],
	// 		title: 'KONOST Evolution 4.5',
	// 		mainImage: './images/cameras/sharon-mccutcheon-EUVlsS39z2Q-unsplash.jpg',

	// 		images: [],
	// 	},
	// ];
	// setTimeout(f(cameras), 15);

	return;
}
