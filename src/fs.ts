import path from "path"
import fs from "fs"

export function getfilePaths(
  workspace: string,
  dirPath: string,
): [string, string][] {
  return fs
    .readdirSync(path.resolve(workspace, dirPath))
    .filter(s => s.endsWith(".md"))
    .map((fileName): [string, string] => [
      path.join(dirPath, fileName),
      path.resolve(workspace, dirPath, fileName),
    ])
}

export function readFilePromise(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "UTF-8", (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
