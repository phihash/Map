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

const askLocationMessage = () => {
  return {
    type: "text",
    text: "近くのトイレを探します。位置情報を送ってください。",
    quickReply: {
      items: [
        {
          type: "action",
          action: { type: "location", label: "位置情報を送る" },
        },
      ],
    },
  };
};

module.exports = {
  createTextMessage,
  createQuickReplyMessage,
  askLocationMessage,
};
