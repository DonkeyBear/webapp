const app = Vue.createApp({
  data() {
    return {
      csvFile: undefined,
      csvContent: '',
      skipRow: undefined,
      outputText: ''
    }
  },
  methods: {
    getCsvFile(event) {
      this.csvFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.csvContent = fileReader.result;
        this.output();
      };
      fileReader.readAsText(this.csvFile);
    },
    output() {
      this.outputText = this.array2rpy(csv2array(this.csvContent));
    },
    array2rpy(array) {
      // array[row][0]: 發話者
      // array[row][1]: 內文
      // array[row][2]: 備註
      let result = '';
      const startRow = !this.skipRow ? 0 : this.skipRow;
      for (let i = startRow; i < array.length; i++) {
        const speaker = !array[i][0] ? '' : `"${array[i][0]}" `;
        const dialog = speaker ? `"「${array[i][1].replaceAll('「', '『').replaceAll('」', '』')}」"` : `"${array[i][1]}"`;
        const comment = !array[i][2] ? '' : ` # ${array[i][2]}`;
        result += `${speaker}${dialog}${comment}\n`;
      }
      return result;
    },
    downloadRpy() {
      const blob = new Blob([this.outputText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, this.csvFile.name.toLowerCase().replaceAll('.csv', '.rpy'));
    }
  }
});

app.mount('main');

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function csv2array(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
  );


  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;


  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData)) {

    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
      strMatchedDelimiter.length &&
      strMatchedDelimiter !== strDelimiter
    ) {

      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);

    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {

      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(
        new RegExp("\"\"", "g"),
        "\""
      );

    } else {

      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];

    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return (arrData);
}