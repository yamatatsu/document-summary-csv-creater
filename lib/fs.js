"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function getfilePaths(dirPath) {
    return fs_1.default
        .readdirSync(dirPath)
        .filter(s => s.endsWith(".md"))
        .map((fileName) => [
        fileName,
        path_1.default.resolve(dirPath, fileName),
    ]);
}
exports.getfilePaths = getfilePaths;
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, "UTF-8", (err, data) => {
            if (err)
                return reject(err);
            resolve(data);
        });
    });
}
exports.readFilePromise = readFilePromise;
