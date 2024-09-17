//let response = prompt('What is 4 + 6?');
//let response = prompt('What is ' + (Math.floor(Math.random() * 10) + 1) + ' + ' + (Math.floor(Math.random() * 10) + 1) + ' ? ');

// let num1 = Math.floor(Math.random() * 10) + 1;
// let num2 = Math.floor(Math.random() * 10) + 1;

// let response = prompt('What is ' + num1 + '+' + num2 + '?');

// let answer = num1 + num2;
// let feedback = '';
// if (response == answer) {
//     feedback = 'Correct!';
// } else if (response == answer - 1 || response == answer + 1) {
//     feedback = 'You were close!';
// } else {
//     feedback = 'Incorrect.';
// }

// alert(feedback + ' The expected answer is ' + answer);

// let age = prompt('How old are you?');
// if (age < 12) {
//     alert('Child');
// }
// if (age >= 12 && age < 18) {
//     alert('Teenager');
// }
// if (age >= 18) {
//     alert('Adult');
// }

// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Collect the response
    let response = form.elements['response'].value;

    if (response % 2 == 0) {
        alert('Your choice number is even');
    }
    if (response % 2 != 0) {
        alert('Your choice number is odd');
    }

    // Report the results
    results.innerHTML = 'You answered ' + response + '.';
});

//even numbers: remainder of 2 gives u 0, for odd numbers the remainder is not 0. use == 0 at the end