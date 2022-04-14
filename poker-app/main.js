const deck = [
  // S = Spade, H = Heart, D = Diamond, C = Club
  "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13",
  "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13",
  "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13",
  "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13"
];

let inHandArray = [];

document.getElementById("btn-draw").onclick = () => {
  inHandArray = [];
  for (let i = 0; i < 5; i++) {
    inHandArray.push(deck[randint(52)]);
  }
  showHand();
  showCheckHand();
}

function showHand() {
  let newArray = [];
  for (let i of inHandArray) {
    newArray.push(cardify(i));
  }
  document.getElementById("in-hand").innerText = newArray.join(", ");
}

function cardify(card) {
  let newCard = card.replace("S", "♠️").replace("H", "♥️").replace("D", "♦️").replace("C", "♣️");
  if (newCard.includes("1")) {
    newCard = newCard.replace("11", "J").replace("12", "Q").replace("13", "K").replace(/1$/, "A");
  }
  return newCard;
}

function randint(x) {
  return Math.floor(Math.random() * x);
};

function countInArray(array, target) {
  return array.filter(item => item === target).length;
}

function checkHand() {
  let inHandSuit = inHandArray.map(card => { return card.substr(0, 1) });
  let inHandNumber = inHandArray.map(card => { return card.substr(1) });
  let checkHandDict = {
    twoPair: false,       // 兩對 Two Pair: 2x
    threeOfAKind: false,  // 三條 Three of a Kind: 2.5x
    straight: false,      // 順子 Straight: 4x
    flush: false,         // 同花 Flush: 4.5x
    fullHouse: false,     // 葫蘆 Full House: 5x
    fourOfAKind: false,   // 鐵支 Four of a Kind: 7x
    straightFlush: false, // 同花順 Straight Flush: 50x
    royalFlush: false     // 同花大順 Royal Flush: 100x
  };

  /* Two Pair */
  let pairArray = [];
  for (let i of inHandNumber) {
    if (countInArray(inHandNumber, i) > 1) {
      if (!pairArray.includes(i)) {
        pairArray.push(i);
      }
    }
    /* Three of a Kind */
    /* Four of a Kind */
    if (countInArray(inHandNumber, i) >= 3) {
      checkHandDict.threeOfAKind = true;
      if (countInArray(inHandNumber, i) >= 4) {
        checkHandDict.fourOfAKind = true;
        break;
      }
    }
  }
  if (pairArray.length >= 2) {
    checkHandDict.twoPair = true;
  }

  /* Straight */
  let straightUnicodeArray = inHandNumber.map(number => {
    return String(number).replace("10", ":").replace("11", ";").replace("12", "<").replace("13", "=").charCodeAt(0);
  }).sort();
  if (inHandNumber.includes("13") && inHandNumber.includes("1")) {
    straightUnicodeArray = straightUnicodeArray.map(unicodeNumber => {
      if (unicodeNumber < 53) {
        return unicodeNumber + 13;
      } else {
        return unicodeNumber;
      }
    }).sort();
  }
  for (let i = 0; i < 4; i++) {
    if (straightUnicodeArray[i] + 1 === straightUnicodeArray[i + 1]) {
      if (i === 3) {
        checkHandDict.straight = true;
        break;
      }
    } else {
      break;
    }
  }

  /* Flush */
  if (countInArray(inHandSuit, inHandSuit[0]) === 5) {
    checkHandDict.flush = true;
  }

  /* Full House */
  if (checkHandDict.twoPair && checkHandDict.threeOfAKind) {
    checkHandDict.fullHouse = true;
  }

  /* Straight Flush */
  if (checkHandDict.straight && checkHandDict.flush) {
    checkHandDict.straightFlush = true;
  }

  /* Royal Flush */
  if (checkHandDict.straightFlush) {
    if (inHandNumber.includes("10") && inHandNumber.includes("1")) {
      checkHandDict.royalFlush = true;
    }
  }

  return checkHandDict;
}

function showCheckHand() {
  let checkHandDict = checkHand();
  let elements = [
    document.getElementById("span-two-pair"),
    document.getElementById("span-three-of-a-kind"),
    document.getElementById("span-straight"),
    document.getElementById("span-flush"),
    document.getElementById("span-full-house"),
    document.getElementById("span-four-of-a-kind"),
    document.getElementById("span-straight-flush"),
    document.getElementById("span-royal-flush")
  ]
  for (let i = 0; i < 8; i++) {
    if (Object.values(checkHandDict)[i]) {
      elements[i].innerText = "Yes";
    } else {
      elements[i].innerText = "No";
    }
  }
}