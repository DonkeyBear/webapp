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
      score: {
        correct: 0,
        incorrect: 0
      },
      rules: {
        backtrack: 1, // N 回溯
        timerAfterAnswer: 500, // 答題後切換到下一題前的等待時間（ms）
        timerShowingQuestion: 1000, // 開始遊戲時，顯示每個回溯題目的等待時間（ms）
        unleashLimit: false
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
    resetRules () {
      this.rules.backtrack = 1;
      this.rules.timerAfterAnswer = 500;
      this.rules.timerShowingQuestion = 1000;
    },
    gameStart () {
      window.removeEventListener('keydown', this.onKeydown);
      this.quiz.questions = [];
      this.quiz.answers = [];
      this.score.correct = 0;
      this.score.incorrect = 0;
      const time = this.rules.timerShowingQuestion;
      for (let i = 0; i <= this.rules.backtrack; i++) {
        setTimeout(() => { this.generateQuestion() }, time * i);
      }
      // 在最後一次秀出題目時綁上事件監聽器
      setTimeout(() => { window.addEventListener('keydown', this.onKeydown) }, time * this.rules.backtrack);
    },
    simulateKeydown (keydown = '') {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: keydown }));
    },
    onKeydown (event) {
      // 鍵盤輸入時觸發
      if (event.key.toLowerCase() === 'enter') { this.gameStart() }
      // 輸入不為數字鍵或空白鍵則不做後續處理
      if (event.key.match(/\D/) && event.key !== ' ') { return }

      window.removeEventListener('keydown', this.onKeydown); // 在換下一題之前暫時移除事件監聽器

      // 改變狀態，順便改變 class
      const backtrackIndex = this.quiz.questions.length - 1 - this.rules.backtrack;
      if (this.toFullwidthNum(event.key) === this.quiz.answers[backtrackIndex]) {
        // 答對的情況
        this.result = 'correct';
        this.score.correct++;
      } else {
        // 答錯的情況
        this.result = 'incorrect';
        this.score.incorrect++;
      }
      // 如果跳過（空白鍵）的話顯示正確答案，其餘情況顯示輸入的數字
      this.bottomFormula.answer = event.key === ' ' ? this.quiz.answers[backtrackIndex] : this.toFullwidthNum(event.key);
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
    this.gameStart();
  }
});

app.mount('#app');
