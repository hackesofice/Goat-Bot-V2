const axios = require('axios');

module.exports = {
  config: {
    name: "test",
    version: "1.0",
    author: "OtinXSandip",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Text to Image",
    },
    longDescription: {
      en: "Text to image",
    },
    category: "image",
    guide: {
      en: "{pn} your prompt ",
    },
  },

  onStart: async function ({ message, args }) {
    const text = args.join(" ");
    if (!text) return message.reply("Please enter prompt");
    let prompt = text;
    message.reply("✅| Creating your Imagination...").then(info => {
      id = info.messageID;
    });

    try {
      const img = `https://milanbhandari.imageapi.repl.co/generateeee?prompt=${prompt}&model=&{model}`;
      const imageStream = await axios.get(img, { responseType: 'stream' });

      return message.reply({
        attachment: imageStream.data
      });
    } catch (error) {
      console.log(error);
      message.reply("Failed to create your imagination..", () => {
        message.unsend(id);
      });
    }
  },
};