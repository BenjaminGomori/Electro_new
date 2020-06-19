export default async function fetchLaptops(f) {
	let host = location.hostname;
	let response = await fetch(
		'https://polar-hollows-32646.herokuapp.com/laptops'
	);

	if (response.ok) {
		let res = await response.json();
		f(res.data);
	}

	return;
}
