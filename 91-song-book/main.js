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
    }
  }
});

/* const songBlock = Vue.createApp({
  data() {
    return {
    };
  },
  template: `
    <div v-for="song in songs" class="col">
      <div class="card h-100">
        <div class="card-body">
          <a href="#" class="stretched-link"></a>
          <h5 class="card-title mb-0">{{ song.name }}</h5>
          <small class="card-subtitle mb-2 text-muted">{{ song.singer }}</small>
          <p class="card-text">內文</p>
        </div>
      </div>
    </div>
  `
}); */

app.mount("#app");

/**
 * 歌名
 * 歌手
 * 原調
 * 顏色標記
 * 備註
 * URL
 */