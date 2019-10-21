import * as core from '@actions/core';
import path from 'path'
import fs from 'fs'

run();

async function run() {
  try {
    const path = core.getInput('path');
    console.log(`path: ${path}`)
    console.log(`dirname: ${__dirname}`)

    core.debug(path)
    core.debug(__dirname)

    core.setOutput('path', path);
  } catch (error) {
    core.setFailed(error.message);
  }
}
