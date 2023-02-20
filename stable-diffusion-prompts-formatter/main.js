const app = Vue.createApp({ // eslint-disable-line no-undef
  data () {
    return {
      inputPrompt: '',
      inputNegativePrompt: '',
      outputPrompt: '',
      outputNegativePrompt: '',
      list: {
        prompt: [],
        negativePrompt: []
      }
    };
  },
  methods: {
    addPromptToList (promptString, promptList) {
      if (promptString.trim() === '') {
        return;
      }
      for (const prompt of promptString.split(',')) {
        promptList.push(prompt.trim());
      }
    },
    removeValueOfArray (value, array) {
      array.splice(array.indexOf(value), 1);
    },
    copyPrompts (text) {
      navigator.clipboard.writeText(text);
    },
    getPrompts () {
      const positivePrompt = this.list.prompt.join(', ');
      const negativePrompt = this.list.negativePrompt.join(', ');
      let outputPrompts = '';
      if (positivePrompt !== '') {
        outputPrompts += `Positive prompts:\n${this.list.prompt.join(', ')}`;
        if (negativePrompt !== '') { outputPrompts += '\n\n' }
      }
      if (negativePrompt !== '') {
        outputPrompts += `Negative prompts:\n${this.list.negativePrompt.join(', ')}`;
      }
      return outputPrompts;
    }
  }
});

app.mount('#app');
