const app = Vue.createApp({
  data() {
    return {
      song: {
        name: "",
        singer: "",
        part: "part-none",
        key: "",
        play: "",
        capo: "",
        align: "text-start",
        theme: "theme-default",
        meta: ""
      },
      options: {
        parts: [
          { label: "無", value: "part-none", id: "options-parts-none" },
          { label: "男", value: "part-male", id: "options-parts-male" },
          { label: "女", value: "part-female", id: "options-parts-female" },
          { label: "合", value: "part-both", id: "options-parts-both" }
        ],
        aligns: [
          { label: "左", value: "text-start", id: "options-aligns-left" },
          { label: "中", value: "text-center", id: "options-aligns-center" },
          { label: "右", value: "text-end", id: "options-aligns-right" }
        ],
        themes: [
          { label: "預設", value: "theme-default" },
          { label: "深色", value: "theme-dark" }
        ]
      }
    }
  },
  methods: {
    generateMeta() {
      let metaString = "";
      if (this.song.singer.trim()) {
        metaString += `Singer：${this.song.singer}　/　`;
      }
      if (this.song.key.trim()) {
        metaString += `Key：${this.song.key}　/　`;
      }
      if (this.song.play.trim()) {
        metaString += `Play：${this.song.play}　/　`;
      }
      if (this.song.capo.trim()) {
        metaString += `Capo：${this.song.capo}　/　`;
      }
      this.song.meta = metaString.slice(0, -3);
    }
  }
});

app.mount("#app-container");