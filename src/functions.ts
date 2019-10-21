export function toCsvRow(arr: string[]): string {
  return arr
    .map(s => s.replace(/"/g, '""'))
    .map(s => `"${s}"`)
    .join(",")
}

export function getTitle(md: string): string {
  const headers = md.match(/#+ .+/g)
  if (!headers) return ""
  const [title] = headers
    .map((h): [string, number | null] => [getHeader(h), getHeaderLevel(h)])
    .reduce(([accH, accL], [h, l]) => {
      if (!l) return [accH, accL]
      return accL && accL <= l ? [accH, accL] : [h, l]
    })
  return title
}

function getHeader(str: string): string {
  const matched = str.match(/#+ (.+)/)
  if (!matched) return ""
  return matched[1]
}

function getHeaderLevel(str: string): number | null {
  const arr = str.match(/#/g)
  return (arr && arr.length) || null
}
