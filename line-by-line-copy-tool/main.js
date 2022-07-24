Vue.createApp({
  data() {
    return {
      mainTextarea: "Hello Vue!",
      mainSelect: [],
      buttonEdit: "編輯完畢",
      mainTextareaDisplay: "block",
      mainSelectDisplay: "none",
      btnDisabled: true
    }
  },
  methods: {
    switchMode() {
      if (this.buttonEdit === "編輯完畢") {
        this.mainSelect = this.mainTextarea.split("\n");
        this.mainTextareaDisplay = "none";
        this.mainSelectDisplay = "block";
        this.buttonEdit = "繼續編輯";
        this.btnDisabled = false;
        

      } else if (this.buttonEdit === "繼續編輯") {
        this.mainTextareaDisplay = "block";
        this.mainSelectDisplay = "none";
        this.buttonEdit = "編輯完畢";
        this.btnDisabled = true;
      }
    }
  }
}).mount('#app')