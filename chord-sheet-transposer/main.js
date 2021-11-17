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

function transpose() {

  function transposeThis(targetString) {
    for (let i = 0; i < 12; i++) {
      // first transpose to Roman number
      targetString = targetString.replaceAll(
        Object.keys(keys)[i],
        Object.values(keys)[i]
      );
    }

    for (let i = 0; i < 12; i++) {
      // transpose offset
      let f = i + transposeValue;
      if (f >= 12) {
        f -= 12;
      } else if (f < 0) {
        f += 12;
      }
      // second transpose to pitch names
      targetString = targetString.replaceAll(
        Object.values(keys)[i],
        Object.keys(keys)[f]
      );
    }

    for (let i = 0; i < 11; i++) {
      //fix illegal pitch names
      targetString = targetString.replaceAll(
        Object.keys(pitchNameFix)[i],
        Object.values(pitchNameFix)[i]
      );
    }

    // fix layout of the chord sheet
    targetString = targetString.replaceAll("\n", "<br>");
    targetString = targetString.replaceAll(" ", "&nbsp;");

    // color the chords
    // ref for this regex: https://stackoverflow.com/questions/29144822/
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

  // input valid
  if ((transposeValue >= -11 && transposeValue <= 11) == false) {
    alert("請輸入 -11 到 11 之間的值！");
    return;
  }

  // transpose value correction
  if (transposeType == "capo") {
    transposeValue = 0 - transposeValue;
  }

  if (document.getElementById("check-91pu-optimize").checked) {
    chordSheetArray = chordSheet.split("\n");
    for (let i = 0; i < chordSheetArray.length; i++) {
      if (chordSheetArray[i].indexOf("|") != -1) {
        chordSheetArray[i] = transposeThis(chordSheetArray[i]);
      } else {
        chordSheetArray[i] = chordSheetArray[i].replaceAll(" ", "&nbsp;");
      }
    }
    chordSheet = chordSheetArray.join("<br>");
  } else {
    chordSheet = transposeThis(chordSheet);
  }

  if (document.getElementById("check-replace-sharp-flat").checked) {
    chordSheet = chordSheet.replaceAll(/[A-G]#/g, "$&SHARP-SYMBOL");
    chordSheet = chordSheet.replaceAll(/[A-G]b/g, "$&FLAT-SYMBOL");
    chordSheet = chordSheet.replaceAll("#SHARP-SYMBOL", "<span class=\"music-symbol\">♯</span>");
    chordSheet = chordSheet.replaceAll("bFLAT-SYMBOL", "<span class=\"music-symbol\">♭</span>");
  }

  if (document.getElementById("check-monospace").checked) {
    document.getElementById("output").style.cssText += "font-family: monospace, Arial, Helvetica, sans-serif;";
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
  }

  // edit "is-chord" class after print
  if (document.getElementById("check-background-color").checked) {
    for (let i = 0; i < inChordContent.length; i++) {
      inChordContent[i].style.cssText += "background-color:" + colorPalette["chordbg"];
    }
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
  document.getElementById("transpose-value").value = "";
  document.getElementById("chordSheet").focus();
}

function changeFontSize(value) {
  let fontSize = document.getElementById("input-fontSize").innerHTML;
  fontSize = fontSize.slice(0, -3);
  fontSize = Number(fontSize) + value;
  if (fontSize == 0) {
    return;
  }
  document.getElementById("input-fontSize").innerHTML = fontSize + " px";
  document.getElementById("output").style.cssText +=
    "font-size: " + fontSize + "px;";
}

function changeLineHeight(value) {
  let lineHeight = document.getElementById("input-lineHeight").innerHTML;
  lineHeight = lineHeight.slice(0, -3);
  lineHeight = Number(lineHeight) + value;
  if (lineHeight < 0) {
    return;
  }
  document.getElementById("input-lineHeight").innerHTML = lineHeight + " px";
  document.getElementById("output").style.cssText +=
    "line-height: " + lineHeight + "px;";
}

function changePaddingLeft(value) {
  let padding = document.getElementById("input-padding").innerHTML;
  padding = padding.slice(0, -1);
  padding = Number(padding) + value;
  if (padding < 0 || padding > 100) {
    return;
  }
  document.getElementById("input-padding").innerHTML = padding + "%";
  document.getElementById("output").style.cssText +=
    "padding-left: " + padding + "%;";
}