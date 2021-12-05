var myName;
var multiLine;
var multiLineTime;
var multiLineFrom;
var multiLineSelf;

updateMyName();

function run() {
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
          newElement.innerHTML = "<div class='time-stamp time-self'>" + msgTime + "</div>" + msgSelf;

        } else {
          newElement.setAttribute("class", "chat-bubble chat-other");
          newElement.innerHTML = "<div class='time-stamp time-other'>" + msgTime + "</div>" + msgSelf;
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
      newElement.setAttribute("class", "neutral-message date-stamp");
      newElement.innerHTML = i;
      document.getElementById("output-container").appendChild(newElement);
    
    }
  }
  
}

function updateMyName() {
  myName = document.getElementById("my-name").value.trim();
}

function clean() {
  document.getElementById("output-container").innerHTML = "";
}