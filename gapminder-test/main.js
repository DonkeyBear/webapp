let radios = document.getElementsByClassName("form-check-input");

for (let i of radios) {
  i.checked = false;
}
// rounded-pill bg-success
// 1.C  2.B  3.C  4.C  5.C  6.B  7.C  8.A  9.C  10.A  11.C  12.C  13.A
function main() {
  let correctAns = document.getElementsByClassName("correct-ans");
  let correctAnsDiv = document.getElementsByClassName("div-correct-ans");
  let correctAnsCount = 0;

  // count the correct answer and print it.
  for (let i of correctAns) {
    if (i.checked == true) {
      correctAnsCount += 1;
    }
  }
  document.getElementById("correct-ans-count").innerHTML = correctAnsCount;
  // change color into green.
  for (let i of correctAnsDiv) {
    i.className += " rounded-pill bg-success text-light";
  }
}