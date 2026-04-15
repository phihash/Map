import "dotenv/config";
import express from "express";
import line from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new line.Client(config);
const app = express();

const handleList = (event) => {
  // TODO: 一覧取得・返信
  console.log("一覧", event.source.userId);
};

const handleAdd = (event) => {
  // TODO: 登録フロー開始
  console.log("追加", event.source.userId);
};

const handleDelete = (event) => {
  // TODO: 削除フロー開始
  console.log("削除", event.source.userId);
};

const handleEdit = (event) => {
  // TODO: 編集フロー開始
  console.log("編集", event.source.userId);
};

const commands = {
  "追加": handleAdd,
  "削除": handleDelete,
  "編集": handleEdit,
  "一覧": handleList,
};



app.post("/webhook", line.middleware(config), (req, res) => {
  // ここに色々かいていきます!
  const event = req.body.events[0];
  const text = event.message.text;
  const handler = commands[text];
  if (handler) {
    handler(event)
  }  else{
    console.log("コマンドがありません")
  }

  res.json({ status: "ok" });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
