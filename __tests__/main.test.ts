import run from "../src/main"

const dirPaths = ["../sampleFiles"]
const colmuns = ["id", "owner", "expired_on"]
const log = () => {}

test("[run]", async () => {
  await expect(run(__dirname, dirPaths, colmuns, log)).resolves
    .toBe(`"file","id","owner","expired_on"
"../sampleFiles/collon.md","001_collon","foo","2030/10/25"
"../sampleFiles/large_collon.md","large_collon","foo","2030/10/25"
"../sampleFiles/list.md","002 list","bar","2029/10/25"`)
})
