function onReady() {
    console.log('client.js is sourced!');


    // Make sure you check the index.html file! 
    // There are lots of buttons and things ready for you to hook into here!
    // 🧠 Remember
    // - Handle events that ->
    // - Updates state which is ->
    // - Rendered to the DOM
}

onReady()


gatherCalucations()


function calculatorInput(event) {
    event.preventDefault()
    axios({
        method: 'POST',
        url: '/calculations',
        data: {
            numOne: parseFloat(document.getElementById('number_one').value),
            numTwo: parseFloat(document.getElementById('number_two').value),
            operator: mathOperator
        }
    })
        .then((response) => {
            // console.log("SUCCESS")

            gatherCalucations()
        })
        .catch((error) => {
            console.log('POST for /calculations has not been added.')
            alert("Calculations POST has FAILED")
        })
}

let mathOperator


function additionButton(event) {
    event.preventDefault()
    mathOperator = "+"
    return "+"
}

function subtractButton(event) {
    event.preventDefault()
    mathOperator = "-"
}

function multiplyButton(event) {
    event.preventDefault()
    mathOperator = "*"
}
function divideDutton(event) {
    event.preventDefault()
    mathOperator = "/"
}


function gatherCalucations() {

    console.log("Gathering equations...")
    axios({
        method: 'GET', // HTTP method
        url: '/calculations'
    })
        .then((response) => { // Captures the response from server
            // Must be response.data
            let incomingCalcInputs = response.data
            console.log("incoming math statements...", incomingCalcInputs)
            // Render calculations to

            renderCalculations(incomingCalcInputs)
        })
        .catch((error) => { // Manages errors
            console.error("GET for /calculations didnt work...", error)

        })
}


function clearScreen(event) {

    event.preventDefault()
    let inputOne = document.getElementById('number_one')
    let inputTwo = document.getElementById('number_two')
    inputOne.value = ""
    inputTwo.value = ""

}

function renderCalculations(calcObject) {
    console.log("renderCalculations is Working...", calcObject)
    let newCalcSpot = document.getElementById('new_calculation')
    let calculationHistory = document.getElementById('calculation_history')
    
    // newCalcSpot.innerHTML = ""
    calculationHistory.innerHTML = ""
    calcObject.reverse()
    // newCalcSpot.innerHTML += `<div>${calcObject[calcObject.length].numOne} ${calcObject[calcObject.length].operator} ${calcObject[calcObject.length].numTwo} = ${calcObject[calcObject.length].answer}</div>`
    newCalcSpot.innerHTML = `<div><h1><b>${calcObject[0].result}</b></h1></div>`
    for (let i = 0; i < calcObject.length; i++) {

        console.log(`${calcObject[i].numOne} ${calcObject[i].operator} ${calcObject[i].numTwo} = ${calcObject[i].result}`)

        calculationHistory.innerHTML += `<div>${calcObject[i].numOne} ${calcObject[i].operator} ${calcObject[i].numTwo} = ${calcObject[i].result}</div>`
    }

}