let radios = document.getElementsByClassName("form-check-input");

for (let i of radios) {
  i.checked = false;
}

function main() {
  let correctAns = document.getElementsByClassName("correct-ans");
  let wrongAns = document.querySelectorAll(".form-check-input:not(.correct-ans):checked");
  let correctAnsCount = 0;

  // count the correct answer and print it.
  for (let i of correctAns) {
    if (i.checked) {
      correctAnsCount++;
    }
  }
  document.getElementById("correct-ans-count").innerHTML = correctAnsCount;
  // change background-color correct and wrong answer into green and red.
  for (let i of correctAns) {
    i.parentElement.className += " rounded-pill-box bg-success text-light";
  }
  for (let i of wrongAns) {
    i.parentElement.className += " rounded-pill-box bg-danger text-light";
  }
}