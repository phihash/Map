"use strict";

const { config, port } = require("./lib/config");
const axios = require("axios");
const express = require("express");
const line = require("@line/bot-sdk");
const overpass = "https://overpass-api.de/api/interpreter";

const { handleEvent } = require("./lib/handlers");

const app = express();

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
