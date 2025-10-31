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
  // テキストメッセージの処理
  if (event.type === "message" && event.message.type === "text") {
    const receivedText = event.message.text;
    const replyToken = event.replyToken;

    if (receivedText === "トイレ") {
      const message = {
        type: "text",
        text: "現在地を送信してください",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "location",
                label: "現在地を送信",
              },
            },
          ],
        },
      };
      try {
        await client.replyMessage(replyToken, message);
      } catch (error) {
        console.error(error);
      }
      return;
    }

    const replyText = `あなたが送ったのは${receivedText}`;
    const message = {
      type: "text",
      text: replyText,
    };
    try {
      await client.replyMessage(replyToken, message);
    } catch (error) {
      console.error(error);
    }
  }
  // 位置情報メッセージの処理
  else if (event.type === "message" && event.message.type === "location") {
    const { latitude, longitude, address } = event.message;
    const replyToken = event.replyToken;

    const message = {
      type: "text",
      text: `位置情報を受信しました！\n緯度: ${latitude}\n経度: ${longitude}\n住所: ${
        address || "不明"
      }`,
    };

    try {
      await client.replyMessage(replyToken, message);
    } catch (error) {
      console.error(error);
    }
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
