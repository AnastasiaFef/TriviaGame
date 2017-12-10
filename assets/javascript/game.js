var question1={
	question: "What is the right way to declare variable in javascript?",
	answer0: "vav apple",
	answer1: "var 2apples",
	answer2: "var _3apples",
	answer3: "var Apple",
	correctAnswer: "var _3apples",
	tag:"javascript%20variable",
};
var question2={
	question: "What is a javascript tag syntax for h1 tag?",
	answer0: "thisIsNewTag\"h1\"",
	answer1: "<h1>",
	answer2: "(h1)",
	answer3: "I have to google that",
	correctAnswer: "<h1>",
	tag:"javascript%20tag",
};
var question3={
	question: "What data can you store inside of your array?",
	answer0: "Object",
	answer1: "String",
	answer2: "Array",
	answer3: "All listed options",
	correctAnswer: "All listed options",
	tag:"javascript%20array",
};
var question4={
	question: "What is .col-md-6 in Bootstrap?",
	answer0: "Collection of 6 medical doctors",
	answer1: "Cold in Maryland, 6 degrees",
	answer2: "Column that takes half of the parent element on laptop screen",
	answer3: "Cola with Mnt. Dew in 6-pack",
	correctAnswer: "Column that takes half of the parent element on laptop screen",
	tag:"Bootstrap%20grid",
};
var questions=[question1, question2, question3, question4];
var right_answered=0;
var unanswered=0;
var incorrect_answered=0;
var timeout;
var next_question=1;
var display_question = $("<div>");
var question;
var selected_question;
var selected_answer;
var ticker;
var tag;

$(document).ready(function(){
	start();

	function start(){
		$(".box").html("<a class=\"btn btn-primary btn-lg container-fluid start_button\" href=\"#\" role=\"button\">Start the game</a>");
		console.log("im in start()")
	}
	$(document).on("click", ".start_button", show_question);

	//You'll create a trivia game that shows only one question until the player 
	//answers it or their time runs out. 
	function show_question(){
		$(".box").html("");

		if(next_question > questions.length){
			console.log("No more questions");
			// show results
			results();
			return;
		}

		selected_question=questions[next_question-1];
		console.log(selected_question.question);
		
		var tick = 30;
		$(".timer").html("<p id=\'timer\' class=centered>Time Remaining: "+tick+" Seconds</p>");
        ticker = window.setInterval(function(){
        	if(tick>0){
        		tick--;
        		$(".timer").html("<p id=\'timer\' class=centered>Time Remaining: "+tick+" Seconds</p>");
        	}
        }, 1000);

		display_question.html("<p class=centered>"+selected_question.question+"<p>");
		// create var and store <p> tag in it
		//add attributes to var 
		// in for loop that loops for questions.length times add data-answer=answer+i attr and text selected_question.answer+i
		for (var i=0; i<questions.length;i++){
			var print_answ=$("<p>");
			print_answ.attr("class", "answer centered btn btn-primary btn-lg container-fluid");
			print_answ.attr("data-answer", "answer"+i);
			print_answ.text(selected_question['answer'+i]);
			display_question.append(print_answ);
			$(".box").append(display_question);
			console.log("printing answers");
		}
		// display_question.append("<p data-answer=answer0 class=\"answer centered btn btn-primary btn-lg container-fluid\">"+selected_question.answer0+"</p>"+
		// 	"<p data-answer=answer1 class=\"answer centered btn btn-primary btn-lg container-fluid \">"+selected_question.answer1+"</p>"+
		// 	"<p data-answer=answer2 class=\"answer centered btn btn-primary btn-lg container-fluid \">"+selected_question.answer2+"</p>"+
		// 	"<p data-answer=answer3 class=\"answer centered btn btn-primary btn-lg container-fluid \">"+selected_question.answer3+"</p>");

		next_question++;
		//If the player runs out of time, tell the player that time's up and display 
		//the correct answer. Wait a few seconds, then show the next question.
		timeout = setTimeout(function() {
          unanswered++;
          console.log(unanswered);
          display_question.html("<h3 class=centered>Out Of Time!</h3>");
		  display_question.append("<p class=centered>The Correct Answer Was: "+selected_question.correctAnswer+"</p>");
		  $(".box").html(display_question);
		  gif();
		  timeout = setTimeout(show_question, 6000);
          // return;
        }, 30000);
	}

	$(document).on("click", ".answer", function(){
		selected_answer = $(this).data("answer");
		console.log("clicked "+ selected_answer);
		clearTimeout(timeout);
		clearInterval(ticker);
		// console.log("selected_question[selected_answer] "+selected_question[selected_answer]);
		// console.log("selected_question.correctAnswer "+ selected_question.correctAnswer)
		if(selected_question[selected_answer] === selected_question.correctAnswer){
			//if won
			right_answered++;
			console.log("right answers = "+right_answered);
			//If the player selects the correct answer, show a screen congratulating them 
			//for choosing the right option. After a few seconds, display the next 
			//question -- do this without user input.
			//The scenario is similar for wrong answers and time-outs.
			won();
			return;
		}
		else{
			//If the player chooses the wrong answer, tell the player they selected 
			//the wrong option and then display the correct answer. Wait a few seconds, 
			//then show the next question.
			incorrect_answered++;
			console.log(incorrect_answered);
			lost();
			return;
		}
	})

	function lost(){
		//display "WON" and good picture for ~5 seconds
		console.log("lost");
		$(".timer").html("");
		display_question.html("<h3 class=centered>You need to get better at this</h3>");
		display_question.append("<p class=centered>The Correct Answer Was: "+selected_question.correctAnswer+"</p>");
		$(".box").html(display_question);
		gif();
		timeout = setTimeout(show_question, 6000);
	}

	function won(){
		//display "WON" and good picture for 5 seconds
		$(".timer").html("");
		display_question.html("<h3 class=centered>You are totally right</h3>");
		$(".box").html(display_question);
		gif();
		timeout = setTimeout(show_question, 6000);
	}

	function results(){
		//On the final screen, show the number of correct answers, incorrect answers, 
		//and an option to restart the game (without reloading the page).
		var coolness= (right_answered/4)*100;
		display_question.html("<h3 class=centered>Your developer coolness is "+coolness+"%</h3>");
		display_question.append("<p class=centered>This is how you did:</p>");
		display_question.append("<p class=centered>Correct Answers: "+right_answered+"</p>");
		display_question.append("<p class=centered>Incorrect Answers: "+incorrect_answered+"</p>");
		display_question.append("<p class=centered>Unanswered: "+unanswered+"</p>");
		display_question.append("<p class=\"btn centered btn-primary btn-lg container-fluid start_over\">Start over</p>");	
		$(".box").html(display_question);
	}

	$(document).on("click", ".start_over", function(){
		right_answered=0;
		unanswered=0;
		incorrect_answered=0;
		next_question=1;
		$(".timer").html("");
		show_question();
	})
		
	function gif(){
		//adding random gifs to the answer results
		var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+selected_question.tag;
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var imageUrl = response.data.image_original_url;
			var gif = $("<img class=center>");
			gif.attr("src", imageUrl);
			gif.attr("alt", selected_question.tag);
			$(".box").append(gif);
		})
	}
})