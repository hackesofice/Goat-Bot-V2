const num = 10 //number of times spam gets banned -1, for example 5 times 6 times will get banned
 const timee = 120 // During `timee` spam `num` times will be banned
 module.exports.config = {
  name: "spamban",
  version: "3.0",
countdown: 5,
  role: 0,
  author: "Ntkhang + OtinXShiva", 
  description: `automatically ban users if spambot ${num} times/${timee}s`,
  category: "System",
};

module.exports.onStart = async function ({api, event})  {
  return api.sendMessage(`Automatically ban users if spam ${num} times/${timee}s`, event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ Users, Threads, api, event})  {
  let { senderID, messageID, threadID } = event;
  var datathread = (await Threads.getData(event.threadID)).threadInfo;
  
  if (!global.client.autoban) global.client.autoban = {};
  
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };
  
  const threadSetting = global.data.threadData.get(threadID) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  if (!event.body || event.body.indexOf(prefix) != 0) return;
  
  if ((global.client.autoban[senderID].timeStart + (timee*1000)) <= Date.now()) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  }
  else {
    global.client.autoban[senderID].number++;
    if (global.client.autoban[senderID].number >= num) {
      var namethread = datathread.threadName;
      const moment = require("moment-timezone");
      const timeDate = moment.tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss");
      let dataUser = await Users.getData(senderID) || {};
      let data = dataUser.data || {};
      if (data && data.banned == true) return;
      data.banned = true;
      data.reason = `spam bot ${num} times/${timee}s` || null;
      data.dateAdded = timeDate;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      api.sendMessage(senderID + " \nâš¡ï¸�Name: " + dataUser.name + `\nâš¡Reason: spam bot ${num} times/${timee}s\n\nâœ”ï¸�Reported to admin bot`, threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`âš¡ï¸�Spam offenders ${num} láº§n/${timee}s\nâš¡ï¸�Name: ${dataUser.name} \nâš¡ï¸�ID: ${senderID}\nâš¡ï¸�ID Box: ${threadID} \nâš¡ï¸�NameBox: ${namethread} \nâš¡ï¸�Time: ${timeDate}`, 
          ad);
    }
    })
    }
  }
};