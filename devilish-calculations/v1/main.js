const app = Vue.createApp({ // eslint-disable-line no-undef
  data () {
    return {
      quiz: {
        questions: [],
        answers: []
      },
      question: '', // 隨機生成，當下畫面上排顯示的題目
      bottomFormula: {
        question: '？？？＝',
        answer: '　'
      },
      result: '', // 'correct' 或 'incorrect'，表示答題判定結果
      rules: {
        backtrack: 2, // N 回溯
        timerAfterAnswer: 500, // 答題後切換到下一題前的等待時間（ms）
        timerShowingQuestion: 1000 // 開始遊戲時，顯示每個回溯題目的等待時間（ms）
      }
    };
  },
  methods: {
    randInt (min = 0, max) {
      // 包含 min，不包含 max
      return Math.floor(Math.random() * (max - min)) + min;
    },
    generateQuestion () {
      let ans = this.randInt(0, 10);
      let num1 = this.randInt(0, 10);
      let num2;
      let oprator;
      if (ans > num1) {
        oprator = '＋';
        num2 = ans - num1;
      } else {
        oprator = '－';
        num2 = num1 - ans;
      }
      num1 = this.toFullwidthNum(num1);
      num2 = this.toFullwidthNum(num2);
      ans = this.toFullwidthNum(ans);
      this.quiz.questions.push(`${num1}${oprator}${num2}`);
      this.quiz.answers.push(`${ans}`);
      this.question = `${num1}${oprator}${num2}＝`;
    },
    toFullwidthNum (nums) {
      return String(nums).replace(/\d/g, num => String.fromCharCode(num.charCodeAt(0) + 0xfee0));
    },
    paddingNum (num) {
      return num > 9 ? String(num) : `0${num}`;
    },
    onKeydown (event) {
      // 鍵盤輸入時觸發
      if (event.key.match(/\D/)) { return }
      // 輸入為數字鍵的話
      // 在換下一題之前暫時移除事件監聽器
      window.removeEventListener('keydown', this.onKeydown);
      const backtrackIndex = this.quiz.questions.length - 1 - this.rules.backtrack;
      // 改變狀態，順便改變 class
      this.result = this.toFullwidthNum(event.key) === this.quiz.answers[backtrackIndex] ? 'correct' : 'incorrect';
      this.bottomFormula.answer = this.toFullwidthNum(event.key);
      this.bottomFormula.question = `${this.quiz.questions[backtrackIndex]}＝`;
      setTimeout(() => {
        // 切換到下一題後
        this.result = '';
        this.bottomFormula.answer = '　';
        this.bottomFormula.question = '？？？＝';
        this.generateQuestion();
        window.addEventListener('keydown', this.onKeydown);
      }, this.rules.timerAfterAnswer);
    }
  },
  mounted () {
    for (let i = 0; i <= this.rules.backtrack; i++) {
      setTimeout(() => { this.generateQuestion() }, this.rules.timerShowingQuestion * i);
    }

    window.addEventListener('keydown', this.onKeydown);
  }
});

app.mount('main');
