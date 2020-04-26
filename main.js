function calculate(inputValue){
  const expression = /\+|\-|\*|\//;

  const numbers = inputValue.split(expression);

  const numberA = parseInt(numbers[0]);
  const numberB = parseInt(numbers[1]);

  const operation = inputValue.match(expression);

  if (Number.isNaN(numberA) || Number.isNaN(numberB) || operation === null){
    updateResult('Operation not recognized');
    return;
  }
  // debugger;
  const calculator = new Calculator();
  calculator.add(numberA);

  let result;
  switch (operation[0]){
    case '+':
      result = calculator.add(numberB);
      break;
    case '-':
      result = calculator.subtract(numberB);
      break;
    case '*':
      result = calculator.multiply(numberB);
      break;
    case '/':
      result = calculator.divide(numberB);
      break;
  }


  updateResult(result);

}

//global method that lives in the window object
function updateResult(result) {
  const element = document.getElementById('result')

  if (element){
    element.innerText = result;
  }

}
// function showVersion(){
//   const calculator = new Calculator();
//   const element = document.getElementById('version');
//
//   calculator.version.then(function(version){
//     element.innerText = version;
//   });
// }

function showVersion() {
  const calculator = new Calculator();
  const element = document.getElementById('version');

  calculator.version //calculator version is a getter that fetches json from a url, reads the json, and gets the version from the json as a promise
    .then(function (version) {
      element.innerText = version;
    })
      .catch(function(error){
        element.innerText = 'unknown';
      });
};
