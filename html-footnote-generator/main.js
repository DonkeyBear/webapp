const getInput = document.getElementById("input");
const getOutputNote = document.getElementById("output-note");
const getOutputFootnote = document.getElementById("output-footnote");

function run() {
  let inputValue = getInput.value.trim();

  if (inputValue == "") {
    return;
  }
  
  getOutputNote.value = "<sup><a id=\"note-" + inputValue + "\" href=\"#footnote-" + inputValue + "\">[" + inputValue + "]</a></sup>";
  getOutputFootnote.value = "<a id=\"footnote-" + inputValue + "\" href=\"#note-" + inputValue + "\">^</a>";
}

function clearAll() {
  getInput.value = "";
  getOutputNote.value = "";
  getOutputFootnote.value = "";
}