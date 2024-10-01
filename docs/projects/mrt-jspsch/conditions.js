// Initialize an empty array you will populate with your conditions
let conditions = [];

for (let i = 0; i < 3; i++) {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    let trial = {
        num1: num1,
        num2: num2,
        answer: num1 + num2
    }
    conditions.push(trial)

}

// Output the resulting conditions array to make sure it is set up correctly
console.log(conditions);

