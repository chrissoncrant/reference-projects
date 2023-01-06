//Source: https://marvinh.dev/blog/speeding-up-javascript-ecosystem/

//This function avoids type conversion. Using the .toFixed method converts a number to a string. The function below uses basic math and the Math.round() method to avoid this.

//"precision" = number of decimal points

export default function toFixed(num, precision) {
	const pow = 10 ** precision;
	return Math.round(num * pow) / pow;
}