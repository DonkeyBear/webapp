// main fuction
function run() {
  let regionLockInput = document.getElementById("region-lock-input").value;
  let regionLockArray = regionLockInput.split(" ");
  let regionLockOutput;
  let result;

  regionLockArray = removeItemAll(regionLockArray, "");
  regionLockOutput = regionLockArray.join(", ")

  if (regionLockOutput.includes("TW")) {
    result = "　⤷*(only available in " + regionLockOutput + ")*";
  } else {
    result = "　⤷*(**NOT** available in " + regionLockOutput + ")*";
  }
  document.getElementById("result").value = result;
  document.getElementById("result").select();
  document.execCommand("copy");
}

function removeItemAll(array, item) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] != item) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}