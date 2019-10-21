import * as core from "@actions/core"
import path from "path"
import fs from "fs"
import { toCsvRow, getTitle } from "./functions"

const { PWD } = process.env

run()

async function run() {
  if (!PWD)
    throw new Error(
      "No process.env.PWD was found. This action can't run on windows.",
    )
  try {
    const dirPath = core.getInput("dirPath")
    core.debug(`dirPath: ${dirPath}`)

    const filePaths = fs
      .readdirSync(path.resolve(PWD, dirPath))
      .filter(s => s.endsWith(".md"))
    core.debug(`filePaths: ${JSON.stringify(filePaths, null, 2)}`)

    const rows = await Promise.all(
      filePaths.map(async filePath => {
        const md = await readFilePromise(filePath)
        const title = getTitle(md)
        return toCsvRow([filePath, title])
      }),
    )

    const csv = [toCsvRow(["file", "title"])].concat(rows).join("\n")

    core.setOutput("csv", csv)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function readFilePromise(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "UTF-8", (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
