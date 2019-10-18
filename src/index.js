const core = require('@actions/core');
const github = require('@actions/github');

module.exports = () => {
  try {
    {
      // test boolean input
      const testTrueInput1 = core.getInput('test-true-input1', {required: false}) || '';
      const testTrueInput2 = core.getInput('test-true-input2', {required: false}) || '';
      const testFalseInput1 = core.getInput('test-false-input1', {required: false}) || '';
      const testFalseInput2 = core.getInput('test-false-input2', {required: false}) || '';

      console.log(`testTrueInput1: ${testTrueInput1}`);
      console.log(`testTrueInput1 === true: ${testTrueInput1 === true}`);
      console.log(`testTrueInput1 === 'true': ${testTrueInput1 === 'true'}`);

      console.log(`testTrueInput2: ${testTrueInput2}`, testTrueInput2 === true);
      console.log(`testTrueInput2 === true: ${testTrueInput2 === true}`);
      console.log(`testTrueInput2 === 'true': ${testTrueInput2 === 'true'}`);

      console.log(`testFalseInput1: ${testFalseInput1}`, testFalseInput1 === false);
      console.log(`testFalseInput1 === false: ${testFalseInput1 === false}`);
      console.log(`testFalseInput1 === 'false': ${testFalseInput1 === 'false'}`);

      console.log(`testFalseInput2: ${testFalseInput2}`, testFalseInput2 === false);
      console.log(`testFalseInput2 === false: ${testFalseInput2 === false}`);
      console.log(`testFalseInput2 === 'false': ${testFalseInput2 === 'false'}`);
    }


    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet
      .replace(/['"]/g, '')
      .replace(/[\n\r]/g, ', ')}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};
