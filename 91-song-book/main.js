const app = Vue.createApp({
  data() {
    return {
      songsForShow: [], // 會顯示出來的曲目
      songs: [], // 全數曲目
      searchInput: ''
    };
  },
  methods: {
    readSongBook(e) {
      if (e.target.files[0] === undefined) { return }

      let reader = new FileReader();
      reader.readAsText(e.target.files[0], "UTF-8");
      reader.onload = event => {
        this.songsForShow = JSON.parse(event.target.result);
        this.songs = JSON.parse(event.target.result);
      }
    },
    searchByName() {
      let searchString = this.searchInput.toUpperCase();
      this.songsForShow = this.songs.filter(song => {
        return song.singer.toUpperCase().includes(searchString) || song.name.toUpperCase().includes(searchString);
      });
    },
    clearInput() {
      this.searchInput = "";
      this.searchByName();
    },
    shuffleArray(array) {
      // ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      let currentIndex = array.length, randomIndex;
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  }
});

app.mount("#app");

/**
 * 歌名
 * 歌手
 * 原調
 * 顏色標記
 * 備註
 * URL
 */