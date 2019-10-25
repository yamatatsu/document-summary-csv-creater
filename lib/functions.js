"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toCsvRow(arr) {
    return arr
        .map(s => s.replace(/"/g, '""'))
        .map(s => `"${s}"`)
        .join(",");
}
exports.toCsvRow = toCsvRow;
/**
 * get string in markdown by keyword.\
 * suport syntax that;
 * ```
 * - foo
 *   - bar
 * ```
 * or
 * ```
 * foo: bar
 * ```
 */
exports.getKeywordValue = (md) => (keyword) => {
    return (
    /**
     * foo: bar
     */
    exports._getKeywordValue(md, new RegExp(`${keyword}[:：][ \t]*(.*)`)) ||
        /**
         * - foo
         *   - bar
         */
        exports._getKeywordValue(md, new RegExp(`- ${keyword}\n[ \t]*- (.*)`)));
};
exports._getKeywordValue = (md, regex) => {
    const value = md.match(regex);
    if (!value)
        return "";
    return value[1];
};
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
