console.log('client.js is sourced!');
let calculatorInput = (event) => {
    event.preventDefault()
    // console.log("in add item")
  let pressedOperator = []
    axios({
      method: 'POST',
      url: '/calculations',
      data: {
        numOne: parseFloat(document.getElementById('number_one').value),
        numTwo: parseFloat(document.getElementById('number_two').value),
        operator: mathsymbol
      }
    })
      .then((response) => {
        // console.log("SUCCESS")
  

       //! call the GET function in here
      })
      .catch((error) => {
        console.log('POST for /calculations has not been added.')
        alert("Calculations POST has FAILED")
      })
    document.getElementById("inputForm").reset()
  }
   