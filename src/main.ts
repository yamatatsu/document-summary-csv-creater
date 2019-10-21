import * as core from "@actions/core"
import path from "path"
import fs from "fs"

const { PWD } = process.env

run()

async function run() {
  if (!PWD)
    throw new Error(
      "No process.env.PWD was found. This action can't run on windows.",
    )
  try {
    const dirPath = core.getInput("dirPath")
    console.log(`dirPath: ${dirPath}`)
    console.log(`dirname: ${__dirname}`)

    core.debug(dirPath)
    core.debug(__dirname)

    const rows = await Promise.all(
      fs
        .readdirSync(path.resolve(PWD, dirPath))
        .filter(s => s.endsWith(".md"))
        .map(async filePath => {
          const md = await readFilePromise(filePath)
          const title = getTitle(md)
          return toCsvRow([filePath, title])
        }),
    )

    const csv = [toCsvRow(["file", "title"])].concat(rows).join("\n")

    console.log(csv)
    core.debug(csv)
    core.setOutput("csv", csv)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function toCsvRow(arr: string[]): string {
  return arr
    .map(s => s.replace(/"/g, '""'))
    .map(s => `"${s}"`)
    .join(",")
}

function getTitle(md: string): string {
  const headers = md.match(/#+ .+/g)
  if (!headers) return ""
  const [title] = headers
    .map((h): [string, number | null] => [h, getHeaderLevel(h)])
    .reduce(([accH, accL], [h, l]) => {
      if (!l) return [accH, accL]
      return accL && accL >= l ? [accH, accL] : [h, l]
    })
  return title
}

function getHeaderLevel(str: string): number | null {
  const arr = str.match(/#/g)
  return (arr && arr.length) || null
}

function readFilePromise(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "UTF-8", (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
