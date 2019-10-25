"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("./fs");
const functions_1 = require("./functions");
const { GITHUB_WORKSPACE } = process.env;
run().catch(err => core.setFailed(err.message));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!GITHUB_WORKSPACE)
            throw new Error("No process.env.PWD was found. This action can't run on windows.");
        const dirPath = core.getInput("dirPath");
        const colmunsStr = core.getInput("colmuns");
        console.info(`dirPath: ${dirPath}, colmuns: ${colmunsStr}`);
        const colmuns = colmunsStr.split(",").map(s => s.trim());
        console.info(`colmuns: ${colmuns}`);
        const promises = fs_1.getfilePaths(path_1.default.resolve(GITHUB_WORKSPACE, dirPath)).map(([fileName, filePath]) => __awaiter(this, void 0, void 0, function* () {
            console.info(`fileName: ${fileName}`);
            const md = yield fs_1.readFilePromise(filePath);
            const values = colmuns.map(functions_1.getKeywordValue(md));
            return functions_1.toCsvRow([fileName, ...values]);
        }));
        const csv = [functions_1.toCsvRow(["file", ...colmuns])]
            .concat(yield Promise.all(promises))
            .join("\n");
        core.setOutput("csv", csv);
    });
}
