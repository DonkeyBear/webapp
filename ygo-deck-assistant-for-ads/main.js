let inputElms = {
  deckFileInput: document.getElementById("deck-file-input"),
  deckTextInput: document.getElementById("deck-text-input"),
  deckTextOutput: document.getElementById("deck-text-output")
};
let checkElms = {
  zeroStuffing: {
    element: document.getElementById("check-zero-stuffing"),
    state: undefined
  }
};
let fileName, fileContentText;

window.onload = () => {
  toggleElements("hide", "#btn-convert .loading");
  for (let i of Object.values(inputElms)) {
    i.value = "";
  }
  for (let i of Object.values(checkElms)) {
    i.element.checked = false;
  }
  document.getElementById("select-output-type").value = document.querySelector("#select-output-type > option:first-child").value;
}

checkElms.zeroStuffing.element.onchange = () => {
  checkElms.zeroStuffing.state = checkElms.zeroStuffing.element.checked;
}

inputElms.deckFileInput.onchange = () => {
  let reader = new FileReader();
  fileName = inputElms.deckFileInput.files[0].name;
  reader.readAsText(inputElms.deckFileInput.files[0], "UTF-8");
  reader.onload = evt => {
    fileContentText = evt.target.result;
    inputElms.deckTextInput.value = fileContentText;
  }
}

document.getElementById("btn-convert").onclick = () => {
  toggleElements("show", "#btn-convert .loading");
  let newFileContentText = inputElms.deckTextInput.value.split("\n");
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
    if (document.getElementById("select-output-type").value === "ydk") {
      // YDK卡表
      for (let i = 0; i < newFileContentText.length; i++) {
        let cardId = Number(newFileContentText[i].split("-")[0]);
        if (!Number.isNaN(cardId) && cardId != 0) {
          let cardIdString = String(cardId);
          if (checkElms.zeroStuffing.state === true) {
            // Stuffing 0 before ID string till length is 8.
            while (cardIdString.length < 8) {
              cardIdString = "0" + cardIdString;
            }
          }
          newFileContentText[i] = newFileContentText[i].replace(`${String(cardId)}`, `${cardIdString} --${cardsDict[cardId]}`);
        }
      }
      inputElms.deckTextOutput.value = newFileContentText.join("\n");
    } else if (document.getElementById("select-output-type").value === "card-name") {
      // 卡名卡表 ×
      let cardNumberDict = {};
      for (let i = 0; i < newFileContentText.length; i++) {
        let cardId = Number(newFileContentText[i].split("-")[0]);
        if (!Number.isNaN(cardId) && cardId != 0) {
          let cardIdString = String(cardId);
          if (Object.keys(cardNumberDict).includes(cardIdString)) {
            cardNumberDict[cardIdString] += 1;
          } else {
            cardNumberDict[cardIdString] = 1;
          }
          newFileContentText[i] = newFileContentText[i].replace(`${cardIdString}`, `${cardsDict[cardId]}`);
        } else {
          let fixedSring = newFileContentText[i].toLowerCase();
          if (fixedSring.startsWith("#created by ")) {
            if (fixedSring.split("#created by ")[1].trim() !== "...") {
              newFileContentText[i] = `由 ${fixedSring.split("#created by ")[1].trim()} 建立`;
            } else {
              newFileContentText[i] = "";
            }
          } else if (fixedSring.startsWith("#main")) {
            newFileContentText[i] = "主牌組：";
          } else if (fixedSring.startsWith("#extra")) {
            newFileContentText[i] = "額外牌組：";
          } else if (fixedSring.startsWith("!side")) {
            newFileContentText[i] = "副牌組：";
          }
        }
      }
      inputElms.deckTextOutput.value = newFileContentText.join("\n");
    }
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

function countInArray(array, target) {
  return array.filter(item => item === target).length;
}