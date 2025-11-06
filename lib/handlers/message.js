const { createTextMessage } = require("../messages/text");
const { client } = require("../client");

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

  if (text && text.trim() === "トイレ") {
    console.log("トイレ");
  }

  const replyMessage = createTextMessage(text, quoteToken);
  return client.replyMessage(event.replyToken, replyMessage);
};

module.exports = {
  handleMessageEvent,
  handleTextMessageEvent,
};
