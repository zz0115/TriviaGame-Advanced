$("#start").on("click", function(){
    $("#start").remove();
    game.loadQuestion();
});

$(document).on("click", ".answer-button",function(e){
    game.clicked(e);
})

$(document).on("click", "#reset",function(){
    game.reset();
})

questions= [{
    question: "A panda's daily diet consists almost entirely of what plant?",
    answers: ["pineapple","pine tree","flower","bamboo"],
    correctAnswer: "bamboo",
    image: "assets/images/gif-0.gif"
},{
    question: "Which of the traditional five senses are dolphins believed not to possess?",
    answers: ["smell","hear","taste","sight"],
    correctAnswer: "smell",
    image: "assets/images/gif-1.gif"
},{
    question: "The Van Gogh museum is located in what European capital city?",
    answers: ["Paris","Berlin","Barcelona","Amsterdam"],
    correctAnswer: "Amsterdam",
    image: "assets/images/gif-2.gif"
},{
    question: "What color do you get when you mix yellow and blue?",
    answers: ["brown","green","purple","red"],
    correctAnswer: "green",
    image: "assets/images/gif-3.gif"
},{
    question: "Diamonds are made up almost entirely of what element?",
    answers: ["carbon","silicon","hydrogen","francium"],
    correctAnswer: "carbon",
    image: "assets/images/gif-4.gif"
}
]



var game= {
    //track which question the user is on
    questions: questions,
    currentQuestion: 0,

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    counter: 30,

    countdown: function(){
        game.counter--;
        $("#counter").html("<div>Time Remaining: "+game.counter+" seconds</div>");
        if(game.counter<=0){
            // console.log("Time's up!");
            game.timeUp();
        }
    },

    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $("#subwrapper").html("<div id='counter'>Time Remaining: "+game.counter+" seconds</div>");
        $("#subwrapper").append("<h2>"+questions[game.currentQuestion].question+"</h2>");
        for(var j=0; j<questions[game.currentQuestion].answers.length; j++){
            // console.log("loadQuestion");  
            $("#subwrapper").append('<button class = "answer-button" id="button-'+j+'" data-name="'+questions[game.currentQuestion].answers[j]+'">'+ questions[game.currentQuestion].answers[j]+"</button>"+"<br>");            
        }
              
        
    },

    nextQuestion: function(){
        game.counter=30;
        $("#counter").html("<div>Time Remaining: "+game.counter+" seconds</div>");
        game.currentQuestion++;
        game.loadQuestion();
        // console.log("nextQuestion");        
    },

    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        // console.log("test5");
        $("#subwrapper").html("<h2>Out of time!</h2>");
        $("#subwrapper").append("<h3>The correct answer was: "+questions[game.currentQuestion].correctAnswer+"</h3>");
        $("#subwrapper").append("<iframe src='" + questions[game.currentQuestion].image + "' alt='correct answer image' frameborder='0'>");
        if(game.currentQuestion==questions.length-1){
            // console.log("test3");
            setTimeout(game.result, 3000);
        } else {
            // console.log("test4");
            setTimeout(game.nextQuestion, 3000);
        }
    },

    result: function(){
        clearInterval(timer);
        $("#subwrapper").html("All Done!");
        $("#subwrapper").append("<h3>Correct: "+ game.correct+"</h3>");
        $("#subwrapper").append("<h3>Incorrect: "+ game.incorrect+"</h3>");
        $("#subwrapper").append("<h3>Unanswered: "+ game.unanswered+"</h3>");
        $("#subwrapper").append("<button id='reset'>Reset</button>");
    },

    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            // console.log("You got it right!");
            game.answeredCorrectly();          
        } else {
            // console.log("Wrong!");
            game.answeredIncorrectly();
        }
    },

    answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2>You got it right!</h2>");
        console.log(questions[game.currentQuestion].image);
        $("#subwrapper").append("<iframe id = 'iframe' src='" + questions[game.currentQuestion].image + "' alt='correct answer image' frameborder='0' align='center'>");
        // $("#iframe").setAlignment();
        if(game.currentQuestion==questions.length-1){
            // console.log("test1");
            setTimeout(game.result, 30000);
            
        } else {
            // console.log("test2");
            setTimeout(game.nextQuestion, 30000);
        }
    },

    answeredIncorrectly: function(){
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2>You got it wrong!</h2>");
        $("#subwrapper").append("<h3>The correct answer was: "+questions[game.currentQuestion].correctAnswer+"</h3>");
        $("#subwrapper").append("<iframe src='" + questions[game.currentQuestion].image + "' alt='correct answer image' frameborder='0'>");
        
        if(game.currentQuestion==questions.length-1){
            // console.log("test3");
            setTimeout(game.result, 3000);
        } else {
            // console.log("test4");
            setTimeout(game.nextQuestion, 3000);
        }
    },

    reset: function(){
        game.currentQuestion=0;
        game.correct=0;
        game.incorrect=0;
        game.counter=30;
        game.unanswered=0;
        game.loadQuestion();

    },
    
    // setAlignment: function() 
    // {
    //     $("#iframe").data('body')[0].style.textAlign = "center";
    // }

}