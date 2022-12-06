import Enumerable from "https://cdn.jsdelivr.net/npm/linq@4.0.1/linq.min.js";

function qwe(a) {
  Enumerable.from(a).forEach(x => console.log(x));
}