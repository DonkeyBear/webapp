let fileInput = document.getElementById("file-input");
let fileName, fileContentText;

fileInput.onchange = () => {
  let reader = new FileReader();
  fileName = fileInput.files[0].name;
  reader.readAsText(fileInput.files[0], "UTF-8");
  reader.onload = evt => {
    fileContentText = evt.target.result;
    document.getElementById("a").innerHTML = fileContentText;
  }
}

document.getElementById("btn-convert").onclick = () => {
  let newFileContentText = document.getElementById("a").innerHTML.split("\n");
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
    document.getElementById("b").innerHTML = newFileContentText.join("\n");
  })
}

function saveStaticDataToFile() {
  let blob = new Blob([fileContentText],
    { type: "text/plain;charset=utf-8" });
  // Change file name into "<OriginFileName>_new.<extension>"
  let fileNameSplit = fileName.split(".");
  fileNameSplit[fileNameSplit.length - 2] += "_new";
  saveAs(blob, fileNameSplit.join("."));
}