import { toCsvRow, getTitle } from "../src/functions"

test("[toCsvRow]", async () => {
  const input = ['"foo"', "bar,"]
  expect(toCsvRow(input)).toBe('"""foo""","bar,"')
})

test("[getTitle] header has '#'", async () => {
  const input = `## foo #bar`
  expect(getTitle(input)).toBe("foo #bar")
})

test("[getTitle] header1 after header2", async () => {
  const input = `
## foo
# bar`
  expect(getTitle(input)).toBe("bar")
})

test("[getTitle] exists two header1s", async () => {
  const input = `
# foo
# bar`
  expect(getTitle(input)).toBe("foo")
})

test("[getTitle] no header", async () => {
  const input = `
foo
bar`
  expect(getTitle(input)).toBe("")
})

test("[getTitle] no header1", async () => {
  const input = `
### foo
## bar`
  expect(getTitle(input)).toBe("bar")
})
