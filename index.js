"use strict";
const openaiApiProcess = require("./lib/openai");

const message = "open AI とは?";
const chatGpt = new openaiApiProcess(message);

chatGpt.chat().then((res) => {
  console.log(res);
});
