var app = new Vue({
	el: '#app',
	data() {
		return {
			messageList: [],
			inputBox: '',
			botNick: '赤岛酱',
			thesaurus: '',
			botAvatar: 'C.png',
			myAvatar: 'A.jpg'
		}

	},
	methods: {
		getThesaurus: function() {
			axios.get('https://raw.githubusercontent.com/Kyomotoi/AnimeThesaurus/main/data.json')
				.then((response) => this.thesaurus = response.data)
		},
		send: function() {
			this.messageList.push({
				nick: '你',
				msg: this.inputBox,
				direction: 'cright',
				avatar: this.myAvatar
			});
			var words = [],
				reply = '';
			for (obj in this.thesaurus) {
				if (this.inputBox.indexOf(obj) != -1) {
					words.push(obj);
				}
			}

			if (words.length != 0) {
				word = words[Math.floor(Math.random() * words.length)];
				list = this.thesaurus[word];
			} else {
				list = ["唔，没有搞懂主人在说什么诶", "没有听懂qwq", "虽然不知道在说什么，但感觉很厉害的样子~", "我是不是太笨啦，没理解主人什么意思qaq"]
			}
			reply = list[Math.floor(Math.random() * list.length)];
			this.messageList.push({
				nick: this.botNick,
				msg: reply,
				direction: 'cleft',
				avatar: this.botAvatar
			});
			setTimeout(() => {
				var div = document.getElementsByClassName('el-main')[0];
				div.scrollTop = div.scrollHeight;
				this.inputBox = '';
			}, 100)
		}
	},
	created: function() {
		this.getThesaurus();
		this.messageList.push({
			nick: this.botNick,
			msg: '你是我的master嘛?',
			direction: 'cleft',
			avatar: this.botAvatar
		});
	}
});
