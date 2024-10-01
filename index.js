require("dotenv").config();
const OpenAI = require("openai");
const openaiApiProcess = require("./lib/openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const message = "open AI とは?";

console.log(new openaiApiProcess(client, message).chat());
