// function add(a, b){
//   return a + b;
// }
// console.log(add(3,1));
//
// var toAdd = [9, 5];
// console.log(add(...toAdd));
//
// var groupA = ['Dustin', 'Becca'];
// var groupB = ['Griffin'];
//
// var final = [3, ...groupB, ...groupA];
//
// console.log(final);

var person = ['Dustin', 27];
var personTwo = ['Becca', 32];

function greetPerson(name, age){
  console.log("Hi " + name +", you are " + age);
}
greetPerson(...person);
greetPerson(...personTwo);

var names = ['Dustin', 'Becca'];
var final = ['Griffin', ...names];

final.forEach(function (name) {
  console.log('Hi ' + name);
});
