"use strict";
require("dotenv").config();
const OpenAI = require("openai");

// const model = "gpt-3.5-turbo";
const model = "gpt-4o";
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

  // 名刺画像OCR
  async vision() {
    return await getCompletion(client, this.content);

    async function getCompletion(client, base64ImageUrl) {
      try {
        const completion = await client.chat.completions.create({
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: `名刺画像を文字認識してJSON形式で返却してください。

以下の詳細に従ってください。

- 名刺画像に含まれる情報を正確に認識し、分類する。
- 出力は以下のフィールドを含むJSON構造にしてください：
  - 名前 (Name)
  - 会社名 (Company)
  - 役職 (Title)
  - 電話番号 (Phone)
  - メールアドレス (Email)
  - 住所 (Address)
  
# Output Format

\`\`\`json
{
  "Name": "[名前]",
  "Company": "[会社名]",
  "Title": "[役職]",
  "Phone": "[電話番号]",
  "Email": "[メールアドレス]",
  "Address": "[住所]"
}
\`\`\`

# Examples

### Input
![Sample Business Card Image]

### Output
\`\`\`json
{
  "Name": "山田 太郎",
  "Company": "株式会社サンプル",
  "Title": "取締役",
  "Phone": "090-1234-5678",
  "Email": "taro.yamada@example.com",
  "Address": "東京都新宿区西新宿1-2-3"
}
\`\`\`

# Notes

- 異なるレイアウトや言語の場合にも対応できるよう、柔軟な情報抽出を心がけてください。
- OCR (Optical Character Recognition) を使用して文字認識を行い、その後適切なフィールドに分類してください。`},
                {
                  type: "image_url",
                  image_url: {
                    url: base64ImageUrl,
                  },
                },
              ],
            },
          ],
          model: model,
          response_format: { type: "json_object" },
        });

        return completion.choices[0].message.content;
      } catch (error) {
        throw error;
      }
    }
  }
}

module.exports = openaiApiProcess;
