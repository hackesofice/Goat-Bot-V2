const axios = require("axios");
const fs = require("fs");
const { getStreamFromURL } = global.utils;

const negativeWords = JSON.parse(fs.readFileSync("negative_words.json", "utf-8"));

module.exports = {
  config: {
    name: "t2i",
    aliases: [ "imagine", "im"],
    version: "2.0",
    author: "SiAM",
    countDown: 20,
    role: 0,
    shortDescription: "Create image from your text",
    longDescription: "Create image from your text",
    category: "info",
    guide: {
      en: "{pn} prompt\n\nExample:\n{pn} spiderman with purple suit\nReply with the image number (1, 2, 3, 4) to get the corresponding image in high resolution.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    /*const allowedThreadIds = ["6401920786595049", "9801459826538425", "6246523052061575"];
  const threadId = event.threadID;
  if (!allowedThreadIds.includes(threadId)) { 
    return message.reply("Imagine command is not allowed to use outside of support gc\n[ spam prevention] .\n\nIf you want to use the imagine command, please use it in the Marin support group.\n\nTo join the support group,\n\ntype:/Supportgc\n\nor join through the link:\n[ Marin AI Support Group]\n\n(https://m.me/j/AbZhVem8Pf7VA-A2/)");
    } */
    const argString = args.join(" ");
    const prompt = argString.trim();

    if (!prompt) {
      return message.reply("⚠️ Please enter a prompt.");
    }

    const isNegativePrompt = negativeWords.some((word) => prompt.toLowerCase().includes(word));
    if (isNegativePrompt) {
      return message.reply("❌ Negative prompt detected. Go to por*hub and search there. 🖕");
    }

    const unsend = await message.reply("Your imagination is processing. It may take up to 2 minutes. Please wait... 🤖");

    try {
      const response = await axios.get(`https://apis.marinmain.repl.co/t2i/v2`, {
        params: {
          prompt: encodeURIComponent(prompt),
          apikey: "siamxmarin77",
        },
      });

      if (response.status !== 200) {
        message.unsend((await unsend).messageID);
        return message.reply("❗ API not responding. Try again later.");
      }

      const jsonResponse = response.data;

      if (jsonResponse.response && jsonResponse.response.is_nsfw) {
        const nsfwData = jsonResponse.response;
        const nsfwMessage = `⚠️ NSFW detected in the image.🤔🔞\n\nNSFW Predictions:\nPorn: ${nsfwData.porn}\nSexual: ${nsfwData.sexy}\nHentai: ${nsfwData.hentai}\nDrawing: ${nsfwData.drawings}\nNeutral: ${nsfwData.neutral}\nDetected By: ${nsfwData.Detector}\n\ndude don't use 18+ prompt 🗿🥱`;

        message.unsend((await unsend).messageID);
        const nsfwReply = await message.reply(nsfwMessage);

        setTimeout(async () => {
          await message.unsend(nsfwReply.messageID);
        }, 300000);
      } else if (jsonResponse.response && jsonResponse.response.framedUrl) {
        const framedImageUrl = jsonResponse.response.framedUrl;
        const imageUrls = jsonResponse.response.imageUrls;

        message.unsend((await unsend).messageID);
        return message.reply({
          body: "Here's your imagination 🖼️.\nPlease reply with the image number (1, 2, 3, 4) to get the corresponding image in high resolution.",
          attachment: await getStreamFromURL(framedImageUrl),
        }, (error, sentMessage) => {
          if (!error) {
            global.GoatBot.onReply.set(sentMessage.messageID, {
              commandName: "t2i",
              author: event.senderID,
              messageID: sentMessage.messageID,
              imageUrls: imageUrls,
            });
          }
        });
      } else {
        message.unsend((await unsend).messageID);
        return message.reply("Err");
      }
    } catch (err) {
      message.unsend((await unsend).messageID);
      return message.reply("❗ Error occurred while making the request.");
    }
  },

  onReply: async function ({ event, message, api, Reply }) {
    try {
      const { author, messageID, imageUrls } = Reply;
      if (event.senderID !== author) return;

      const selectedNumber = parseInt(event.body);
      if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > Object.keys(imageUrls).length) {
        return message.reply("Invalid option selected. Please reply with a valid number (1-4). 😑");
      }

      api.unsendMessage(messageID);

      const selectedImageUrl = imageUrls[`image${selectedNumber}`];
      return message.reply({
        body: `Here's the HD image you requested 🖼️.\nDownload link:\n${selectedImageUrl}`,
        attachment: await getStreamFromURL(selectedImageUrl),
      });
    } catch (error) {
      console.log(error);
      return message.reply("Error occurred while processing the reply.");
    }
  },
};