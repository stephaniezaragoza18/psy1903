let jsPsych = initJsPsych();
// Output the resulting conditions array to make sure it is set up correctly
// console.log(conditions);

// Welcome
let timeline = [];

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1>

    <p>In this experiment, you will be shown a series of math questions.</p>
    <p> There are three parts to this experiment; the questions will increase in difficulty with each part.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press SPACE to begin.</p>
    `,
};
timeline.push(welcomeTrial);
//jsPsych.run(timeline);

let firstTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Part One</h1>

    <p>Press SPACE to begin.</p>
    `,
};
timeline.push(firstTrial);
//jsPsych.run(timeline);


//Block One
blockConditions = jsPsych.randomization.repeat(conditions, 1);
for (let condition of conditions) {
    let Trial1 = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<h1>What is ${condition.num1} + ${condition.num2}?</h1>`,
        html: `<p><input type='text' name='answer' id="answer"></p>`,
        autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
        button_label: 'Submit Answer',
        data: {
            collect: true,
            blockId: "Part Two",
        },
        on_finish: function (data) {
            if (data.response.answer === condition.answer) {
                data.correct = true;
            } else {
                data.correct = false;
            }
            data.response = data.response.answer
            data.num1 = condition.num1
            data.num2 = condition.num2
            data.answer = condition.answer
        }
    }
    timeline.push(Trial1);
}


let secondTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Part Two</h1>

    <p>Press SPACE to begin.</p>
    `,
};
timeline.push(secondTrial);

//Block Two
blockConditions = jsPsych.randomization.repeat(conditions, 1);
for (let condition of conditions) {
    let Trial2 = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<h1>What is ${condition.num1} + ${condition.num2}?</h1>`,
        html: `<p><input type='text' name='answer' id="answer"></p>`,
        autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
        button_label: 'Submit Answer',
        data: {
            collect: true,
            blockId: "Part Two",
        },
        on_finish: function (data) {
            if (data.response.answer == condition.answer == true) {
                data.correct = true;
            } else {
                data.correct = false;
            }
            data.response = data.response.answer
            data.num1 = condition.num1
            data.num2 = condition.num2
            data.answer = condition.answer
        }
    }
    timeline.push(Trial2);
}

let thirdTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Part Three</h1>

    <p>Press SPACE to begin.</p>
    `,
};
timeline.push(thirdTrial);

//Block Three
blockConditions = jsPsych.randomization.repeat(conditions, 1);
for (let condition of conditions) {
    let Trial1 = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<h1>What is ${condition.num1} + ${condition.num2}?</h1>`,
        html: `<p><input type='text' name='answer' id="answer"></p>`,
        autofocus: 'answer', // id of the field we want to auto-focus on when the trial starts
        button_label: 'Submit Answer',
        data: {
            collect: true,
            blockId: "Part Three",
        },
        on_finish: function (data) {
            if (data.response.answer == condition.answer == true) {
                data.correct = true;
            } else {
                data.correct = false;
            }
            data.response = data.response.answer
            data.num1 = condition.num1
            data.num2 = condition.num2
            data.answer = condition.answer
        }
    }
    timeline.push(Trial1);
}

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);

jsPsych.run(timeline);





