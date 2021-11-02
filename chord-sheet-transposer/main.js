function transpose() {
  var keys = {
    "C": "[I]"  , "C#": "[I#]" ,
    "D": "[II]" , "D#": "[II#]",
    "E": "[III]",
    "F": "[IV]" , "F#": "[IV#]",
    "G": "[V]"  , "G#": "[V#]" ,
    "A": "[VI]" , "A#": "[VI#]",
    "B": "[VII]"
  };
  var pitchNameFix = {
    "#b" : "" , "b#" : "" ,
    "E#" : "F", "Fb" : "E",
    "B#" : "C", "Cb" : "B",
    "C##": "D", "D##": "E",
    "F##": "G", "G##": "A",
    "A##": "B"
  };

  var chordSheet = document.getElementById("chordSheet").value;
  var transposeType = document.getElementById("select-transpose-type").value;
  var transposeValue = Number(document.getElementById("transpose-value").value);

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

  for (let i = 0; i < 12; i++) {
    // first transpose to Roman number
    chordSheet = chordSheet.replaceAll(
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
    chordSheet = chordSheet.replaceAll(
      Object.values(keys)[i],
      Object.keys(keys)[f]
    );
  }

  for (let i = 0; i < 11; i++) {
    //fix illegal pitch names
    chordSheet = chordSheet.replaceAll(
      Object.keys(pitchNameFix)[i],
      Object.values(pitchNameFix)[i]
    );
  }

  // fix layout of the chord sheet
  chordSheet = chordSheet.replaceAll("\n", "<br>");
  chordSheet = chordSheet.replaceAll(" ", "&nbsp;");

  // color the chords
  // (This regex is stole from Alex Golovin in Stack Overflow,
  // and make some small changes by me.)
  // ref: https://stackoverflow.com/questions/29144822/
  chordSheet = chordSheet.replaceAll(
    /([A-G](#|b)?)(\(?(M|maj|major|m|min|minor|dim|sus|dom|aug)?(\+|-|add)?\d*\)?)(\+|-)?\d*\(?(M|maj|major)?\d*\)?(\/([A-G](#|b)?))?/g,
    "<span class=\"chordBlue\">$&</span>"
  );

  document.getElementById("output").innerHTML = chordSheet;
}

function clearSheetTextArea() {
  document.getElementById("chordSheet").value = "";
  document.getElementById("transpose-value").value = "";
  document.getElementById("chordSheet").focus();
}

function changeFontSize(value) {
  let fontSize = document.getElementById("fontSize").innerHTML;
  fontSize = Number(fontSize) + value;
  if (fontSize == 0) {
    return;
  }
  document.getElementById("fontSize").innerHTML = fontSize;
  document.getElementById("output").style.cssText +=
    "font-size: " + fontSize + "px;";
}

function changeLineHeight(value) {
  let lineHeight = document.getElementById("lineHeight").innerHTML;
  lineHeight = Number(lineHeight) + value;
  if (lineHeight < 0) {
    return;
  }
  document.getElementById("lineHeight").innerHTML = lineHeight;
  document.getElementById("output").style.cssText +=
    "line-height: " + lineHeight + "px;";
}

function changePaddingLeft(value) {
  let padding = document.getElementById("padding").innerHTML;
  if (padding < 0 || padding > 100) {
    return;
  }
  padding = Number(padding) + value;
  document.getElementById("padding").innerHTML = padding;
  document.getElementById("output").style.cssText +=
    "padding-left: " + padding + "%;";
}