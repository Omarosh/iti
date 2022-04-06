function hello(name, dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age <= 0) {
    return "Error";
  } else {
    return `Hello ${name}, Age: ${age}`;
  }
}

module.exports = {
  hello: hello,
};
