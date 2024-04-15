const allowedUsers = [
                         "100074940129987",
"",
"",
                         "",
                         "",
                         "",
                         "",
                         "",
                         "",
                         "",
                         "",                  
                     ];

const fs = require('fs');

module.exports = {
  config: {
    name: "004",
    version: "1.0",
    author: "Sandip",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "auto bot reply to your message",
    category: "no prefix",
  },
  
  onStart: async function () {},
 onChat: async function ({ event, message, getLang, api }) {
    if (allowedUsers.includes(event.senderID))
    {
      if (event.body.toLowerCase() !="")
      {
        const botReplies = [
              "7733RR!!! MMM44 KK000 KKUU770 W53333 (HHUUDVV44DUUU",
"77333R!!! 44MMM44 KK!! ((HU77 MM33 9HUU55 KK33 PU89 KH311UUU 54133 MM4DHRR(HH00DDD",
"7733R!!  (H007!! 5!5 K44 8H005D4 F4RR K333 98 R0D M3 8H3J DU D0 RUPY33 M3 54133 ♥🤓",
"7773333R!!!!  44MMMMM44   KK!!!! (HHUU77 MM33 9HUU55 KK33  H4999 DUUU  733RRR!!! 88H4NN MM33RR!!!  RRKH3111 H4!! 73R4 R!Y41 J!J4   HU 5513D413373R!! MM005!!! KK0 (H00DUU 733R!!!!88UU4 K4 888H00055D4 FRUUUU 54133 🤓♥", 
"T3R11 BAHN K1 KAL3 CH7T S33 BACH33 DAN1 N1KAL L7 BAB7 😉",
"S7RY4  😍😍9DI7Y¥>>0N___F4IR€€$°^°°°°M9 XHO0DT9 J9Y3G9 😀🖤3:) (y) \() D0S7 73R T3R111 AAMA K1111 XH77TT M33 BAS DAL D7 SAL3 RND1 K3 BXH3 😆",
"T33R111 MA K11 CH75 FA4A 4MD1 K1 A7LAD T3R1111 MMAAA K000 K7755AA BNNAA KK3333 CG000DAAA 🌀",
"T3R11 MA  ___ M3R1 RKH3L HA1 SAB MAN0 YA4 SACH1 M3 🦈🦈🥀🖤🦈",
"T3R1 M0S1 K1 B3T1 KA CH7T FARU SAL3 😗😎",
"🤤  T33R111 MA K11 CH75 FA4A 4MD1 K1 A7LAD T3R1111 MMAAA K000 K7755AA BNNAA KK3333 CG000DAAA 😀 ",
"T3R1 XH0T1 S1S KA BH0SDA F4U SAL3 RND11 K3 BXH3 😂",
"T3R1 MA M3R1 RKH3L HA1 SAB MAN0 YA4 SACH1 M3 T3R1 MA K0 RKH3L BNA K3 XH0DA HU MA1 SAL3 RND11 K1 AAULAD 😎",
"तेरी AAMA KA BHOSDA में बम लगा DU SALE RND1 KE BXHEE TERI AAMA KI BETI KO ME चोदा हु सेल 🖤", 
"😀ᴛᴇᴇʀʀɪɪɪ ᴍᴍᴍᴀ ᴋɪ ᴋᴀʟɪ ᴄʜᴜᴛ ᴍᴇ ᴀɢ ʟɢᴀ ᴋᴇ ʙʜᴀɢ ᴊᴀᴜ ᴍᴀᴅʀxʜᴏᴅ ᴛᴜ ʙᴀᴘ ꜱᴇ xᴘ xᴘ ᴋʜᴇʟɢᴀ ꜱꜱʟᴇᴇ ᴛᴇʀɪ ᴍᴍᴀ ᴋᴇᴇ xʜᴜᴛ ᴍᴇᴇ ʜᴀɢ ᴅᴜ ᴍᴀᴅʜʀxʜᴏᴅ ᴛᴇʀɪ ʙᴀʜɴ ᴋᴇ ᴄʜᴜᴛᴛ.ᴍᴇᴇ ᴀᴀᴘɴᴇᴇ ʙʜᴀɪ ᴋᴀ ʙᴅᴀ ꜱᴀ ʟᴏᴅᴀ ᴅᴀʟʟʟ के सो जाऊं ", 
"तेर1 बुआ क्यू कल1 छूट FARU SAL3 RND1 K3 BXH3 T3R1 BAHN KA BH0SDA FR4 SAL3 🤓 ",
"541133M4DHRR(H00DD🤓😁",
"हम आपके बाप है ऐसे बात नही।करते हैं अपने बाप से 😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂",
"😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂अगर आपकी आज्ञा हो तो हम आपकी दीदी के बुर में मूत सकते हैं😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂",
"b((✖.^) :) b( :) ;) :) :| :)(*^_^*) :| :) :| :) :| :) :| :) :| :) :| :) :| :) :|CPPPPP TATTTTRAAAAAAAAAAA                                                                             ",
"TEEERIII DAAAADIII KEEE BURRRR MEEEE MOOOT DUNGAAAA MADERCHOOOODDDDD :)(*^_^*) ;) :| :) ;) :) ;) :) ;) :) :P :) :P ;) :) @| <3 :P ;) @| :)(*^_^*) @| :) @| :) @| ;) :P :) @|(⊙＿⊙) :)(*^_^*) @| ;) :P :) @| :)(*^_^*) @| :",
"TEEERIII DAAAADIII KEEE BURRRR MEEEE MOOOT DUNGAAAA MADERCHOOOODDDDD :)(*^_^*) ;) :| :) ;) :) ;) :) ;) :) :P :) :P ;) :) @| <3 :P ;) @| :)(*^_^*) @| :) @| :) @| ;) :P :) @|(⊙＿⊙) :)(*^_^*) @| ;) :P :) @| :)(*^_^*) @| :) @|तेरी बुवा की चू त में मूत दूंगा 😂😂😂😂😂😂",
"तेरी बहन के बूब्स में मेरा स्पर्म डालूंगा😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂",
"🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐हम आपकी अम्मा में मुंह में अपना लं ड डाल कर हिलाना चाहते हैं कृपया उस रण्डी को हमारे सामने लाया जाए🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐🤐" ,
        "CUPP MADERCHOD HIZDEE",
        "LAND HAI TUUU SAGOOOR SIIKH BAAAP SE BAAAT KARNE KAAA ☝😂"];
            const randomIndex =  Math.floor(Math.random() * botReplies.length);
            api.sendMessage({
              body: botReplies[randomIndex],
              mentions: [{
                tag: event.senderID,
                id: event.senderID
              }]
            }, event.threadID);
           

        }
    }
  },

  onPresence: async function ({ event }) {},

  onLeave: async function ({ event }) {},

  onMessage: async function ({ event }) {},

  onStop: async function () {},
};