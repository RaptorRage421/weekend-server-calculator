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





let calculatorInput = (event) => {
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
    document.getElementById("inputForm").reset()
}

let mathOperator


let additionButton = (event) => {
    event.preventDefault()
    mathOperator = "+"
    return "+"
}

let subtractButton = (event) => {
    event.preventDefault()
    mathOperator = "-"
}

let multiplyButton = (event) => {
    event.preventDefault()
    mathOperator = "*"
}
let divideDutton = (event) => {
    event.preventDefault()
    mathOperator = "/"
}


let gatherCalucations = () => {

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
            console.log("GET for /calculations didnt work...", error)
            alert("Oopsie, that didnt work.")
        })
}


let renderCalculations = (calcObject) => {
    console.log("renderCalculations is Working...", calcObject)
let newCalcSpot = document.getElementById('new_calculation')
let calculationHistory = document.getElementById('calculation_history')
console.log("newCalculation location." , newCalcSpot)
console.log("Calculation History location...", calculationHistory)
newCalcSpot.innerHTML = ""
calculationHistory.innerHTML = ""
calcObject.reverse()
// newCalcSpot.innerHTML += `<div>${calcObject[calcObject.length].numOne} ${calcObject[calcObject.length].operator} ${calcObject[calcObject.length].numTwo} = ${calcObject[calcObject.length].answer}</div>`
newCalcSpot.innerHTML += `<div>${calcObject[0].numOne} ${calcObject[0].operator} ${calcObject[0].numTwo} = ${calcObject[0].answer}</div>`
    for (let i = 1; i < calcObject.length; i++) {
        
        console.log(`${calcObject[i].numOne} ${calcObject[i].operator} ${calcObject[i].numTwo} = ${calcObject[i].answer}`)

        calculationHistory.innerHTML += `<div>${calcObject[i].numOne} ${calcObject[i].operator} ${calcObject[i].numTwo} = ${calcObject[i].answer}</div>`
    }

}