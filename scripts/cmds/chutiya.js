const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "chutiya",
		version: "0.00005",
		author: "ꕥؖؖؖؖؖꕹؖؖؖؖؖؖؖؖؖꕹؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖꗝ ꓧٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜꓥٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜꓚٜٜٜٜٜٜٜٜٜٜٜٜꓗٜٜٜٜٜٜٜٜꓰٜٜٜٜꓣٜ ꗝؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖؖꕹؖؖؖؖؖؖؖؖؖꕹؖؖؖؖؖꕥ",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Thêm, xóa, sửa quyền chutiya",
			en: "Add, remove, edit chutiyas"
		},
		longDescription: {
			vi: "Thêm, xóa, sửa quyền chutiya",
			en: "Add, remove, edit chutiyas"
		},
		category: "box chat",
		guide: {
			vi: '   {pn} [add | -a] <uid | @tag>: Thêm quyền chutiya cho người dùng'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Xóa quyền chutiya của người dùng'
				+ '\n	  {pn} [list | -l]: Liệt kê danh sách chutiya',
			en: '   {pn} [add | -a] <uid | @tag>: Add chutiya role for user'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Remove chutiya role of user'
				+ '\n	  {pn} [list | -l]: List all chutiyas'
		}
	},

	langs: {
		vi: {
			added: "✅ | Đã thêm quyền chutiya cho %1 người dùng:\n%2",
			alreadyChutiya: "\n⚠ | %1 người dùng đã có quyền chutiya từ trước rồi:\n%2",
			missingIdAdd: "⚠ | Vui lòng nhập ID hoặc tag người dùng muốn thêm quyền chutiya",
			removed: "✅ | Đã xóa quyền chutiya của %1 người dùng:\n%2",
			notChutiya: "⚠ | %1 người dùng không có quyền chutiya:\n%2",
			missingIdRemove: "⚠ | Vui lòng nhập ID hoặc tag người dùng muốn xóa quyền chutiya",
			listChutiya: "👑 | Danh sách chutiya:\n%1"
		},
		en: {
			added: "✅ | Added chutiya role for %1 users:\n%2",
			alreadyChutiya: "\n⚠ | %1 user already chutiya:\n%2",
			missingIdAdd: "⚠ | Please enter ID or tag user to add chutiyas",
			removed: "✅ | Removed chutiya of %1 users:\n%2",
			notChutiya: "⚠ | %1 user is not chutiya:\n%2",
			missingIdRemove: "⚠ | Please enter ID or tag user to remove chutiya:",
			listChutiya: "🖕🖕 | List of chutiyas:\n%1"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {
		switch (args[0]) {
			case "add":
			case "-a": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notChutiyaIds = [];
					const chutiyaIds = [];
					for (const uid of uids) {
						if (config.hiZadas.includes(uid))
							chutiyaIds.push(uid);
						else
							notChutiyaIds.push(uid);
					}

					config.hiZadas.push(...notChutiyaIds);
					const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(notChutiyaIds.length > 0 ? getLang("added", notChutiyaIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
						+ (chutiyaIds.length > 0 ? getLang("alreadyChutiya", chutiyaIds.length, chutiyaIds.map(uid => `• ${uid}`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdAdd"));
			}
			case "remove":
			case "-r": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions)[0];
					else
						uids = args.filter(arg => !isNaN(arg));
					const notChutiyaIds = [];
					const chutiyaIds = [];
					for (const uid of uids) {
						if (config.hiZadas.includes(uid))
							chutiyaIds.push(uid);
						else
							notChutiyaIds.push(uid);
					}
					for (const uid of chutiyaIds)
						config.hiZadas.splice(config.hiZadas.indexOf(uid), 1);
					const getNames = await Promise.all(chutiyaIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(chutiyaIds.length > 0 ? getLang("removed", chutiyaIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
						+ (notChutiyaIds.length > 0 ? getLang("notChutiya", notChutiyaIds.length, notChutiyaIds.map(uid => `• ${uid}`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdRemove"));
			}
			case "list":
			case "-l": {
				const getNames = await Promise.all(config.hiZadas.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
				return message.reply(getLang("listChutiya", getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")));
			}
			default:
				return message.SyntaxError();
		}
	}
};