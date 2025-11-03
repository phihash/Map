"use strict";
require("dotenv").config();

const axios = require("axios");
const express = require("express");
const line = require("@line/bot-sdk");
const overpass = "https://overpass-api.de/api/interpreter";

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new line.Client(config); //今は参照されていませんが、Bot側からメッセージを送信するために必要です!
const app = express();

const createTextMessage = (text, quoteToken) => {
  return {
    type: "text",
    text,
    ...(quoteToken ? { quoteToken } : {}),
  };
};

const createQuickReplyMessage = () => {
  return {
    type: "text",
    text: "クイックリプライ", //普通のメッセージ
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "location",
            label: "位置情報",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "トイレ", //見た目
            text: "トイレ", //実際に送られるテキスト
          },
        },
      ],
    },
  };
};

const handleEvent = async (event) => {
  if (event.type == "message") {
    return handleMessageEvent(event);
  } else if (event.type == "follow") {
    try {
      await client.replyMessage(event.replyToken, createQuickReplyMessage());
    } catch (error) {
      console.error(error);
    }
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
    case "location":
      console.log("位置情報です");
      break;
    case "image":
    case "video":
    case "audio":
    case "file":
    case "sticker":
      break;
    default:
      console.log("未対応です");
      break;
  }
};

const handleTextMessageEvent = async (event) => {
  const { quoteToken, text } = event.message;

  if (text == "トイレ") {
    console.log("トイレ");
  }

  const replyMessage = createTextMessage(text, quoteToken);
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
