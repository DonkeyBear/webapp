var colorPalette = {
  palette_default: ["#E2DCD5", "#4F5161", "#6B2F37", "#515035", "#333333"]
  //                 white   ,  blue    ,  red     ,  green   ,  deep-gray
};

clearInput();
generate();

function get(value) {
  return document.getElementById(value);
}

function generate() {

  var selectPalette = get("input-palette").value;
  var inputSongname = get("input-songname").value.trim();
  var inputSinger = get("input-singer").value.trim();
  var inputKey = get("input-key").value.trim();
  var inputPlay = get("input-play").value.trim();
  var inputCapo = get("input-capo").value.trim();

  var getOutputContainer = get("output-container");
  var getOutputTitle = get("output-title");
  var getOutputDetail = get("output-detail");
  var getOutputSection = get("output-section");

  var outputString = "";

  getOutputSection.style.cssText +=
    "background-color: " + colorPalette[selectPalette][0] + ";";
  getOutputDetail.style.cssText +=
    "color: " + colorPalette[selectPalette][4] + ";";

  if (get("input-voicetype-male").checked) {
    getOutputTitle.style.cssText +=
      "color: " + colorPalette[selectPalette][1] + ";";
  } else if (get("input-voicetype-female").checked) {
    getOutputTitle.style.cssText +=
      "color: " + colorPalette[selectPalette][2] + ";";
  } else if (get("input-voicetype-chorus").checked) {
    getOutputTitle.style.cssText +=
      "color: " + colorPalette[selectPalette][3] + ";";
  } else {
    getOutputTitle.style.cssText +=
      "color: " + colorPalette[selectPalette][4] + ";";
  }

  if (get("input-align-left").checked) {
    getOutputContainer.style.cssText += "text-align: left;";
  } else if (get("input-align-center").checked) {
    getOutputContainer.style.cssText += "text-align: center;";
  } else {
    getOutputContainer.style.cssText += "text-align: right;";
  }

  getOutputTitle.innerHTML = inputSongname;

  if (inputSinger != "") {
    outputString += "原唱：" + inputSinger + "&emsp;/&emsp;";
  }
  if (inputKey != "") {
    outputString += "Key：" + inputKey + "&emsp;/&emsp;";
  }
  if (inputPlay != "") {
    outputString += "Play：" + inputPlay + "&emsp;/&emsp;";
  }
  if (inputCapo != "") {
    outputString += "Capo：" + inputCapo + "&emsp;/&emsp;";
  }

  if (getOutputDetail != null) {
    getOutputDetail.innerHTML = outputString.slice(0, -13);
  }
}

function clearInput() {
  let inputs = [
    "input-songname",
    "input-singer",
    "input-key",
    "input-play",
    "input-capo"
  ];
  for (let i = 0; i < inputs.length; i++) {
    get(inputs[i]).value = "";
  }
  get("input-songname").focus();
}
