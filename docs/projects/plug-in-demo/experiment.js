let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the HTML-button-response demo!</h1>

    <p>This a demo of the html-button-response plugin.</p>
    <p>Press SPACE to begin the first part.</p>
    `,
    choices: [' ']
};

timeline.push(welcomeTrial);
//jsPsych.run(timeline);

let images = ['clothed', 'nude']
let imagesRandomized = initJsPsych().randomization.repeat(images, 1);
let randomIndex = getRandomNumber(0, 1)
let image = images[randomIndex]

let initialTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p>Click on the image you would like to look at first. You will be able to view the images as many times as you would like. </p>',
    choices: imagesRandomized,
    button_html:
        (choice) => `<img src='paintings/${choice}painting.png'>`
};
timeline.push(initialTrial);

let viewTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>You chose the below image.</p>`
    //data: { collect: true },
    //on_start: function () {

}
//};

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'xGrIMXyGYhic';
        let forceOSFSave = false;
        let participantId = getCurrentTimestamp();
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })

    }
}
timeline.push(resultsTrial);

Debrief
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

