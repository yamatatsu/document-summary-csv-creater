"use strict";
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
const main_1 = __importDefault(require("./main"));
const { GITHUB_WORKSPACE } = process.env;
if (!GITHUB_WORKSPACE)
    throw new Error("No process.env.PWD was found. This action can't run on windows.");
const dirPaths = core
    .getInput("dirPaths")
    .split(",")
    .map(s => s.trim());
core.info(`colmuns: ${dirPaths}`);
const colmuns = core
    .getInput("colmuns")
    .split(",")
    .map(s => s.trim());
core.info(`colmuns: ${colmuns}`);
main_1.default(GITHUB_WORKSPACE, dirPaths, colmuns, str => core.info(str))
    .then(csv => core.setOutput("csv", csv))
    .catch(err => core.setFailed(err.message));
