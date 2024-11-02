let jsPsych = initJsPsych();

let timeline = [];
// Generate a participant ID based on the current timestamp
let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

// Retrieve the query string from the URL
let queryString = new URLSearchParams(window.location.search);

// Extract the value for qualtricsId from the query string
let qualtricsId = queryString.get('qualtricsId');
console.log(qualtricsId);

// Persist the value for qualtricsId to your experiment data
jsPsych.data.addProperties({ qualtricsId: qualtricsId });


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

//jsPsych.run(timeline);

let images = ['clothed', 'nude'];
let imagesRandomized = initJsPsych().randomization.shuffle(images);

// let initialTrial = {
//     type: jsPsychHtmlButtonResponse,
//     stimulus: '<p>Click on the image you would like to look at first. You will be able to view the images as many times as you would like. </p>',
//     choices: imagesRandomized,
//     button_html:
//         (choice) => `<img src='paintings/${choice}painting.png'>`
// };
// timeline.push(initialTrial);

// let viewTrial = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: `
//     <p>You chose the below image.</p>`
//     //data: { collect: true },
//     //on_start: function () {

// };
// timeline.push(viewTrial);
// //jsPsych.run(timeline);

let conditionTrial1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p>Click on the image you would like to view. You will be able to view the image for as long as you would like.</p>
    `,
    choices: imagesRandomized,
    button_html: (choice) => `<button><img class= 'image-size' src="${choice}painting.png" alt="${choice}"></button>`,

    data: {
        collect: true,
        imageOrder: imagesRandomized
    },
    on_finish: function (data) {
        // Store imageOrder and imageSelected specific to this trial
        let lastTrialData = jsPsych.data.getLastTrialData().trials[0];
        let response = lastTrialData.response;
        let imageSelected = lastTrialData.imageOrder[response];
        data.imageSelected = imageSelected;
    }
}

timeline.push(conditionTrial1);

let viewTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        let lastTrialData = jsPsych.data.getLastTrialData().trials[0];
        let response = jsPsych.data.getLastTrialData().trials[0].response;
        let imageSelected = lastTrialData.imageOrder[response];
        return `
    <p>You chose the below image: </p>
        <img class= 'image-size2' src='${imageSelected}painting.png'>
<p>Press the SPACE key to go back to the previous screen</p>`
    },
    choices: [' '],
    data: {
        collect: false,
    },
};

timeline.push(viewTrial);

let conditionTrial2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p>Click on the image you would like to view. You will be able to view the image for as long as you would like.</p>
    `,
    choices: imagesRandomized,
    button_html: (choice) => `<button><img class= 'image-size' src="${choice}painting.png" alt="${choice}"></button>`,
    on_start: function (data) {
        // Store the image order again for the second condition
        data.imageOrder = imagesRandomized;
    },
    data: {
        imageOrder: imagesRandomized,
        collect: true
    },
    on_finish: function (data) {
        // Store imageOrder and imageSelected specific to this trial
        let lastTrialData = jsPsych.data.getLastTrialData().trials[0];
        let response = lastTrialData.response;
        let imageSelected = lastTrialData.imageOrder[response];
        data.imageSelected = imageSelected;
    }
}
timeline.push(conditionTrial2);

let viewTrial2 = {

    // Get the index of the button clicked
    //data.imageSelected = lastTrialData.response; // Access the stored image order
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        let lastTrialData = jsPsych.data.getLastTrialData().trials[0];
        //console.log(lastTrialData);
        //the above line works because it needed .trials[0] to tell it where to go. same for the below line.
        let response = jsPsych.data.getLastTrialData().trials[0].response;
        let image = lastTrialData.imageOrder[response];
        //this.data.imageSelected = image;
        return `
    <p>You chose the below image: </p>
    <img class= 'image-size2' src='${image}painting.png'>
<p>Press the SPACE key to go back to the previous screen</p>`
    },
    choices: [' '],
    data: {
        collect: false,
    },
};
timeline.push(viewTrial2);

let linkToQualtricsSurvey = `https://harvard.az1.qualtrics.com/jfe/form/SV_2f55Usaoi1o82jQ?experimentParticipantId=${participantId}`

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: [' '],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        <h1>Thank you!</h1> 
        <p>To complete your response, please follow <a href='${linkToQualtricsSurvey}'>this link</a> and complete the survey you see there. </p>
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
        let dataPipeExperimentId = 'hg4lGx4J7lW1';
        let forceOSFSave = false;
        let participantId = getCurrentTimestamp();
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            console.log(response);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);
jsPsych.run(timeline);




