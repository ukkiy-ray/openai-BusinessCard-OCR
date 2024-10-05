"use strict";
const fs = require("fs");
const multer = require('multer');
const path = require("path");
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const openaiApiProcess = require("./lib/openai");

const app = express();
const server = createServer(app);


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// アップロードディレクトリの設定
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('ファイルがアップロードされていません');
  }
  console.log(req.file);
  const imageFile = req.file;
  const base64Image = imageToBase64(fs.readFileSync(imageFile.path));

  // openai apiを呼び出してOCR
  const bisCardOCR = new openaiApiProcess(base64Image);
  bisCardOCR.vision().then((ocrRes) => {
    console.log(ocrRes);
  });
  res.redirect('/');
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});


// 名刺画像をBase64形式に変換
const imageToBase64 = (inputImage) => {
  try {
    // バッファをBase64形式に変換
    const base64Image = inputImage.toString("base64");

    // MIMEタイプを判定
    const mimeType = determineMimeType(inputImage);

    // data URLの形式で返す
    const base64DataUrl = `data:${mimeType};base64,${base64Image}`;

    return base64DataUrl;
  } catch (error) {
    console.error("画像の変換中にエラーが発生しました:", error);
    throw error;
  }
};

// MIMEタイプを判定する関数
const determineMimeType = (buffer) => {
  const signature = buffer.toString('hex', 0, 4);
  switch (signature) {
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
      return 'image/jpeg';
    case '89504e47':
      return 'image/png';
    case '47494638':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
};