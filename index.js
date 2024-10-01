require("dotenv").config();
const OpenAI = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function getCompletion() {
  try {
    const completion = await client.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content); // .contentにアクセス
  } catch (error) {
    console.error("Error fetching completion:", error);
  }
}

getCompletion(); // 関数を呼び出す
