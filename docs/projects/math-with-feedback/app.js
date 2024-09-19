alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equation as quickly and accurately as possible.');
//Trial 1
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let start = Date.now();
let trial1 = prompt("What is " + num1 + '+' + num2 + '?');

let end = Date.now();
let responseTime = (end - start) / 1000;
console.log(trial1 + responseTime);
//alert('You answered ' + trial1 + ' in ' + responseTime + ' seconds');

let response1 = trial1;
let answer1 = num1 + num2;
let feedback1 = '';
if (response1 == answer1) {
    feedback1 = '(Correct!)';
} else {
    feedback1 = '(Incorrect.)';
}

alert('You answered ' + response1 + feedback1 + ' in ' + responseTime + ' seconds ');

//Trial2
num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;


start = Date.now();
let trial2 = prompt("What is " + num1 + '+' + num2 + '?');
end = Date.now();
let responseTime2 = (end - start) / 1000;
console.log(trial2 + responseTime);

let response2 = trial2;
let answer2 = num1 + num2;
let feedback2 = '';
if (response2 == answer2) {
    feedback2 = '(Correct!)';
} else {
    feedback2 = '(Incorrect.)';
}

alert('You answered ' + response2 + feedback2 + ' in ' + responseTime2 + ' seconds ');

//Trial 3
num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;


start = Date.now();
let trial3 = prompt("What is " + num1 + '+' + num2 + '?');
end = Date.now();
let responseTime3 = (end - start) / 1000;
console.log(trial2 + responseTime);

let response3 = trial3;
let answer3 = num1 + num2;
let feedback3 = '';
if (response3 == answer3) {
    feedback3 = '(Correct!)';
} else {
    feedback3 = '(Incorrect.)';
}

alert('You answered ' + response3 + feedback3 + ' in ' + responseTime3 + ' seconds ');
alert('Thank you for your participation!'); 
