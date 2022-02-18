// Container of --> Questions, Choices, Answers

const myQuizes = [
    {
        question : "If you want to access any element in an HTML page, you always start with accessing the document object.If you want to access any element in an HTML page, you always start with accessing the document object.If you want to access any element in an HTML page, you always start with accessing the document object. 1",

        choices : {
            a : "choice 1",
            b : "choice 2",
            c : "choice 3",
            d : "choice 4"
        },

        answer : "choice 1"
    },

    {
        question : "Question 2",

        choices : {
            a : "choice 1",
            b : "choice 2",
            c : "choice 3",
            d : "choice 4"
        },

        answer : "choice 2"
    },

    {
        question : "Question 3",

        choices : {
            a : "choice 1",
            b : "choice 2",
            c : "choice 3",
            d : "choice 4"
        },

        answer : "choice 3"
    },

    {
        question : "Question 4",

        choices : {
            a : "choice 1",
            b : "choice 2",
            c : "choice 3",
            d : "choice 4"
        },

        answer : "choice 4"
    },

    {
        question : "Question 5",

        choices : {
            a : "choice 1",
            b : "choice 2",
            c : "choice 3",
            d : "choice 4"
        },

        answer : "choice 3"
    },

    {
        question : "Question 6",

        choices : {
            a : "choice 1",
            b : "choice 2",
            c : "choice 3",
            d : "choice 4"
        },

        answer : "choice 2"
    }

];

let shuffledArr = myQuizes.sort(() => Math.random() - 0.5);

//------------- End Container (Questions, Choices, Answers) -----------------

let currentQuestionElement = document.getElementById("current-qstn");
let timerElement = document.getElementById("timer");
let totalQuestionElement = document.getElementById("total-qstn");
let timerButton = document.getElementById("timer-btn");
let slideContainer = document.getElementById("slide-container");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let submitBtn = document.getElementById("submit-btn");

let timerCount;
let questionCount = -1;
let seconds = 0, minutes = 0, hours = 0;
let slides;

totalQuestionElement.innerText = myQuizes.length;

timerButton.addEventListener("click", startQuize);
nextBtn.addEventListener("click", () => showQuize("increment"));
prevBtn.addEventListener("click", () => showQuize("decrement"));
submitBtn.addEventListener("click", () => showResult());

function startQuize() {

    currentQuestionElement.classList.remove("d-none");
    totalQuestionElement.classList.remove("d-none");

    timerStart();
    buildQuize();
    slides = document.querySelectorAll(".slide");
    showQuize("increment");
}

// Timer

function timerStart(){

    timerButton.classList.add("d-none");

    timerCount = setInterval(() => {
        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes == 60) {
            minutes = 0;
            hours++
        }

        showTimer();

    }, 1000);
}

showTimer = () => {
    let second = minute = hour = 0;
    
    seconds < 10 ? second = "0" + seconds : second = seconds;
    minutes < 10 ? minute = "0" + minutes : minute = minutes;
    hours < 10 ? hour = "0" + hours : hour = hours;

    timerElement.innerText = `${hour} : ${minute} : ${second}`;
}

//-------------------- End Timer ---------------------------------


// Quize build

function buildQuize(){

    myQuizes.forEach(quize => {
        let _questionContainer = buildQuestions(quize.question);
        let _choiceContainer = buildChoices(quize.choices);
        let quizeSlide = document.createElement("div");
        quizeSlide.setAttribute("class", "slide hide-element");

        quizeSlide.append(_questionContainer, _choiceContainer);
        slideContainer.appendChild(quizeSlide);
    });

    function buildQuestions(question){
        let questionContainer = document.createElement("div");
        questionContainer.setAttribute("class", "bg-primary text-light p-3 rounded text-justify question");
        questionContainer.innerText = question;

        return questionContainer;
    }

    function buildChoices(choices){
        let choiceContainer = document.createElement("div");
        choiceContainer.setAttribute("class", "row row-cols-1 row-cols-md-2 justify-content-between pt-3 choice-container");

        for(let key in choices) {
            let choiceElement = document.createElement("div");
            let _choice = document.createElement("div");

            choiceElement.setAttribute("class", "col pb-3");
            
            _choice.setAttribute("class", "btn btn-light border-primary btn-block text-justify px-3 rounded choice-btn");
            _choice.setAttribute("data-index", `${key}) `);
            choiceElement.appendChild(_choice);
            choiceContainer.appendChild(choiceElement);
            
            _choice.innerText = `${key.toUpperCase()}) ${choices[key]}`;
        }

        return choiceContainer;
    }
}

