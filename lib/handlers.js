const { handleMessageEvent } = require("./handlers/message");
const { handleFollowEvent } = require("./handlers/follow");
const handleEvent = async (event) => {
  if (event.type === "message") {
    return handleMessageEvent(event);
  } else if (event.type === "follow") {
    return handleFollowEvent(event);
  } else {
    console.log("それ以外のイベントです");
    return Promise.resolve();
  }
};

module.exports = {
  handleEvent,
};
