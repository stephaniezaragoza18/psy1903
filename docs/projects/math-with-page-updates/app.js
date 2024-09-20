let start = Date.now();
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
let correctAnswer = num1 + num2;


let form = document.getElementsByTagName('form')[0];
let feedback = document.getElementById('feedback');
let results = document.getElementById('results');

mathQuestion.innerHTML = 'What is ' + num1 + '+' + num2 + '?';

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Collect the response
    let response = form.elements['response'].value;
    let end = Date.now();
    let responseTime = (end - start) / 1000;

    if (response == correctAnswer) {
        feedback = '(Correct!)';
    } else {
        feedback = '(Incorrect.)';
    }

    // Report the results
    results.innerHTML = 'You answered ' + response + feedback + ' in ' + responseTime + ' seconds.'
    form.style.display = 'none';
});



