var app = angular.module("Quiz-App", []);

app.controller("App-Ctrl", ($scope) => {
    $scope.appname = "Quiz App With AngularJS";

    $scope.Quiz = {
        getQuestions: [
            {
                no : 1,
                question: "What is the capital of France?",
                options: {
                    A: "Berlin",
                    B: "Madrid",
                    C: "Paris",
                    D: "Rome"
                },
                answer: "C"
            },
            {
                no : 2,
                question: "What is 2 + 2?",
                options: {
                    A: 3,
                    B: 4,
                    C: 5,
                    D: 6
                },
                answer: "B"
            },
            {
                no : 3,
                question: "What is the largest planet in our solar system?",
                options: {
                    A: "Earth",
                    B: "Jupiter",
                    C: "Mars",
                    D: "Saturn"
                },
                answer: "B"
            }
        ],

        calculateScore: (answers, questions) => {
            let score = 0;
            for (let i = 0; i < questions.length; i++) {
                if (answers[i] === questions[i].answer) {
                    score++;
                }
            }
            return score;
        },

       Selected: function(e) {
            $scope.replenish();
            e.target.classList.add("bg-black");
            e.target.classList.add("text-white");
            e.target.classList.add("s");
            $scope.selected = e.target.getAttribute("val");
        },

        CheckAns: () => {
            // $timeout(() => {}, 1000);
            $scope.btn_dis = true;
            let S = document.querySelector('.s');
            let answer = $scope.q[$scope.qIndex].answer;
            let K = document.querySelector(`[key=${answer}]`);
            if ($scope.selected === answer) {
                S.classList.replace("bg-black", "bg-green-600");
                // S.classList.replace("bg-black", "bg-green-600");
                $scope.score++;
                $scope.nxt = true;
                $scope.status = "Correct!";
            } else if ($scope.selected !== answer && S) {
                S.classList.replace("bg-black", "bg-red-600");
                K.classList.add("text-white");
                K.classList.add("bg-green-600");
                $scope.nxt = true;
                $scope.status = "Wrong!";
            } else if (!S) {
                K.classList.add("bg-green-600");
                K.classList.add("text-white");
                $scope.nxt = true;
                $scope.status = "Wrong!";
            }
            S.classList.remove("s");
        },

        Next: () => {
            $scope.btn_dis = false;
            $scope.replenish(), $scope.qIndex++, $scope.nxt = false, $scope.status = "";
            if ($scope.qIndex == $scope.Quiz.getQuestions.length) {
                $scope.submit = false, document.querySelector("#quiz-end").style.display = "none";
                $scope.restart = true;
                $scope.showScores = true;
            } else {
                $scope.start = true;
            }
        },

        Restart: () => window.location.replace('quiz.html')
    };

    // Initials
    $scope.start = false,
    $scope.q = $scope.Quiz.getQuestions,
    // $scope.randomize = Math.random * $scope.q.length;
    $scope.qIndex = 0,
    $scope.score = 0;
    $scope.selected = "";
    $scope.status = "";
    $scope.replenish = () => {
        let li = document.querySelectorAll('li');
        for (i = 0; i < li.length; i++) {
            li[i].classList.remove("bg-black"),
            li[i].classList.remove("bg-green-600"),
            li[i].classList.remove("bg-red-600"),
            li[i].classList.remove("text-white");
        }
    };
    $scope.nxt = false;
    $scope.submit = true;
    $scope.finished = true;
    $scope.showScores = false;
});