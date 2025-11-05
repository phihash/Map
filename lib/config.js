require("dotenv").config();
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const port = process.env.PORT || 3000;
module.exports = { config, port };
