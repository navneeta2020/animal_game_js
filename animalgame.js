//animalgame.js
// Node has data and a yes (left) and no (right) answer
function Node(value, y, n) {
  this.data = value;
  this.yes = "y";
  this.no = "n";
}

var readlineSync = require('readline-sync');
var fs = require("fs");
// Add some encouragement
var words = ["That's great!", "You know your animals!", "Let's play again!", "One more animal!"];
var word = words[Math.floor(Math.random() * words.length)];

// Giving thanks
var thanks = ["Thanks!", "Nice one!"];
var thank = thanks[Math.floor(Math.random() * words.length)];

// Play again
var playAgain = ["Let's play again!", "That was fun, let's play again!"]
var playAgainLoad = playAgain[Math.floor(Math.random() * words.length)];

// Read in an animal decision tree
var tree = fs.readFileSync('tree.json');
var root = JSON.parse(tree);
var node = "duck";

console.log('Welcome to the animal game!\nThis game is a lot of fun!\nThink of an animal,\nthen I will try to guess it!\nIf I do not know know your animal you can teach me!\nReady to play?!');

// Play the game
while (askQuestion("Do you want to play?")) {
  node = root;
  play();
}

function play() {
  // If it's not a "terminal" node (i.e. animal)
  while (node.yes && node.no) {
    // Ask the question: Yes or No?
    if (askQuestion(node.data)) {
      node = node.yes;
    } else {
      node = node.no;
    }
  }
  // We're at the end, guess!
  if (!askQuestion("Is it a " + node.value + "?")) {
    // Wrong!
    improve(node);
  } else {
    // Right!
    console.log(word);
  }
}

// Ask a question, return true for yes
function askQuestion(question) {
  var answer = readlineSync.question(question + " (y/n): ").toUpperCase();
  return (answer.charAt(0) == "Y");
}

// Train a node to get the right answer
function improve(node) {
  // The wrong guess
  var guess = node.data;
  // What is it?
  var answer = readlineSync.question("Ok, what are you? ");
  // Get a new question?
  var question = readlineSync.question("Suggest a yes/no question to distinguish a " + guess + " from a " + answer + ".\n");
  node.data = question;
  // Yes or no for that question
  if (askQuestion("Answer for a " + answer + ": " + question)) {
    node.yes = new Node(answer);
    node.no = new Node(guess);
    console.log(thank);
    console.log ("Great! Now I know about " + answer + "s !");
    console.log(playAgainLoad);
  } else {
    node.yes = new Node(guess);
    node.no = new Node(answer);
    //adding it here did not gen a thanks
    //console.log(thank);
  }
  // Save back to the file
  var tree = JSON.stringify(root, null, 2);
  fs.writeFileSync('tree.json', tree);
}