
// according to Justin:
// create three divs: an "intro/welcome" div, a "quiz" div, and a "results" div
// use a show/hide feature to remove the divs
// DON'T encase each quiz question in its own div
// radio buttons will automatically clear (-Justin) ...if you code right
// THEN tackle the localstorage, then the timer, etc.
// remember, Justin (and Ben) are available at 9:15
// if you need help, visit them then, or ditch an in-class exercise for the teacher's lounge


// remember, you can do this
// maybe you don't feel like you can now
// but you're going to look back at this and smile at this message
// because right now you need it, but a month from now you certainly won't
// "there's nothing wrong with the way you code"


// nest questions in divs ("cards"), 
$(document).ready(function () {
    $("#questionSet1").click(function () {
        $('#questionSet1').hide();
        $('#questionSet2').show()
    });
})

// or something like this
var clickedButton = $(element.target)
    clickedButton.hide(card1).show(card2);


// how on earth to store questions/answers
function newCard() {
    var questionSet1 = {
        question: 'Is the sky blue',
        answers: ["could be", "it's pink!", "sometimes"],
        correct: 3
    };
}









/*

// you need to append test questions
// you need an if/else code for right wrong
// use bootstrap for html/css. right click on bootstrap's examples (bootstrap > examples) to view js also
// use node.js if needed
// your coding game is about to change baby
// use bootstrap > breakpoints to create/size columns in css
// provide css link after bootstrap css link
// refer to activity 5/17 to understand how to load bootstrap css AND custom
/*





/*

if (result == "Yes") {

    counterYes++

} else if (result == "No") {

    counterNo++

}



  var studentGrade = {
    student: student.value,
    grade: grade.value,
    comment: comment.value.trim()
  };
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
}

function renderLastGrade() { // generate score
  var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
  if (lastGrade !== null) {
  document.getElementById("saved-name").innerHTML = lastGrade.student;
  document.getElementById("saved-grade").innerHTML = lastGrade.grade;
  document.getElementById("saved-comment").innerHTML = lastGrade.comment;
  } else {
    return;
  }
} 
}

saveButton.addEventListener("click", function(event) { //triggers generate score
event.preventDefault();
saveLastGrade();
renderLastGrade();
});

function init() {
renderLastGrade();
}
init();

/* "start quiz" button clears div
user sees a question with multiple button answers
one of the buttons is the right answer, the others are wrong
button "saves" user input and clears page
new div loads
when user finishes questions, their score is reflected

later - implement a timer
timer starts on "start quiz" button
wrong questions cost user time

*/