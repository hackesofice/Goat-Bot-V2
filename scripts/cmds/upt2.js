const pidusage = require('pidusage');
const request = require('request');
const path = require('path');
const axios = require('axios');
const timeStart = Date.now();
const fs = require('fs-extra');
const moment = require("moment-timezone");
const { currentLoad, diskLayout } = require('systeminformation');
const { byte2mb } = module.exports;


module.exports = {
  config: {
    name: "upt2",
    aliases: [],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "uptime"
    },
    longDescription: {
      vi: "",
      en: "Sends system uptime about the bot along with an image."
    },
    category: "system",
    guide: {
      en: "{pn}"
    },
    dependencies: {
		"pidusage": ""
		}
  },
  
  byte2mb: function (bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
  },
  
  onStart: async ({ api, event, args, usersData, threadsData }) => {
    
    const time = process.uptime(),
      hours = Math.floor(time / (60 * 60)),
      minutes = Math.floor((time % (60 * 60)) / 60),
      seconds = Math.floor(time % 60);
    var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
    
    const timeNow = moment.tz("Asia/Mani").format("DD/MM/YYYY || HH:mm:ss");
    if (!fs.existsSync(__dirname + `/tad/Grandstander-Bold.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/Grandstander-Bold.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/Grandstander-Bold.ttf`, Buffer.from(getfont2, "utf-8"));
    }
    const { loadImage, createCanvas, registerFont } = require("canvas");

    let k = args[0];
    if (args[0] === "list") {
      const alime = (await axios.get('https://api-hthanh.thanhbaybi.repl.co/taoanhdep/list')).data;
      var count = alime.listAnime.length;
      var data = alime.listAnime;
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count / limit);
      var msg = ``;
      for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= count) break;
        msg += `[ ${i + 1} ] - ${data[i].ID} | ${data[i].name}\n`;
      }
      msg += `hmmm?`;
      return api.sendMessage(msg, event.threadID, event.messageID);
    }
    if (!k) {
      var id = Math.floor(Math.random() * 848) + 1;
    } else {
      var id = k;
    }
    const lengthchar = (await axios.get('https://run.mocky.io/v3/0dcc2ccb-b5bd-45e7-ab57-5dbf9db17864')).data;
    console.log(lengthchar.length);
    const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_115.png`;
    let pathAva = __dirname + `/tad/avatar_223.png`;
    let pathLine = __dirname + `/tad/avatar_343.png`;
    let pathIcon = __dirname + `/tad/avatar_3ds23c12311.png`;
    let pathIconIG = __dirname + `/tad/sssss.png`;
    let pathIcongithub = __dirname + `/tad/owo.png`;
    let icon3 = (await axios.get(encodeURI(`https://imgur.com/u8UU1cb.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathIcongithub, Buffer.from(icon3, "utf-8"));
    let icon = (await axios.get(encodeURI(`https://imgur.com/TEAVHvA.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathIcon, Buffer.from(icon, "utf-8"));
    let icon2 = (await axios.get(encodeURI(`https://imgur.com/pJnSU7m.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathIconIG, Buffer.from(icon2, "utf-8"));
    let avtAnime = (
      await axios.get(encodeURI(`${lengthchar[id].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
    let background = (await axios.get(encodeURI(`https://imgur.com/1QncZxH.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let line = (await axios.get(encodeURI(`https://imgur.com/1iWNkmi.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathLine, Buffer.from(line, "utf-8"));
          
    
    let a = await loadImage(pathAva);
    let a1 = await loadImage(pathImg);
    let a2 = await loadImage(pathLine);
    let g = await loadImage(pathIcon);
    let r = await loadImage(pathIconIG);
    let o = await loadImage(pathIcongithub);
    let canvas = createCanvas(a1.width, a1.height);
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(a1, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(a2, 2000, 200, a2.width, a2.height);
    ctx.drawImage(g, 800, 2500, 350, 350);
    ctx.drawImage(o, 1100, 2800, 550, 550);
    ctx.drawImage(r, 1600, 3350, 350, 350);
    ctx.drawImage(a, 4000, -590, 5300, 5300);
    Canvas.registerFont(__dirname + `/tad/Grandstander-Bold.ttf`, {
      family: "Grandstander"
    });

    ctx.textAlign = "center";
    ctx.font = "750px Grandstander";
    ctx.fillStyle = "#FFF";
    ctx.fillText("SANATNI BOT", canvas.width / 2 - 660, 1600);
    ctx.save();
    ctx.font = "350px Grandstander";
    ctx.fillStyle = "#000";
    ctx.fillText("SANATNI PROJECT", canvas.width / 2 - 660, 1000);
    ctx.fillText(`${z_1}:${x_1}:${y_1}`, canvas.width / 2 - 630, 2000);
    ctx.restore();
    ctx.save();
    ctx.textAlign = "start";
    ctx.font = "250px Grandstander";
    ctx.fillStyle = "#000";
    ctx.fillText("Hackersofice", 1200, 2750);
    ctx.fillStyle = "#FFF";
    ctx.fillText("hackersofice", 1600, 3150);
    ctx.fillStyle = "#000";
    ctx.fillText("hackersofice", 2000, 3600);
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
    
    const { currentLoad: load } = await currentLoad();
const diskLayoutInfo = await diskLayout();
const diskSizeBytes = diskLayoutInfo[0].size;
const diskSizeFormatted = module.exports.byte2mb(diskSizeBytes);
    
    return api.sendMessage({
      body: ` ==={HACKER'S ROBOT}===\nBot worked ${hours} hours ${minutes} minutes ${seconds} seconds\n\nTotal Users: ${allUsers.length}\nTotal Group : ${allThreads.length}\nCPU in use: ${load.toFixed(1)}%\nRam in use : ${diskSizeFormatted}\nPing: ${Date.now() - timeStart}ms\nCharacter ID: ${id}\n\n[ ${timeNow} ]`,
      attachment: fs.createReadStream(pathImg)
    },
      event.threadID,
      () => {
        fs.unlinkSync(pathImg);
        fs.unlinkSync(pathAva);
        fs.unlinkSync(pathLine);
        fs.unlinkSync(pathIconIG);
        fs.unlinkSync(pathIcongithub);
        fs.unlinkSync(pathIcon);
      },
      event.messageID
    );
  }
};