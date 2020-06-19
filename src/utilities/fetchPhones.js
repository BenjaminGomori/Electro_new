export default async function fetchPhones(f) {
	let host = location.hostname;
	let response = await fetch(
		'https://polar-hollows-32646.herokuapp.com/phones'
	);
	if (response.ok) {
		let res = await response.json();
		f(res.data);
	}

	return;
}
