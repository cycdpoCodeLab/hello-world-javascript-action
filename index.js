const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const run = async () => {
  // Logs
  const process_cwd = path.resolve(process.env['RUNNER_TEMP'] || process.cwd());
  const npmrcPath = path.resolve(process_cwd, '.npmrc');
  console.log(`.npmrc: ${npmrcPath}`);

  // Install Dependencies
  {
    const {stdout, stderr} = await exec('npm ci --only=prod', {
      cwd: process_cwd
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
