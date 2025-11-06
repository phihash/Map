const {
  createTextMessage,
  createQuickReplyMessage,
  askLocationMessage,
} = require("./message");
const { config } = require("./config");
const line = require("@line/bot-sdk");

const client = new line.Client(config); //今は参照されていませんが、Bot側からメッセージを送信するために必要です!
const handleEvent = async (event) => {
  if (event.type === "message") {
    return handleMessageEvent(event);
  } else if (event.type === "follow") {
    return client.replyMessage(event.replyToken, createQuickReplyMessage());
  } else {
    console.log("それ以外のイベントです");
    return Promise.resolve();
  }
};

const handleMessageEvent = async (event) => {
  switch (event.message.type) {
    case "text":
      return handleTextMessageEvent(event);
    case "location":
      return Promise.resolve();
    case "image":
    case "video":
    case "audio":
    case "file":
    case "sticker":
    default:
      console.log("未対応です");
      return Promise.resolve();
  }
};

const handleTextMessageEvent = async (event) => {
  const { quoteToken, text } = event.message;

  if (text && text.trim() == "トイレ") {
    console.log("トイレ");
  }

  const replyMessage = createTextMessage(text, quoteToken);

  return client.replyMessage(event.replyToken, replyMessage);
};

module.exports = {
  handleEvent,
  handleMessageEvent,
  handleTextMessageEvent,
};
