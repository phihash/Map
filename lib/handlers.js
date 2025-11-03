const {
  createTextMessage,
  createQuickReplyMessage,
  askLocationMessage,
} = require("./message");
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

  if (text && text.trim() == "トイレ") {
    console.log("トイレ");
  }

  const replyMessage = createTextMessage(text, quoteToken);
  try {
    await client.replyMessage(event.replyToken, replyMessage);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleEvent,
  handleMessageEvent,
  handleTextMessageEvent,
};
