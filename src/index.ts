import * as core from "@actions/core"
import run from "./main"

const { GITHUB_WORKSPACE } = process.env
if (!GITHUB_WORKSPACE)
  throw new Error(
    "No process.env.PWD was found. This action can't run on windows.",
  )

const dirPaths = core
  .getInput("dirPaths")
  .split(",")
  .map(s => s.trim())
core.info(`colmuns: ${dirPaths}`)

const colmuns = core
  .getInput("colmuns")
  .split(",")
  .map(s => s.trim())
core.info(`colmuns: ${colmuns}`)

run(GITHUB_WORKSPACE, dirPaths, colmuns, str => core.info(str))
  .then(csv => core.setOutput("csv", csv))
  .catch(err => core.setFailed(err.message))
