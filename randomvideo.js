const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "randomvideo",
    aliases: ["anivid","animevid"],
    version: "1.0",
    author: "SiAM",
    countDown: 30,
    role: 0,
    shortDescription: "Get random anime video",
    longDescription: "bot will send you a random short anime video",
    category: "Anime",
    guide: "To use this command, simply type {pn}"
  },

  onStart: async function ({ api, args, message }) {
    try {
      const unsend = await message.reply(
      "Video is prosesing...⌛"
    );
      
      const response = await axios.get("https://apis.marinmain.repl.co/amv?apikey=siamxmarin77");
      const videoUrl = response.data.url;
      const Stream = await getStreamFromURL(videoUrl);
      
      
      message.reply({
        body: 'Random AMV generated ✨',
        attachment: Stream
      });
      message.unsend((await unsend).messageID);
      
    } catch (error) {
      console.error(error);
      message.reply(" error ");
    }
  }
};