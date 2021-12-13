let multiLine;
let multiLineTime;
let multiLineFrom;
let multiLineSelf;
let dateRegExp = /^\d\d\d\d\/\d\d\/\d\d/; // etc. "2021/12/08" would be matched.

themeChange();
lineCount();

function run() {
  let myName = document.getElementById("my-name").value.trim();
  let chatLogArray = document.getElementById("chat-log").value.split("\n");

  for (let i of chatLogArray) {

    if (i.includes("\t")) {
      let chatLogSentence = i.split("\t");
      let msgTime = chatLogSentence[0] // time.
      let msgFrom = chatLogSentence[1] // the person who sent the message.
      let msgSelf = chatLogSentence[2] // message-self.

      if (msgFrom.endsWith("已收回訊息")) {
        let newElement = document.createElement("div");
        newElement.setAttribute("class", "neutral-message");
        newElement.innerHTML = chatLogSentence[1];
        document.getElementById("output-container").appendChild(newElement);

      } else if (msgSelf.startsWith("\"")) {
        multiLine = true;
        multiLineTime = msgTime;
        multiLineFrom = msgFrom;
        multiLineSelf = msgSelf.substring(1);

      } else {
        let newElement = document.createElement("div");

        if (msgFrom == myName) {
          newElement.setAttribute("class", "chat-bubble chat-self");
          newElement.innerHTML = "<div class='time-stamp'>" + msgTime + "</div>" + msgSelf;

        } else {
          newElement.setAttribute("class", "chat-bubble chat-other");
          newElement.innerHTML = "<div class='time-stamp'>" + msgTime + "</div>" + msgSelf;
        }
        document.getElementById("output-container").appendChild(newElement);
      }

    } else if (multiLine) {

      if (i.endsWith("\"")) {
        let newElement = document.createElement("div");
        multiLineSelf += "<br>" + i.slice(0, -1);
        multiLine = false;

        if (multiLineFrom == myName) {
          newElement.setAttribute("class", "chat-bubble chat-self");
          newElement.innerHTML = "<div class='time-stamp time-self'>" + multiLineTime + "</div>" + multiLineSelf;

        } else {
          newElement.setAttribute("class", "chat-bubble chat-other");
          newElement.innerHTML = "<div class='time-stamp time-other'>" + multiLineTime + "</div>" + multiLineSelf;
        }
        document.getElementById("output-container").appendChild(newElement);

      } else {
        multiLineSelf += "<br>" + i;
      }

    } else if (i != "") {
      let newElement = document.createElement("div");
      let matchResult = i.match(dateRegExp);
      newElement.setAttribute("class", "neutral-message date-stamp");
      if (matchResult != null) {
        let anchorName = matchResult[0].replaceAll("/", "-");
        newElement.setAttribute("id", anchorName);
      }
      newElement.innerHTML = i;
      document.getElementById("output-container").appendChild(newElement);

    }
  }
}

function lineCount() {
  let chatLog = document.getElementById("chat-log").value;
  document.getElementById("line-count").value = "共 " + chatLog.split("\n").length + " 行";
}

function themeChange() {
  if (document.getElementById("themeCss")) {
    document.getElementById("themeCss").remove();
  }

  let head = document.head;
  let link = document.createElement("link");
  let themeSelect = document.getElementById("themeSelect").value;

  link.id = "themeCss";
  link.rel = "stylesheet";

  if (themeSelect == "default") {
    link.href = "default_theme.css";
  } else if (themeSelect == "dark-mode") {
    link.href = "dark_mode_theme.css";
  }

  head.appendChild(link);
}

function cleanUp() {
  let outputContainer = document.getElementById("output-container");
  let outputContainerRow = document.getElementById("output-container-row");
  let newElement = document.createElement("div");

  outputContainer.remove();
  newElement.id = "output-container";
  newElement.className = "col-6 offset-3 min-vh-100";
  outputContainerRow.appendChild(newElement);

  document.getElementById("chat-log").value = "";
  document.getElementById("my-name").value = "";
}