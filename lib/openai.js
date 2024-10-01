"use strict";

const model = "gpt-3.5-turbo";
const maxTokens = 100;

class openaiApiProcess {
  constructor(client, content) {
    this.client = client;
    this.content = content;
  }

  chat() {
    return getCompletion(this.client, this.content);
    async function getCompletion(client, content) {
      try {
        const completion = await client.chat.completions.create({
          messages: [{ role: "user", content: content }],
          model: model,
          max_tokens: maxTokens,
        });

        console.log(completion.choices[0].message.content); // .contentにアクセス
      } catch (error) {
        console.error("Error fetching completion:", error);
      }
    }
  }
}

module.exports = openaiApiProcess;
