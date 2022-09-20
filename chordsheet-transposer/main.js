// ==========
// global varius section
// ==========

const keys = {
  "C": "[I]"  , "C#": "[I#]" ,
  "D": "[II]" , "D#": "[II#]",
  "E": "[III]",
  "F": "[IV]" , "F#": "[IV#]",
  "G": "[V]"  , "G#": "[V#]" ,
  "A": "[VI]" , "A#": "[VI#]",
  "B": "[VII]"
};
const pitchNameFix = {
  "#b" : "" , "b#" : "" ,
  "E#" : "F", "Fb" : "E",
  "B#" : "C", "Cb" : "B",
  "C##": "D", "D##": "E",
  "F##": "G", "G##": "A",
  "A##": "B"
};

var chordSheetLength = 0;
var chordSheetLengthLast = 0;

// ==========
// execute once at start.
// ==========
let queryString = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
if (queryString.sheet) {
  document.getElementById("chordSheet").value = decodeURI(queryString.sheet).replaceAll("[[sharp]]", "#");
}
document.getElementById("input-fontSize").value = "14.0";
document.getElementById("input-lineHeight").value = "1.50";
forSafari();
transpose();

// ==========
// function section
// ==========

function transpose() {

  function transposeThis(targetString) {
    for (let i = 0; i < 12; i++) {
      // first, transpose to Roman number.
      targetString = targetString.replaceAll(
        Object.keys(keys)[i],
        Object.values(keys)[i]
      );
    }

    for (let i = 0; i < 12; i++) {
      // transpose offset
      let f = (i + transposeValue) % 12;
      if (f < 0) {
        f += 12;
      }
      // second, transpose to pitch names.
      targetString = targetString.replaceAll(
        Object.values(keys)[i],
        Object.keys(keys)[f]
      );
    }

    for (let i = 0; i < 11; i++) {
      // fix illegal pitch names.
      targetString = targetString.replaceAll(
        Object.keys(pitchNameFix)[i],
        Object.values(pitchNameFix)[i]
      );
    }

    // fix layout of the chord sheet.
    targetString = targetString.replaceAll("\n", "<br>");
    targetString = targetString.replaceAll(" ", "&nbsp;");

    // color the chords
    // inspired by this regex: https://stackoverflow.com/questions/29144822/
    targetString = targetString.replaceAll(
      /([A-G](#|b)?)(\(?(M|maj|major|m|min|minor|dim|sus|dom|aug)?(\+|-|add)?\d*\)?)(\+|-)?\d*\(?(sus\d*)?(M|maj|major)?\d*\)?(\/(([A-G]|\d*)(#|b)?))?/g,
      "<span class=\"is-chord\">$&</span>"
    );
    return targetString;
  }

  var chordSheet = document.getElementById("chordSheet").value;
  var transposeType = document.getElementById("select-transpose-type").value;
  var transposeValue = Number(document.getElementById("transpose-value").value);

  if (document.getElementById("check-color-picking").checked) {
    var colorPalette = {};
    colorPalette["bg"] = document.getElementById("input-color-bg").value;
    colorPalette["text"] = document.getElementById("input-color-text").value;
    colorPalette["chord"] = document.getElementById("input-color-chord").value;
    colorPalette["chordbg"] = document.getElementById("input-color-chordbg").value;
  } else {
    var colorPalette = { bg: "#FFFFFF", text: "#666666", chord: "#246FB5", chordbg: "#EEEEEE" };
  }

  // symbol correction
  chordSheet = chordSheet.replaceAll("♯", "#");
  chordSheet = chordSheet.replaceAll("♭", "b");

  // transpose value correction
  transposeValue = transposeValue % 12;
  document.getElementById("transpose-value").value = transposeValue;
  
  if (transposeType == "capo") {
    transposeValue = 0 - transposeValue;
  }

  if (document.getElementById("check-91pu-optimize").checked) {
    let chordSheetArray = chordSheet.split("\n");
    for (let i = 0; i < chordSheetArray.length; i++) {
      // if "|" is in the line, it's a chord line.
      if (chordSheetArray[i].indexOf("|") != -1) {
        chordSheetArray[i] = transposeThis(chordSheetArray[i]);
      } else {
        chordSheetArray[i] = chordSheetArray[i].replaceAll(" ", "&nbsp;");
      }
    }
    chordSheet = chordSheetArray.join("<br>");
    // make sharp and flat symbol be <sup> style.
    chordSheet = chordSheet.replaceAll(/[A-G](#|b)/g, "$&MAKE-THIS-SUP");
    chordSheet = chordSheet.replaceAll("#MAKE-THIS-SUP", "<sup>#</sup>");
    chordSheet = chordSheet.replaceAll("bMAKE-THIS-SUP", "<sup>b</sup>");

  } else {
    chordSheet = transposeThis(chordSheet);
  }

  if (document.getElementById("check-replace-sharp-flat").checked) {
    chordSheet = chordSheet.replaceAll(/([A-G]|(<sup>))#/g, "$&SHARP-SYMBOL");
    chordSheet = chordSheet.replaceAll(/([A-G]|(<sup>))b/g, "$&FLAT-SYMBOL");
    chordSheet = chordSheet.replaceAll("#SHARP-SYMBOL", "<span class=\"music-symbol\">♯</span>");
    chordSheet = chordSheet.replaceAll("bFLAT-SYMBOL", "<span class=\"music-symbol\">♭</span>");
  }

  if (document.getElementById("check-monospace").checked) {
    document.getElementById("output").style.cssText += "font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace, Arial, Helvetica, sans-serif;";
  } else {
    document.getElementById("output").style.cssText += "font-family: Arial, Helvetica, sans-serif;";
  }

  // print chordsheet
  document.getElementById("output").innerHTML = chordSheet;

  // change colors
  document.querySelector("body").style.backgroundColor = colorPalette["bg"];
  document.getElementById("output").style.cssText += "color:" + colorPalette["text"];
  var inChordContent = document.getElementsByClassName("is-chord");
  for (let i = 0; i < inChordContent.length; i++) {
    inChordContent[i].style.cssText += "color:" + colorPalette["chord"];
    if (document.getElementById("check-monospace").checked) {
      inChordContent[i].style.cssText += "; font-weight: bold;";
    }
  }

  // edit "is-chord" class after print
  if (document.getElementById("check-background-color").checked) {
    for (let i = 0; i < inChordContent.length; i++) {
      inChordContent[i].style.cssText += "padding: 0.1rem 0.25rem; margin: -0.25rem; border-radius: 0.2rem; background-color:" + colorPalette["chordbg"];
    }
  }
}

function forSafari() {
  if (navigator.userAgent.indexOf("Safari") != -1) {
    let fontSizeDecrease = document.getElementById("font-size-decrease");
    let fontSizeIncrease = document.getElementById("font-size-increase");
    let lineHeightDecrease = document.getElementById("line-height-decrease");
    let lineHeightIncrease = document.getElementById("line-height-increase");

    fontSizeDecrease.setAttribute("onclick", "changeFontSize(-1)");
    fontSizeIncrease.setAttribute("onclick", "changeFontSize(1)");
    lineHeightDecrease.setAttribute("onclick", "changeLineHeight(-0.1)");
    lineHeightIncrease.setAttribute("onclick", "changeLineHeight(0.1)");
  }
}

function switchMenu(value) {
  if (document.getElementById(value).hidden) {
    document.getElementById(value).hidden = false;
  } else {
    document.getElementById(value).hidden = true;
  }
}

function clearSheetTextArea() {
  document.getElementById("chordSheet").value = "";
  document.getElementById("chordSheet").focus();
}

function changeFontSize(value) {
  let inputFontSize = document.getElementById("input-fontSize");
  fontSize = Number(inputFontSize.value.replaceAll(/[^\d.]/g, ""));
  if (value != 0) {
    fontSize = fontSize + value;
  }
  if (fontSize == 0) {
    return;
  }
  fontSize = fontSize.toFixed(1);
  inputFontSize.value = fontSize;
  document.getElementById("output").style.cssText +=
    "font-size: " + fontSize + "px;";
}

function changeLineHeight(value) {
  let inputLineHeight = document.getElementById("input-lineHeight");
  lineHeight = Number(inputLineHeight.value.replaceAll(/[^\d.]/g, ""));
  if (value != 0) {
    lineHeight = lineHeight + value;
  }
  if (lineHeight < 0) {
    return;
  }
  lineHeight = lineHeight.toFixed(2);
  inputLineHeight.value = lineHeight;
  document.getElementById("output").style.cssText +=
    "line-height: " + lineHeight + ";";
}

function cleanUpBreakLine(textareaId) {
  let textareaContent = document.getElementById(textareaId);

  chordSheetLengthLast = chordSheetLength;
  chordSheetLength = textareaContent.value.length;

  if ((chordSheetLength - chordSheetLengthLast) > 1) {
    let getCountOfBreakLine = (textareaContent.value.match(/\n/g) || []).length;
    let getCountOfTwoBreakLine = (textareaContent.value.match(/\n\n/g) || []).length;

    if (getCountOfTwoBreakLine * 2 == getCountOfBreakLine) {
      textareaContent.value = textareaContent.value.replaceAll("\n\n", "\n");
    }
  }
}

function copyValue(id_1, id_2) {
  document.getElementById(id_2).value = document.getElementById(id_1).value;
}

function responsiveOutput() {
  let output = document.getElementById("output");
  let inputFontSize = document.getElementById("input-fontSize");

  if (output.innerHTML.replaceAll(/(&nbsp;)|(&ensp;)|(&emsp;)|(&thinsp;)|(<br>)/g, "") == "") {
    return;
  }

  function widthOverflow(element) {
    return element.scrollWidth > element.clientWidth;
  }

  if (widthOverflow(output)) {
    while (widthOverflow(output)) {
        changeFontSize(-1);
    }
  } else {
    while (widthOverflow(output) == false) {
      changeFontSize(1);
    }
    changeFontSize(-1);
  }
  inputFontSize = inputFontSize.value;
}