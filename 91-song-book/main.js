const appContainer = Vue.createApp({
  data() {
    return {
      songs: [
        {
          id: 1,
          name: "晴天",
          singer: "周杰倫"
        },
        {
          id: 2,
          name: "如果可以(月老)",
          singer: "韋禮安"
        },
        {
          id: 3,
          name: "愛人錯過",
          singer: "告五人"
        },
        {
          id: 4,
          name: "不是因為天氣晴朗才愛你",
          singer: "理想混蛋"
        },
        {
          id: 5,
          name: "稻香",
          singer: "周杰倫"
        },
        {
          id: 6,
          name: "Letting Go",
          singer: "蔡健雅"
        },
        {
          id: 7,
          name: "披星戴月的想你",
          singer: "告五人"
        },
        {
          id: 8,
          name: "刻在我心底的名字",
          singer: "盧廣仲"
        },
        {
          id: 9,
          name: "終究還是因為愛",
          singer: "TRASH樂團"
        },
        {
          id: 10,
          name: "First love",
          singer: "宇多田 ヒカル（宇多田光）"
        },
        {
          id: 11,
          name: "情非得已",
          singer: "庾澄慶"
        },
        {
          id: 12,
          name: "擱淺",
          singer: "周杰倫"
        },
        {
          id: 13,
          name: "永不失聯的愛",
          singer: "周興哲"
        },
        {
          id: 14,
          name: "魚",
          singer: "怕胖團"
        },
        {
          id: 15,
          name: "紅色高跟鞋",
          singer: "蔡健雅"
        },
        {
          id: 16,
          name: "Last Christmas",
          singer: "Taylor Swift(泰勒斯)"
        },
        {
          id: 17,
          name: "愛在夏天",
          singer: "告五人"
        },
        {
          id: 18,
          name: "下雨天",
          singer: "南拳媽媽"
        },
        {
          id: 19,
          name: "說好不哭",
          singer: "周杰倫"
        },
        {
          id: 20,
          name: "慢冷",
          singer: "梁靜茹"
        },
        {
          id: 21,
          name: "夜空中最亮的星",
          singer: "逃跑計劃"
        },
        {
          id: 22,
          name: "楓",
          singer: "周杰倫"
        },
        {
          id: 23,
          name: "愛我別走",
          singer: "張震嶽"
        },
        {
          id: 24,
          name: "愛你",
          singer: "陳芳語"
        },
        {
          id: 25,
          name: "捲菸",
          singer: "美秀集團"
        },
        {
          id: 26,
          name: "阿拉斯加海灣",
          singer: "菲道爾"
        },
        {
          id: 27,
          name: "嘉賓",
          singer: "張遠"
        },
        {
          id: 28,
          name: "好不容易(華燈初上)",
          singer: "告五人"
        },
        {
          id: 29,
          name: "聽見下雨的聲音",
          singer: "魏如昀"
        },
        {
          id: 30,
          name: "你好不好",
          singer: "周興哲"
        },
        {
          id: 31,
          name: "炙愛(女聲版)",
          singer: "陳忻玥"
        },
        {
          id: 32,
          name: "在這座城市遺失了你",
          singer: "告五人"
        },
        {
          id: 33,
          name: "可惜沒如果",
          singer: "林俊傑"
        },
        {
          id: 34,
          name: "以後別做朋友",
          singer: "周興哲"
        },
        {
          id: 35,
          name: "七里香",
          singer: "周杰倫"
        },
        {
          id: 36,
          name: "小手拉大手",
          singer: "梁靜茹"
        },
        {
          id: 37,
          name: "怎麼了",
          singer: "周興哲"
        },
        {
          id: 38,
          name: "安靜",
          singer: "周杰倫"
        },
        {
          id: 39,
          name: "小幸運",
          singer: "田馥甄"
        },
        {
          id: 40,
          name: "Love Yourself",
          singer: "Justin Bieber(小賈斯汀)"
        },
        {
          id: 41,
          name: "擁抱",
          singer: "五月天"
        },
        {
          id: 42,
          name: "心牆",
          singer: "郭靜"
        },
        {
          id: 43,
          name: "蒲公英的約定",
          singer: "周杰倫"
        },
        {
          id: 44,
          name: "修煉愛情",
          singer: "林俊傑"
        },
        {
          id: 45,
          name: "多遠都要在一起",
          singer: "鄧紫棋"
        },
        {
          id: 46,
          name: "突然好想你",
          singer: "五月天"
        },
        {
          id: 47,
          name: "那些你很冒險的夢",
          singer: "林俊傑"
        },
        {
          id: 48,
          name: "就忘了吧",
          singer: "WIFI歪歪"
        },
        {
          id: 49,
          name: "訣愛",
          singer: "詹雯婷"
        },
        {
          id: 50,
          name: "她說",
          singer: "林俊傑"
        },
        {
          id: 51,
          name: "水星記",
          singer: "郭頂"
        },
        {
          id: 52,
          name: "起風了",
          singer: "吳青峰"
        },
        {
          id: 53,
          name: "唯一",
          singer: "告五人"
        },
        {
          id: 54,
          name: "最後一堂課",
          singer: "周興哲"
        },
        {
          id: 55,
          name: "踮起腳尖愛",
          singer: "洪佩瑜"
        },
        {
          id: 56,
          name: "那些年",
          singer: "胡夏"
        },
        {
          id: 57,
          name: "我愛你",
          singer: "盧廣仲"
        },
        {
          id: 58,
          name: "想知道你在想什麼",
          singer: "周興哲"
        },
        {
          id: 59,
          name: "十年",
          singer: "陳奕迅"
        },
        {
          id: 60,
          name: "Mistletoe",
          singer: "Justin Bieber(小賈斯汀)"
        },
        {
          id: 61,
          name: "至少還有你",
          singer: "林憶蓮"
        },
        {
          id: 62,
          name: "我還年輕 我還年輕",
          singer: "老王樂隊"
        },
        {
          id: 63,
          name: "Without You",
          singer: "高爾宣 OSN"
        },
        {
          id: 64,
          name: "你不屬於我",
          singer: "周興哲"
        },
        {
          id: 65,
          name: "摯友",
          singer: "A-Lin(黃麗玲)"
        },
        {
          id: 66,
          name: "當你",
          singer: "王心凌"
        },
        {
          id: 67,
          name: "遇見",
          singer: "孫燕姿"
        },
        {
          id: 68,
          name: "藉口",
          singer: "周杰倫"
        },
        {
          id: 69,
          name: "知足",
          singer: "五月天"
        },
        {
          id: 70,
          name: "Crush On",
          singer: "李浩瑋"
        },
        {
          id: 71,
          name: "月旁月光",
          singer: "怕胖團"
        },
        {
          id: 72,
          name: "還是會",
          singer: "韋禮安"
        },
        {
          id: 73,
          name: "不能說的秘密",
          singer: "周杰倫"
        },
        {
          id: 74,
          name: "一路向北",
          singer: "周杰倫"
        },
        {
          id: 75,
          name: "Take Me Home Country Roads",
          singer: "John Denver"
        },
        {
          id: 76,
          name: "後來",
          singer: "劉若英"
        },
        {
          id: 77,
          name: "如果雨之後",
          singer: "周興哲"
        },
        {
          id: 78,
          name: "行星",
          singer: "理想混蛋"
        },
        {
          id: 79,
          name: "這世界那麼多人",
          singer: "莫文蔚"
        },
        {
          id: 80,
          name: "想了你6次",
          singer: "ADEN王淯騰"
        },
        {
          id: 81,
          name: "哪裡都是你",
          singer: "隊長"
        },
        {
          id: 82,
          name: "平安夜",
          singer: "聖誕特輯"
        },
        {
          id: 83,
          name: "最長的電影",
          singer: "周杰倫"
        },
        {
          id: 84,
          name: "Jingle Bells",
          singer: "聖誕特輯"
        },
        {
          id: 85,
          name: "等你下課",
          singer: "周杰倫"
        },
        {
          id: 86,
          name: "恰似你的溫柔",
          singer: "蔡琴"
        },
        {
          id: 87,
          name: "帶我去找夜生活",
          singer: "告五人"
        },
        {
          id: 88,
          name: "走建國路回家但後座少ㄌ泥",
          singer: "林鼎原"
        },
        {
          id: 89,
          name: "明明就",
          singer: "周杰倫"
        },
        {
          id: 90,
          name: "命運",
          singer: "家家"
        },
        {
          id: 91,
          name: "情歌",
          singer: "梁靜茹"
        },
        {
          id: 92,
          name: "雨愛",
          singer: "楊丞琳"
        },
        {
          id: 93,
          name: "Love Story",
          singer: "Taylor Swift(泰勒斯)"
        },
        {
          id: 94,
          name: "花海",
          singer: "周杰倫"
        },
        {
          id: 95,
          name: "匿名的好友",
          singer: "楊丞琳"
        },
        {
          id: 96,
          name: "愛情廢柴",
          singer: "周杰倫"
        },
        {
          id: 97,
          name: "魚仔(花甲男孩轉大人)",
          singer: "盧廣仲"
        },
        {
          id: 98,
          name: "誰",
          singer: "李友廷"
        },
        {
          id: 99,
          name: "嗜愛動物",
          singer: "麋先生"
        },
        {
          id: 100,
          name: "孤勇者(英雄聯盟：雙城之戰)",
          singer: "陳奕迅"
        }
      ]
    };
  }
});

appContainer.mount("#app-container");
