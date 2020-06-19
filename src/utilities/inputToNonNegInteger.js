export default function inputToNonNegInteger(input, noZero = false) {
	if (!input || isNaN(input) || +input < 0) input = 1;
	//for decimal point values
	input = +input - (+input % 1);

	if (input === 0 && noZero) input = 1;

	return input;
}
