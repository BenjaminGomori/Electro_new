export default async function fetchCameras(f) {
	let host = location.hostname;
	let response = await fetch(
		'https://polar-hollows-32646.herokuapp.com/cameras'
	);
	if (response.ok) {
		let res = await response.json();
		f(res.data);
	}
}
