alert("Please enable your speaker before proceed");
alert("Rule of the game : 1.Press any key on the keyboard to start the game.2.At each level the computer will show you a colour is pressed,you have to press all the colours that have pressed by the computer from level 1 all the way up to the current level in order to go to next level. Forexample, if computer presses blue color at level 1,you have to press the blue colour to pass to level 2 ; at level 2, if computer this time presses yellow colour, you have to press blue color(color from level 1) + yellow colour(current level) in order to pass to level 3); 
// create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red","blue","green","yellow"];
// create a new empty array called gamePattern.
var gamePattern = [];
// create a empty array for storing user input
var userClickedPattern=[];
// intialize a variable for status of the game
var started = false;
// initialize game of level be 0
var level = 0;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
if(!started){
// The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
  $("#level-title").text("Level " + level);
  nextSequence();}
  started = true;
});




//create a new function called nextSequence()
function nextSequence(){


// once nextSequence() is called , reset the userClickedPattern array to empty array
userClickedPattern = [];
  // Increase level by 1 everytime nextSequence is called
level++;
// update the h1 so that it change level display
$("#level-title").text("Level " + level);

//Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
var randomNumber = Math.floor(Math.random()*4);
//Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
var randomChosenColour = buttonColours[randomNumber];
//Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
gamePattern.push(randomChosenColour);
//Use jQuery to select the button with the same id as the randomChosenColour
//Use jQuery to animate a flash to the button selected.
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
// use Javascript to play the sound for the button colour selected in step 1.
var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
audio.play();


}

//  user press the button
$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
// so that it play the correct sound
playsound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length - 1);

}
);

//  check answer
function checkAnswer(currentLevel){
if (userClickedPattern[currentLevel] == gamePattern[currentLevel])
{

  if(gamePattern.length == userClickedPattern.length){
    // call nextsequence() after a delay of 1000ms
    setTimeout(function(){nextSequence();},1000);
  }
}
else
{console.log("Wrong");
  playsound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
  $("#level-title").text("Game Over,Press Any Key to Restart");
  startOver();
}
}


// restart the game
function startOver(){
  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;



}




// Add sounds to Button Clicks
function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add animation to userClick

function animatePress(currentColour){
$("#"+currentColour).addClass(".pressed");
// remove class after 100 milliseconds
setTimeout(function(){
$("#"+currentColour).removeClass(".pressed");},100);
}
