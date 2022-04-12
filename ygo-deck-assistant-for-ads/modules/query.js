// Load sql.js WebAssembly file
let config = {
  locateFile: () => "./modules/sql-wasm.wasm",
};
initSqlJs(config).then(response => {
  SQL = response;
});

function getCardNamesByIdList(idList) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "./cdb/cards.cdb", true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = () => {
      let uInt8Array = new Uint8Array(xhr.response);
      let db = new SQL.Database(uInt8Array);

      let contents = db.exec(`SELECT id, name FROM texts WHERE id IN (${String(idList)})`);
      let resultDict = {};

      if (contents.length !== 0) {
        let resultArray = contents[0].values;
        for (let i of resultArray) {
          resultDict[i[0]] = i[1];
        }
        resolve(resultDict);
      } else {
        resolve("There was no result.");
      }
    }

    xhr.onerror = () => {
      reject(Error("There was a network error."));
    }
    xhr.send();
  });
}