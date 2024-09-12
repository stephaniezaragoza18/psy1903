let start = Date.now();
let trial1 = prompt('What is 2 + 2?');
console.log(trial1)
let end = Date.now();
let responseTime = (end - start) / 1000;
console.log(trial1 + responseTime);
alert('You answered ' + trial1 + ' in ' + responseTime + ' seconds');

start = Date.now();
let trial2 = prompt('What is 5 + 1?');
console.log(trial2);
end = Date.now();
responseTime = (end - start) / 1000;
console.log(trial2 + responseTime);
alert('You answered ' + trial2 + ' in ' + responseTime + ' seconds');

start = Date.now();
let trial3 = prompt('What is 1 + 1?');
console.log(trial3);
end = Date.now();
responseTime = (end - start) / 1000;
console.log(trial3 + responseTime);
alert('You answered ' + trial3 + ' in ' + responseTime + ' seconds');

alert("Thank you for your participation!");






