let radios = document.getElementsByClassName("form-check-input");

for (let i of radios) {
  i.checked = false;
}

// 1.C  2.B  3.C  4.C  5.C  6.B  7.C  8.A  9.C  10.A  11.C  12.C  13.A
function main() {
  let correctAns = document.getElementsByClassName("correct-ans");
  let correctAnsCount = 0;

  for (let i of correctAns) {
    if (i.checked == true) {
      correctAnsCount += 1;
    }
  }
  document.getElementById("correct-ans-count").innerHTML = correctAnsCount;
}