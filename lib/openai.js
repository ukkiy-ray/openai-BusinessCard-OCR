"use strict";
require("dotenv").config();
const OpenAI = require("openai");

const model = "gpt-3.5-turbo";
const maxTokens = 100;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

class openaiApiProcess {
  constructor(content) {
    this.content = content;
  }

  // chatGPT
  async chat() {
    return await getCompletion(client, this.content);

    async function getCompletion(client, content) {
      try {
        const completion = await client.chat.completions.create({
          messages: [{ role: "user", content: content }],
          model: model,
          max_tokens: maxTokens,
        });

        return completion.choices[0].message.content;
      } catch (error) {
        console.error("Error fetching completion:", error);
        throw error;
      }
    }
  }
}

module.exports = openaiApiProcess;
