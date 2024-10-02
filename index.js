"use strict";
const fs = require("fs");
const path = require("path");

const openaiApiProcess = require("./lib/openai");

// chatGPTお試し(test)
// const message = "open AI とは?";
// const chatGpt = new openaiApiProcess(message);

// chatGpt.chat().then((res) => {
//   console.log(res);
// });

// 名刺画像ファイルのパスを指定（JPEGファイル）
const imagePath = path.join(__dirname, "./public/sample.jpg");

// 名刺画像をBase64形式に変換
const imageToBase64 = (filePath) => {
  try {
    // ファイルを同期的に読み込む
    const imageBuffer = fs.readFileSync(filePath);

    // バッファをBase64形式に変換
    const base64Image = imageBuffer.toString("base64");

    // data URLの形式で返す
    const base64DataUrl = `data:image/jpeg;base64,${base64Image}`;

    return base64DataUrl; // これをAPIリクエストに使用する
  } catch (error) {
    console.error("Error reading or converting image:", error);
    throw error;
  }
};

// Base64に変換した画像データ
const base64Image = imageToBase64(imagePath);

// 変換結果の確認
// console.log(base64Image);

//? 以降でAPIを呼び出しconsoleに結果出力
// const bisCardOCR = new openaiApiProcess(base64Image);
// bisCardOCR.vision().then((res) => {
//   console.log(res);
// });
