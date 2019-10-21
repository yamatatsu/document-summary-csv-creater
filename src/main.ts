import * as core from '@actions/core';
import path from 'path'

run();

async function run() {
  try {
    const path = core.getInput('path');
    console.log(`path: ${path}`)
    console.log(`dirname: ${__dirname}`)

    core.debug(path)

    core.setOutput('path', path);
  } catch (error) {
    core.setFailed(error.message);
  }
}
