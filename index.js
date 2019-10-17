const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const run = async () => {
  {
    const {stdout, stderr} = await exec('npm ci --only=prod', {
      cwd: path.join(__dirname)
    });
    console.log(stdout);
    if (stderr) {
      return Promise.reject(stderr);
    }
  }

  const mainTask = require('./src/index');
  mainTask();
};

run().catch(console.error);
