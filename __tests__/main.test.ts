import { toCsvRow, getTitle } from "../src/functions"

test("toCsvRow", async () => {
  const input = ['"foo"', "bar,"]
  expect(toCsvRow(input)).toBe('"""foo""","bar,"')
})

test("getTitle", async () => {
  const input = `## foo #bar`
  expect(getTitle(input)).toBe("foo #bar")
})

test("getTitle", async () => {
  const input = `
## foo
# bar`
  expect(getTitle(input)).toBe("bar")
})

test("getTitle", async () => {
  const input = `
# foo
# bar`
  expect(getTitle(input)).toBe("foo")
})

test("getTitle", async () => {
  const input = `
foo
bar`
  expect(getTitle(input)).toBe("")
})

test("getTitle", async () => {
  const input = `
### foo
## bar`
  expect(getTitle(input)).toBe("bar")
})
