"use strict";
require("dotenv").config();

const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new line.Client(config); //今は参照されていませんが、Bot側からメッセージを送信するために必要です!
const app = express();

const createReplyMessage = (text, quoteToken) => {
  return {
    type: "text",
    text,
    ...(quoteToken ? { quoteToken } : {}),
  };
};

const handleEvent = (event) => {
  if (event.type == "message") {
    return handleMessageEvent(event);
  } else {
    console.log("それ以外のイベントです");
  }
};

const handleMessageEvent = (event) => {
  console.log(event);
  switch (event.message.type) {
    case "text":
      handleTextMessageEvent(event);
      break;
    case "image":
      console.log("画像です");
      break;
    case "video":
      console.log("動画です");
      break;
    case "audio":
      console.log("音声です");
      break;
    case "file":
      console.log("ファイル送信です");
      break;
    case "location":
      console.log("位置情報です");
      break;
    case "sticker":
      console.log("スタンプです");
      break;
    default:
      console.log("未対応です");
      break;
  }
};

const handleTextMessageEvent = async (event) => {
  const { type, id, quoteToken, text } = event.message;
  const replyMessage = createReplyMessage(text, quoteToken);
  try {
    await client.replyMessage(event.replyToken, replyMessage);
  } catch (error) {
    console.error(error);
  }
};

app.post("/webhook", line.middleware(config), (req, res) => {
  //リクエストのうちeventsプロパティを代入
  const events = req.body.events;
  // eventsは複数のWebhookイベントオブジェクトを含む可能性があるので配列になっています。
  Promise.all(events.map(handleEvent))
    .then(() => {
      res.json({ status: "ok" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "error" });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
