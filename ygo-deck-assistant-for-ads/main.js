let deckFileInput = document.getElementById("deck-file-input");
let deckTextInput = document.getElementById("deck-text-input");
let deckTextOutput = document.getElementById("deck-text-output");
let fileName, fileContentText;

window.onload = () => {
  toggleElements("hide", "#btn-convert .loading");
  let inputElms = [
    deckFileInput,
    deckTextInput,
    deckTextOutput
  ]
  for (let i of inputElms) {
    i.value = "";
  }
}

deckFileInput.onchange = () => {
  let reader = new FileReader();
  fileName = deckFileInput.files[0].name;
  reader.readAsText(deckFileInput.files[0], "UTF-8");
  reader.onload = evt => {
    fileContentText = evt.target.result;
    deckTextInput.value = fileContentText;
  }
}

document.getElementById("btn-convert").onclick = () => {
  toggleElements("show", "#btn-convert .loading");
  let newFileContentText = deckTextInput.value.split("\n");
  let cardsArray = [];
  for (let i of newFileContentText) {
    let cardId = Number(i.split("-")[0]);
    // Recognize the first part of the string is a number or not.
    if (!Number.isNaN(cardId)) {
      cardsArray.push(cardId);
    }
  }
  Promise.resolve(getCardNamesByIdList(cardsArray)).then(result => {
    let cardsDict = result;
    console.log(cardsDict);
    for (let i = 0; i < newFileContentText.length; i++) {
      let cardId = Number(newFileContentText[i].split("-")[0]);
      if (!Number.isNaN(cardId)) {
        newFileContentText[i] = newFileContentText[i].replace(cardId, `${String(cardId)} --${cardsDict[cardId]}`);
      }
    }
    deckTextOutput.value = newFileContentText.join("\n");
    toggleElements("hide", "#btn-convert .loading");
  })
}

function toggleElements(action, selector) {
  if (action === "show") {
    for (let i of document.querySelectorAll(selector)) {
      i.style.display = "";
    }
  } else if (action === "hide") {
    for (let i of document.querySelectorAll(selector)) {
      i.style.display = "none";
    }
  } else {
    console.log("toggleElements() with wrong action param.")
  }
}

function saveStaticDataToFile() {
  let blob = new Blob([fileContentText],
    { type: "text/plain;charset=utf-8" });
  // Change file name into "<OriginFileName>_new.<extension>"
  let fileNameSplit = fileName.split(".");
  fileNameSplit[fileNameSplit.length - 2] += "_new";
  saveAs(blob, fileNameSplit.join("."));
}