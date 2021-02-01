var readlineSync = require('readline-sync');
class Node{
    constructor(value){
    this.value = value;
    this.answer = ""
    this.yes = null;
    this.no = null;
    }
}
let head =null;//= new Node("Think of an animal");
let node1 = new Node("Is it a duck?");
head = node1;
//let node2 = new Node(" Oops - looks like I need to improve.");


let node2 = new Node("What is the animal?");


function main(){
    console.log("Computer: Think of an animal");
    let intialAnimal = 'duck';
    while(true){
        current = head;
       console.log("computer : " + current.value);  
       
       var userInput = readlineSync.question('Human: ');
       if(userInput == 'Yes'){
          
       } else if( userInput == 'No'){
        if(!current.no){
        
            console.log("Computer: Oops - looks like I need to improve.");
            console.log("Computer: What is the animal?")
            userInput = readlineSync.question('Human: ');
            let animal = new Node(userInput, null,null);
            current.yes = animal; 

            if(userInput != intialAnimal){
                console.log(`Computer: What question would distinguish between a {intialAnimal} and { userInput}?`);
                userInput = readlineSync.question('Human: ');
            }
        }
    }
}
}
          
main();


//console.log('Hi ' + userName + '!');


