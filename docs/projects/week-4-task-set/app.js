
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

// function getWordLengths() {
//     let wordlengths = [];
//     for (let i = 0; i < words.length; i++) {
//         wordlengths.push(words[i].length)
//     }
//     return wordlengths
// }
// let words = ['pink', 'purple', 'green', 'turquoise'];
// console.log(getWordLengths(words));

// function getLongestWord(words) {
//     let LongestWord = '';
//     for (let word of words) {
//         if (word.length > LongestWord.length) {
//             LongestWord = word;
//         }
//     }
//     return LongestWord
// }
// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getLongestWord(words));

// function getOddNumbers(numbers) {
//     let oddNumbers = [];
//     for (let number of numbers) {
//         if (number % 2 != 0) {
//             oddNumbers.push(number)
//         }
//     }
//     return oddNumbers
// }
// console.log(getOddNumbers([1, 2, 3, 4, 5]));

// function filterNumbers(numbers, evenOrOdd) {
//     let filterNumbers = [];
//     for (let number of numbers) {
//         if (evenOrOdd) {
//             if (number % 2 != 0) {
//                 filterNumbers.push(number)
//             }
//         } else
//             if (number % 2 == 0) {
//                 filterNumbers.push(number)
//             }
//     }
//     return filterNumbers
// }

// console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); //Expected output: [2, 4]
// console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); //Expected output: [1, 3, 5]

//Question 9
alert(`Welcome to the even/odd response time task.You are about to see a series of numbers. If the number you see is EVEN, type the letter "e". If the number you see is ODD, type the letter "o." Please answer as quickly and accurately as possible`);
let results = [];
for (let i = 0; i < 5; i++) {
    let num1 = Math.floor(Math.random() * 20) + 1;
    let start = Date.now();
    let response = prompt('Number:' + num1 + 'Type the letter "e" for EVEN. Type the letter "o" for ODD');
    let end = Date.now();
    let time = (end - start) / 1000; // Calculate response time in seconds
    let answer = num1
    let feedback;
    if (answer % 2 == 0) {
        feedback = 'true';
    } else {
        feedback = 'false';
    }
    results.push({
        Number: answer,
        response: response,
        correct: feedback,
        time: time
    });
}
alert('Thank you for your time.');
console.log(results);

