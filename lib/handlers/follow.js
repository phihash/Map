const { createQuickReplyMessage } = require("../messages/quickReply");
const { client } = require("../client");

const handleFollowEvent = (event) => {
  return client.replyMessage(event.replyToken, createQuickReplyMessage());
};

module.exports = { handleFollowEvent };
