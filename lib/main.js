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
const fs_1 = __importDefault(require("fs"));
const functions_1 = require("./functions");
const { GITHUB_WORKSPACE } = process.env;
run().catch(err => core.setFailed(err.message));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!GITHUB_WORKSPACE)
            throw new Error("No process.env.PWD was found. This action can't run on windows.");
        const dirPath = core.getInput("dirPath");
        console.info(`dirPath: ${dirPath}`);
        const fullPath = path_1.default.resolve(GITHUB_WORKSPACE, dirPath);
        const fileNames = fs_1.default.readdirSync(fullPath).filter(s => s.endsWith(".md"));
        console.info(`fileNames: ${JSON.stringify(fileNames, null, 2)}`);
        const rows = yield Promise.all(fileNames.map((fileName) => __awaiter(this, void 0, void 0, function* () {
            const md = yield readFilePromise(path_1.default.resolve(fullPath, fileName));
            const title = functions_1.getTitle(md);
            return functions_1.toCsvRow([fileName, title]);
        })));
        const csv = [functions_1.toCsvRow(["file", "title"])].concat(rows).join("\n");
        core.setOutput("csv", csv);
    });
}
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, "UTF-8", (err, data) => {
            if (err)
                return reject(err);
            resolve(data);
        });
    });
}
