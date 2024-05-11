const express = require('express');
const bodyParser = require('body-parser')
const app = express();
let PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []

let computeAnswer = (numOne,numTwo,operator) => {
let storageSpot = {}
storageSpot.numOne = numOne
storageSpot.numTwo = numTwo
storageSpot.operator = operator
if (operator == "+"){
storageSpot.answer = (Number(numOne) + Number(numTwo))
console.log("doing addition: ", storageSpot)
calculations.push(storageSpot)
}
if (operator == "-"){
  storageSpot.answer = (Number(numOne) - Number(numTwo))
  console.log("doing subtraction: ", storageSpot)
  calculations.push(storageSpot)
}
if (operator == "*"){
  storageSpot.answer = (Number(numOne) * Number(numTwo))
  console.log("doing multiplication: ", storageSpot)
  calculations.push(storageSpot)
}
if (operator == "/"){
  storageSpot.answer = (Number(numOne) / Number(numTwo))
  console.log("doing division: ", storageSpot)
  calculations.push(storageSpot)
}

console.log("Computing answer...", calculations)
}
// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  //! this is where the calculation variables get stored
  res.send(calculations)
})
// POST /calculations
app.post('/calculations', (req, res) => {
  let incomingComputation = req.body
  //! can call a function here with server side logic to compare the inputs and do math.
  console.log("These are the variables of the calculation: " , incomingComputation)
 computeAnswer(incomingComputation.numOne,incomingComputation.numTwo,incomingComputation.operator)
  res.sendStatus(201)

})

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
