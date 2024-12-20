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
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
};
timeline.push(welcomeTrial);

//likert-scale questionnaire
var likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

var questionnaire = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", name: 'prompt1', labels: likert_scale },
        { prompt: "I find math easy.", name: 'prompt2', labels: likert_scale },
    ],
    randomize_question_order: true
};
timeline.push(questionnaire);


for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>${block.title}</h1>
        Press space to begin.`,
        choices: [' ']
    }
    timeline.push(blockIntroTrial);

    for (let question of block.questions) {

        let questionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p>What is <span class='equation'> ${question.num1}</span> + <span class='equation'>${question.num2}</span>?</p>`,
            html: `<input name='responseInput' id='response' type='text'>`,
            autofocus: 'response',
            button_label: 'Submit Answer',
            data: {
                collect: true,
            },
            on_finish: function (data) {
                data.block = block.title;
                data.response = data.response.responseInput;
                data.correct = question.answer == data.response;
                data.num1 = question.num1;
                data.num2 = question.num2;
                data.answer = question.answer;
            }
        }
        timeline.push(questionTrial);
    }
}

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'mrt';
        let dataPipeExperimentId = 'hg4lGx4J7lW1';
        let forceOSFSave = true;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);


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





