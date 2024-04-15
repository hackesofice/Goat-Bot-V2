const axios = require('axios');

module.exports = {
  config: {
    name: "insta",
    aliases: ["insta"],
    version: "1.0",
    author: "\4c\45\41\52\4e\20\54\4f\20\45\41\54\20\4c\45\41\52\4e\20\54\4f\20\53\50\45\41\4b\20\42\55\54\20\44\4f\4e\\54\20\54\52\59\20\54\4f\20\43\48\41\4e\47\45\20\54\48\45\20\43\52\45\44\49\54\20",
    countDown: 30,
    role: 0,
    shortDescription: "download any video",
    longDescription: "download any video ",
    category: "MEDIA",
    guide: "{pn} {{<name>}}"
  },

  onStart: async function ({ message, args }) {
    const name = args.join(" ");
    if (!name)
      return message.reply(`enter your link senpai!`);
    else {
      const BASE_URL = `https://www.nguyenmanh.name.vn/api/igDL?url=${encodeURIComponent(name)}=&apikey=SyryTUZn`;

      await message.reply("Downloading....");

      try {
        let res = await axios.get(BASE_URL);

        let img = res.data.result.video[0].url;

        const form = {
          body: ``
        };
        
        if (img)
          form.attachment = await global.utils.getStreamFromURL(img);
        
        message.reply(form);  
      } catch (e) {
        message.reply(`🥺 Not Found`);
      }
    }
  }
};