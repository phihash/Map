const createTextMessage = (text, quoteToken) => {
  return {
    type: "text",
    text,
    ...(quoteToken ? { quoteToken } : {}),
  };
};

module.exports = { createTextMessage };

