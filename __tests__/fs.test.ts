import { getfilePaths, readFilePromise } from "../src/fs"

test("[getfilePaths] get Array<[string, string]>", async () => {
  expect(typeof getfilePaths(__dirname + "/../sampleFiles")[0][0]).toBe(
    "string",
  )
  expect(typeof getfilePaths(__dirname + "/../sampleFiles")[0][1]).toBe(
    "string",
  )
})

test("[getfilePaths] filter not markdown", async () => {
  expect(getfilePaths(__dirname).length).toBe(0)
})

test("[readFilePromise]", async () => {
  expect(typeof (await readFilePromise(__dirname + "/fs.test.ts"))).toBe(
    "string",
  )
})
