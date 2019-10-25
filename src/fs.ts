import path from "path"
import fs from "fs"

export function getfilePaths(dirPath: string): [string, string][] {
  return fs
    .readdirSync(dirPath)
    .filter(s => s.endsWith(".md"))
    .map((fileName): [string, string] => [
      fileName,
      path.resolve(dirPath, fileName),
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
