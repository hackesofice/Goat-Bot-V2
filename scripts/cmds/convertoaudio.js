const fs = require("fs");
module.exports = {
  config: {
    name: "convertoaudio",
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "tools",
    longDescription: "Reply with any video and Marin will convert the video to audio 🤖",
    category: "converter",
    guide: {
      en: "{pn} reply to video"
    },
  },
  onStart: async function ({ api, event, args, message }) {

		            const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    
    
    try {
      const axios = require("axios");
      const fs = require("fs-extra");
      const request = require("request");
      
      if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
        api.sendMessage("Please reply with a video.", event.threadID, event.messageID);
        return;
      }

      const att = event.messageReply.attachments[0];
      if (att.type !== "video") {
        api.sendMessage("The reply content must be a video 🙄🫵", event.threadID, event.messageID);
        return;
      }

      const { data } = await axios.get(att.url, { method: 'GET', responseType: 'arraybuffer' });
      fs.writeFileSync(__dirname + "/assets/vdtoau.m4a", Buffer.from(data, 'utf-8'));

      const audioReadStream = fs.createReadStream(__dirname + "/assets/vdtoau.m4a");
      const msg = { body: "", attachment: [audioReadStream] };
      api.sendMessage(msg, event.threadID, event.messageID);
    } catch (e) {
      console.log(e);
    }
  },
};