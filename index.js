"use strict";
require("dotenv").config();

const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const app = express();

const client = new line.Client(config);

const handleEvent = async (event) => {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }
  const recievedText = event.message.text;
  const replyToken = event.replyToken;
  const replyText = `あなたが送ったのは${recievedText}`;
  const message = {
    type: "text",
    text: replyText,
  };
  try {
    await client.replyMessage(replyToken, message);
  } catch (error) {
    console.error(error);
  }
};

app.post("/webhook", line.middleware(config), (req, res) => {
  const events = req.body.events;
  Promise.all(events.map(handleEvent))
    .then(() => {
      res.json({ status: "ok" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "error" });
    });

  // ここで受信したイベント（メッセージなど）を処理するコードを後で追加
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
