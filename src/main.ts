import { getfilePaths, readFilePromise } from "./fs"
import { toCsvRow, getKeywordValue } from "./functions"

export default async function run(
  workspace: string,
  dirPaths: string[],
  colmuns: string[],
  log: (str: string) => void,
) {
  const promises = dirPaths
    .map(dirPath => getfilePaths(workspace, dirPath))
    .reduce((acc, arr) => [...acc, ...arr], []) // flatten
    .map(
      async ([fileName, filePath]): Promise<string> => {
        log(`fileName: ${fileName}`)

        const md = await readFilePromise(filePath)
        const values = colmuns.map(getKeywordValue(md))
        return toCsvRow([fileName, ...values])
      },
    )

  const csv = [toCsvRow(["file", ...colmuns])]
    .concat(await Promise.all(promises))
    .join("\n")

  return csv
}
