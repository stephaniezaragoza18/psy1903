// function celsiusToFahrenheit(celsius) {
//     let fahrenheit = (celsius * 1.8) + 32;
//     return fahrenheit;
// }
// console.log(celsiusToFahrenheit(10))
// let celsius = celsiusToFahrenheit(10);
// console.log(celsius)

function calculateTemperature(temp, convertTo) {
    if (convertTo == 'c') {
        return (temp - 32) / 1.8;
    } else {
        return (temp * 1.8) + 32;
    }
}
console.log(calculateTemperature(10, 'c'));
console.log(calculateTemperature(10, 'f'));

