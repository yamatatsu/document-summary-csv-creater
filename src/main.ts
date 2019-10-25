import * as core from "@actions/core"
import path from "path"
import { getfilePaths, readFilePromise } from "./fs"
import { toCsvRow, getKeywordValue } from "./functions"

const { GITHUB_WORKSPACE } = process.env

run().catch(err => core.setFailed(err.message))

async function run() {
  if (!GITHUB_WORKSPACE)
    throw new Error(
      "No process.env.PWD was found. This action can't run on windows.",
    )

  const dirPath = core.getInput("dirPath")
  const colmunsStr = core.getInput("colmuns")
  console.info(`dirPath: ${dirPath}, colmuns: ${colmunsStr}`)

  const colmuns = colmunsStr.split(",").map(s => s.trim())
  console.info(`colmuns: ${colmuns}`)

  const promises = getfilePaths(path.resolve(GITHUB_WORKSPACE, dirPath)).map(
    async ([fileName, filePath]): Promise<string> => {
      console.info(`fileName: ${fileName}`)

      const md = await readFilePromise(filePath)
      const values = colmuns.map(getKeywordValue(md))
      return toCsvRow([fileName, ...values])
    },
  )

  const csv = [toCsvRow(["file", ...colmuns])]
    .concat(await Promise.all(promises))
    .join("\n")

  core.setOutput("csv", csv)
}
