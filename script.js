var a1 = $("a1");
var a2 = $("a2");
var questions1 = $("questions1");
var questions2 = $("questions2");
var results = $("results");
var result = $("#result");
var savedScore = $("#savedScore");
var counter = 0;

// simple counter keeps track of correct answers
var counter = 0;
function correctCounter() {
  counter += 1;
  document.getElementById("result").innerHTML = counter;
  localStorage.setItem("counter", counter);
}