// ------------------------------ End Quize build -------------------------------------

// Show Quize

let isClicked = [];
let init = true;
let myAlert = document.getElementById("warnAlert");

function showQuize(nav){

    switch(nav){

        case "increment" :
            if(isClicked[questionCount] || init){

                myAlert.classList.add("d-none");

                init = false;
                questionCount ++;
                currentQuestionElement.innerText = questionCount + 1;
                if(questionCount > 0) slides[questionCount-1].classList.remove("show-element");
                slides[questionCount].classList.add("show-element");
                $(presentSlideChoices).off("click");
                
            }

            else{
                myAlert.classList.remove("d-none");
            }
            
            break;

        case "decrement" :

            questionCount --;
            currentQuestionElement.innerText = questionCount + 1;
            slides[questionCount + 1].classList.remove("show-element");
            slides[questionCount].classList.add("show-element");
            $(presentSlideChoices).on("click");
            break;

    }

    showControls(questionCount);
    answerSelection();
}

function showControls(pos){

    if(pos == 0) {
        displayControls("next-button", true);
        displayControls("prev-button", false);
    }

    if(pos == 1) displayControls("prev-button", true);

    if(pos == myQuizes.length-2) {
        displayControls("submit-button", false);
        displayControls("next-button", true);
    }

    if(pos == myQuizes.length-1) {
        displayControls("submit-button", true);
        displayControls("next-button", false);
    }

}

function displayControls(element, status){

    switch(element){

        case "prev-button" :
            if(status) prevBtn.classList.add("show-element");
            else prevBtn.classList.remove("show-element");
            break;

        case "next-button" : 
            if(status) nextBtn.classList.add("show-element");
            else nextBtn.classList.remove("show-element");
            break;

        case "submit-button" : 
            if(status) submitBtn.classList.add("show-element");
            else submitBtn.classList.remove("show-element");
            break;
        
    }
}

// ------------------------ End Quize ----------------------------

// Answer selection

let userAnswers = [];
let presentSlideChoices;

function answerSelection(){

    presentSlideChoices = document.querySelectorAll("#slide-container .show-element .choice-btn");

    $(presentSlideChoices).click(function(){

        isClicked[questionCount] = true;
        myAlert.classList.add("d-none");

        presentSlideChoices.forEach(ch => {
            $(ch).removeClass("bg-warning");
            $(ch).addClass("border-primary");
        });

        $(this).addClass("bg-warning");
        $(this).removeClass("border-primary");

        let i = $(this);
        userAnswers[questionCount] = {
            myAns : this.innerText.slice($(this).data('index').length,),
            isMatched : ind => myQuizes[ind].answer === userAnswers[ind].myAns ? true : false
        }
    });
}

//------------------------------ End Answer selection -----------------------------

// Show the Result

function showResult(){

    if (isClicked[questionCount]) {
        myAlert.classList.add("d-none");
        buildResult();
    }
    else myAlert.classList.remove("d-none");
}

function buildResult(){

    clearInterval(timerCount);

    $(presentSlideChoices).off("click");

    let totMark = 0

    myQuizes.forEach((el, i) => slides[i].classList.add("show-element"));

    userAnswers.forEach((obj, i) => {
        
        let myChoices = slides[i].querySelectorAll(".choice-btn");
        let res = obj.isMatched(i);

            myChoices.forEach(choice => {

                chItr = choice.innerText.slice($(choice).data('index').length,);
                choice.classList.remove("bg-warning");
                choice.style.cursor = "not-allowed";

                if(chItr === obj.myAns) res ? ++totMark : choice.classList.add("bg-danger","text-white");

                 if(chItr === myQuizes[i].answer) choice.classList.add("bg-success","text-white");
            });
    });

    console.log(totMark);

}

// ---------------------------- End Result -----------------------------------
