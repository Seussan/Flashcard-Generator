// Requires card constructors, JSON cardData, and the inquirer package for prompts.
var BasicCard = require("./BasicCard.js");
var BasicCardData = require("./basic.json");
var ClozeCard = require("./ClozeCard.js");
var ClozeCardData = require("./cloze.json");
var inquirer = require("inquirer");

// Starting the game for the first time
initGame();

function initGame() {
  // Creating variables to initialize our cards, score, and initial card index
  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;
  var cardType = "";

  inquirer.prompt([
  // Find out what type of Flashcard user wants to be quizzed with...
  {
    type: "list",
    message: "Which type of flashcard would you like to see?",
    choices: ["Basic flashcards", "Cloze-Deleted flashcards"],
    name: "type"
  }]).then(function(card) {

    if (card.type === "Basic flashcards") {
      var cardType = "Basic";
      var cardData = BasicCardData;
      // Creating a new card for each question using the BasicCard constructor
      for (var i = 0; i < cardData.length; i++) {
        // Testing the call of the BasicCard constructor by leaving off the New keyword.
        // currentCard = New BasicCard(cardData[i].front, cardData[i].back);
        currentCard = BasicCard(cardData[i].front, cardData[i].back);
        cardArray.push(currentCard);
      }
    }
    else if (card.type === "Cloze-Deleted flashcards") {
      var cardType = "Cloze";
      var cardData = ClozeCardData;
      // Creating a new card for each question using the ClozeCard constructor
      for (var i = 0; i < cardData.length; i++) {
        // Testing the call of the ClozeCard constructor by leaving off the New keyword.
        // currentCard = New ClozeCard(cardData[i].fullText, cardData[i].cloze);
        currentCard = ClozeCard(cardData[i].fullText, cardData[i].cloze);
        cardArray.push(currentCard);
      }
    }

    // Play the first round
    playRound(initialScore, cardArray, initialIndex, cardType);
  });
};

function endGame(score) {
  // Alert user of their final score
  console.log("Game Over!");
  console.log("Your score is:", score);
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Play again?"
  }]).then(function(answer) {
    // This lets the user just type in "y" to continue.
    // Will also work for "yes" or "yeah" or any answer begining with "y"
    if (answer.text.charAt(0).toLowerCase() === "y") {
        // Restarts the game from scratch if desired
        initGame();
      } 
      else {
      // Otherwise the game ends here since we aren't calling any other functions
      console.log("Thanks for playing!");
      console.log("Goodbye!");
    }
  });
};

function playRound(currentScore, cardArray, currentIndex, cardType) {
  // If we have't gone through all the cards, ask the user the next question
  if (currentIndex < cardArray.length) {
    if (cardType === "Basic") {
      promptUserBasic(cardArray, currentIndex, currentScore, cardType);
    }
    else {
      promptUserCloze(cardArray, currentIndex, currentScore, cardType);
    }
  }
  // Otherwise end the game
  else {
    endGame(currentScore);
  }
};

function promptUserBasic(cardArray, currentIndex, currentScore, cardType) {
  // Storing our current card in the card variable
  var card = cardArray[currentIndex];
  // Show the user the card partial, ask for an answer
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.front + "\nAnswer:"
  }]).then(function(answer) {
    // Checking to see if their answer was correct, regardless of casing
    if (answer.text.trim().toLowerCase() === card.back.trim().toLowerCase()) {
      // If the user is correct, increase the score by 1
      currentScore++;
      console.log("\nYou are correct!");
    }
    else {
      // Otherwise let them know they were incorrect
      console.log("Incorrect! The correct answer is '" + card.back + "'.");
    }
    // Increase our current card index
    currentIndex++;
    // Just a seperator
    console.log("-------------------------");
    // Play the next round with our updated score and card index
    playRound(currentScore, cardArray, currentIndex, cardType);
  });
}

function promptUserCloze(cardArray, currentIndex, currentScore, cardType) {
  // Storing our current card in the card variable
  var card = cardArray[currentIndex];
  // Show the user the card partial, ask for an answer
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.partialText + "\nAnswer:"
  }]).then(function(answer) {
    // Checking to see if their answer was correct, regardless of casing
    if (answer.text.trim().toLowerCase() === card.clozeDeletion.trim().toLowerCase()) {
      // If the user is correct, increase the score by 1
      currentScore++;
      console.log("\nYou are correct!");
    }
    else {
      // Otherwise let them know they were incorrect
      console.log("\nIncorrect!");
    }
    // Use the displayCard method to show the user the entire card text
    console.log(card.displayCard());
    // Increase our current card index
    currentIndex++;
    // Just a seperator
    console.log("-------------------------\n");
    // Play the next round with our updated score and card index
    playRound(currentScore, cardArray, currentIndex, cardType);
  });
};