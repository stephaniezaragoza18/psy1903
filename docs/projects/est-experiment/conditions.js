// Modify the following words array with your own words
// There should be 10 words per block, with the exception of neutral where you should have double (20)
// In our example, emotionA is "calm" and emotionB is "scary"
let words = {
    practice: ['jacket', 'blanket', 'cushion', 'journal', 'village', 'balloon', 'airport', 'helmet', 'caramel', 'picture'],
    neutral: ['cabinet', 'lantern', 'ceiling', 'printer', 'monitor', 'bicycle', 'laundry', 'uniform', 'sandbox', 'plastic', 'highway', 'receipt', 'diamond', 'battery', 'curtain', 'library', 'elevator', 'stadium', 'holiday', 'machine'],
    emotionA: ['insecurity', 'doubtful', 'struggle', 'setback', 'weaknes', 'defeat', 'disappoint', 'downfall', 'mistake', 'frustrate'],
    emotionB: ['confidence', 'progress', 'superior', 'champion', 'victory', 'flourish', 'mastery', 'conquer', 'winner', 'glorious'],
};

// Your final experiment should show 36 words per block 
// when developing your experiment you can reduce this number 
// to expedite the process of testing the experiment
let count = 36;

// The following code will process the above information into a `conditions` array you 
// can use to structure your experiment. 
// 
// !! DO NOT MODIFY ANY OF THE FOLLOWING CODE !!
// 
let conditions = generateConditions();
console.log(conditions);

function generateConditions() {

    // jsPsych is needed for randomization functionality
    let jsPsych = initJsPsych();

    // Initialize our empty array of conditions
    let conditions = [];

    // Create an array of blocks where 'practice' is always first, followed by 'emotionA' and 'emotionB' in random order
    let blocks = ['practice'].concat(shuffle(['emotionA', 'emotionB']));

    // Calculate how many neutral words we’ll need
    // count = number of trials needed
    // we divide this in half because we only need half neutral words in each block
    // and we multiple it by 3 because there are three blocks (practice, emotionA, emotionB)
    let wordsNeeded = (count / 2) * 3;

    // Create a shuffled pool of neutral words with enough words to cover all trials
    repeat = Math.ceil(wordsNeeded / words['neutral'].length);
    let neutralWords = jsPsych.randomization.repeat(words['neutral'], repeat);

    // Create a shuffled pool of colors with enough colors to cover all trials
    // Note: Not using shuffleNoRepeats colors because it is okay to have repeat colors in a row
    let colors = ['red', 'green', 'blue'];
    repeat = Math.ceil(count / colors.length * 3);
    colors = jsPsych.randomization.repeat(colors, repeat);

    // Loop through our blocks, generating trial data
    for (let block of blocks) {

        // Create a shuffled pool of emotion words with enough words to cover all trials
        repeat = Math.ceil((count / 2) / words[block].length);
        let emotionWords = jsPsych.randomization.repeat(words[block], repeat);
        emotionWords = emotionWords.splice(0, count / 2);

        // Take a splice of neutral words and join them with the emotion words
        let theseNeutralWords = neutralWords.splice(0, count / 2);
        let wordPool = theseNeutralWords.concat(emotionWords);

        // Shuffle the word pool using shuffleNoRepeats which makes sure we don't get two of the same words in a row
        wordPool = jsPsych.randomization.shuffleNoRepeats(wordPool);

        // Generate trials
        let trials = [];
        for (let i = 0; i < count; i++) {
            let word = wordPool[i];
            let color = colors.pop();
            trials.push({
                word: word,
                valence: getValence(word),
                color: color,
                expectedResponse: color[0]
            })
        }

        // Push to conditions
        conditions.push({
            block: block,
            trials: shuffle(trials),
        });
    }

    return conditions;
}



/**
* The following are miscellaneous array functions utilized in the above code
*/
// Utility function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Utility function to get the valence of a word
function getValence(word) {
    if (words['practice'].includes(word) || words['neutral'].includes(word)) {
        return 'neutral';
    } else if (words['emotionA'].includes(word)) {
        return 'emotionA';
    } else {
        return 'emotionB';
    }
}