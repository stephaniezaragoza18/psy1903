// function celsiusToFahrenheit(celsius) {
//     let fahrenheit = (celsius * 1.8) + 32;
//     return fahrenheit;
// }
// console.log(celsiusToFahrenheit(10))
// let celsius = celsiusToFahrenheit(10);
// console.log(celsius)

// function calculateTemperature(temp, convertTo) {
//     if (convertTo == 'c') {
//         return (temp - 32) / 1.8;
//     } else {
//         return (temp * 1.8) + 32;
//     }
// }
// console.log(calculateTemperature(10, 'c'));
// console.log(calculateTemperature(10, 'f'));

//Question 5
// let words = ['pink', 'purple', 'green', 'turquoise'];

// for (let word of words) {
//     console.log(word.length); //Expected Output [4, 6, 5, 9]
// }

function getWordLengths() {
    let wordlengths = [];
    for (let i = 0; i < words.length; i++) {
        wordlengths.push(words[i].length)
    }
    return wordlengths
}
let words = ['pink', 'purple', 'green', 'turquoise'];
console.log(getWordLengths(words));
