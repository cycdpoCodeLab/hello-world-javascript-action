const util = require('util');
const exec = util.promisify(require('child_process').exec);

const run = async () => {
  {
    // Log ls -l
    const {stdout, stderr} = await exec('npm ci --only=prod');
    console.log(stdout);
    if (stderr) {
      return Promise.reject(stderr);
    }
  }

  const mainTask = require('./src/index');
  mainTask();
};

run().catch(console.error);
