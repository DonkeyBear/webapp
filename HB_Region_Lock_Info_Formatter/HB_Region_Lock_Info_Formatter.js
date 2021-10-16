// main fuction
function run() {
  if (document.getElementById("regionLockInput").value == "") {
    // if input is empty, then automatically paste into the input box.
    // some browser may not support this part of function.
    document.getElementById("regionLockInput").focus();
    document.execCommand("paste");
  }

  var regionLockInput = document.getElementById("regionLockInput").value;

  if (document.getElementById("browserSafari").checked) {
    // if using Safari
    var regionLockInput = regionLockInput.trim().replace(/ /g, ", ");
  } else if (document.getElementById("browserFirefox").checked) {
    // if using Firefox
    null; // TODO
  } else if (document.getElementById("browserChrome").checked) {
    // if using Chrome
    null; // TODO
  }

  if (regionLockInput.includes("TW")) {
    var output = "　⤷*(only available in " + regionLockInput + ")*";
  } else {
    var output = "　⤷*(**NOT** available in " + regionLockInput + ")*";
  }
  document.getElementById("result").value = output;
  document.getElementById("result").select();
  document.execCommand("copy");
  alert("已複製輸出！");

  var today = new Date();
  var currentTime =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById("lastExecuteTime").innerHTML = "最後執行時間 " + currentTime;
}

// detect browser type and automatically check corresponding radio button.
function detectBrowser() {
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    document.getElementById("browserChrome").checked = true;
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    document.getElementById("browserSafari").checked = true;
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    document.getElementById("browserFirefox").checked = true;
  }
}  