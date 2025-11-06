const createQuickReplyMessage = () => {
  return {
    type: "text",
    text: "クイックリプライ",
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
            label: "トイレ",
            text: "トイレ",
          },
        },
      ],
    },
  };
};

module.exports = { createQuickReplyMessage };

