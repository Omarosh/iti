const util = require("util");
const age = require("./age");

let bday = 10;
let bmonth = 5;
let byear = 1998;
let x = age.hello("Omar", util.format("%s / %s / %s", bmonth, bday, byear));
console.log(x);

// ----------
console.log(age.hello("ah", "6/5/2022"));
