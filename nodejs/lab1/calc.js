function add(n1, n2) {
  if (typeof n1 == "number" && typeof n2 == "number") return n1 + n2;
  else return "error";
}
function sub(n1, n2) {
  if (typeof n1 == "number" && typeof n2 == "number") return n1 - n2;
  else return "error";
}
function mul(n1, n2) {
  if (typeof n1 == "number" && typeof n2 == "number") return n1 * n2;
  else return "error";
}

module.exports = {
  add: add,
  sub: sub,
  mul: mul,
};
