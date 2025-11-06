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

module.exports = { askLocationMessage };

