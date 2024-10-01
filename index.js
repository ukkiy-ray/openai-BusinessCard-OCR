"use strict";
const openaiApiProcess = require("./lib/openai");

const message = "open AI とは?";
console.log(new openaiApiProcess(message).chat());