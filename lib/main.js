"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("./fs");
const functions_1 = require("./functions");
function run(workspace, dirPaths, colmuns, log) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = dirPaths
            .map(dirPath => fs_1.getfilePaths(path_1.default.resolve(workspace, dirPath)))
            .reduce((acc, arr) => [...acc, ...arr], []) // flatten
            .map(([fileName, filePath]) => __awaiter(this, void 0, void 0, function* () {
            log(`fileName: ${fileName}`);
            const md = yield fs_1.readFilePromise(filePath);
            const values = colmuns.map(functions_1.getKeywordValue(md));
            return functions_1.toCsvRow([fileName, ...values]);
        }));
        const csv = [functions_1.toCsvRow(["file", ...colmuns])]
            .concat(yield Promise.all(promises))
            .join("\n");
        return csv;
    });
}
exports.default = run;
