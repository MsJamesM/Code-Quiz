var a1 = $("a1");
var a2 = $("a2");
var questions1 = $("questions1");
var questions2 = $("questions2");
var results = $("results");
var result = $("#result");
var counter = 0;

// -------------------- simple counter keeps track of correct answers

var counter = localStorage.getItem("lastScore");
lastScore.textContent = counter;

var counter = 0;
function correctCounter() {
  counter += 1;
  document.getElementById("result").innerHTML = counter;
  document.getElementById("lastScore").innerHTML = counter;
  localStorage.setItem("lastScore", counter);
}

function clearAll() {
  window.localStorage.clear();
  window.location.reload();
}
