import * as core from "@actions/core"
import path from "path"
import fs from "fs"
import { toCsvRow, getTitle } from "./functions"

const { GITHUB_WORKSPACE } = process.env

run().catch(err => core.setFailed(err.message))

async function run() {
  if (!GITHUB_WORKSPACE)
    throw new Error(
      "No process.env.PWD was found. This action can't run on windows.",
    )

  const dirPath = core.getInput("dirPath")
  console.info(`dirPath: ${dirPath}`)

  const fullPath = path.resolve(GITHUB_WORKSPACE, dirPath)
  const fileNames = fs.readdirSync(fullPath).filter(s => s.endsWith(".md"))
  console.info(`fileNames: ${JSON.stringify(fileNames, null, 2)}`)

  const rows = await Promise.all(
    fileNames.map(async fileName => {
      const md = await readFilePromise(path.resolve(fullPath, fileName))
      const title = getTitle(md)
      return toCsvRow([fileName, title])
    }),
  )

  const csv = [toCsvRow(["file", "title"])].concat(rows).join("\n")

  core.setOutput("csv", csv)
}

function readFilePromise(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "UTF-8", (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
