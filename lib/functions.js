"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toCsvRow(arr) {
    return arr
        .map(s => s.replace(/"/g, '""'))
        .map(s => `"${s}"`)
        .join(",");
}
exports.toCsvRow = toCsvRow;
function getTitle(md) {
    const headers = md.match(/#+ .+/g);
    if (!headers)
        return "";
    const [title] = headers
        .map((h) => [getHeader(h), getHeaderLevel(h)])
        .reduce(([accH, accL], [h, l]) => {
        if (!l)
            return [accH, accL];
        return accL && accL <= l ? [accH, accL] : [h, l];
    });
    return title;
}
exports.getTitle = getTitle;
function getHeader(str) {
    const matched = str.match(/#+ (.+)/);
    if (!matched)
        return "";
    return matched[1];
}
function getHeaderLevel(str) {
    const arr = str.match(/#/g);
    return (arr && arr.length) || null;
}