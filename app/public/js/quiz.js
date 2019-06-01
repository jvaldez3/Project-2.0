(function () {
  const quizAnswers = [];
  const myQuestions = [{
      question: "What gender do you identify as?",
      questionNum: 1,
      answers: {
        a: "Male",
        b: "Female",
        c: "Choose not to identify"
      },
    },
    {
      question: "What age range are you in?",
      answers: {
        a: "18 - 25",
        b: "26 - 30",
        c: "31 - 35",
        d: "36 - 40",
        e: "41 - 45",
        f: "46 - 50",
        g: "51 and up"
      },
    },
    {
      question: "What type of cyclist are you?",
      answers: {
        a: "I mostly ride MTB bikes",
        b: "I mostly ride commuter bikes",
        c: "I mostly ride road bikes",
        d: "I mostly ride mountain bikes",
        e: "I ride mountain and road",
        f: "I ride commuter, mountain, and road"
      },
    },
    {
      question: "What is the average miles you ride in a week? ",
      answers: {
        a: "20 or below",
        b: "25-50",
        c: "51-75",
        d: "75 and up"
      },
    },
    {
      question: "What size of groups do you like to ride in? ",
      answers: {
        a: "Only solo",
        b: "1-2 other pedal pals",
        c: "3-5 other pedal pals",
        d: "5 or more pedal pals"
      },
    },
    {
      question: "Do you consider yourself a competitive rider? ",
      answers: {
        a: "Yes, very much so.",
        b: "Occasionaly, depends on who I am riding with.",
        c: "Never, I only ride for fun.",
      },
    },
    {
      question: "What is your opinion on electric bikes? ",
      answers: {
        a: "I think electric bikes are really cool, I would love to own one.",
        b: "I think electric bikes are really cool, but I would not own one.",
        c: "I think it is a cheater bike, I don't like them at all",
        d: "I don't have an opinion"
      },
    },
    {
      question: "What is your opinion on matching biking kits? ",
      answers: {
        a: "My life, it is one of the biggest reasons I ride.",
        b: "I try to match, but it is not a big deal to me.",
        c: "I have no opinion on it",
        d: "I laugh at those types of bikers "
      },
    },
    {
      question: "What is your opinion on shopping for new bike parts? ",
      answers: {
        a: "It it is my favorite form of shopping, it is a weekly hobby.",
        b: "I do it occasionally, I never purchase, I only look.",
        c: "I bought all my stuff once, but I will never go bike shopping reguarly.",
        d: "I have no opinion on this matter."
      },
    },
    {
      question: "What type of weather do you ride in?",
      answers: {
        a: "I ride in all types of weather.",
        b: "Never in snow, but rain or shine.",
        c: "Never in snow or rain, only in the sunshine.",
        d: "I have no opinion on this matter."
      },
    },
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];
      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
        );
      }
      // add this question and its answers to the output
      output.push(
        `<div class="slide">
             <div class="question"><span class="questionNum">${currentQuestion.questionNum}</span> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
      );
    });
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide(question, answer) {
    console.log(document.getElementsByClassName("question"));

    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  const quizContainer = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  // display quiz right away
  buildQuiz();
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  showSlide(0);
  // on submit, show results
  $(document).ready(function () {
    // $("#submit").addEventListener("click");
    $("#previous").on("click", showPreviousSlide);
    $("#next").on("click", showNextSlide);
    $("#submit").on("click", function () {
      console.log($('form').serialize());
      var formData = $('form').serialize();
      $.ajax({
        method: "POST",
        url: "/api/db/quiz?" + formData
      }).then(function (data) {
        window.location.replace(data);
        // If there's an error, log the error
        // }).catch(function (err) {
        //     console.log(err);
      });
      // location.href = "/profile"
    })
  })
})();