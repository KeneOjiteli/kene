//myCalculator contains data needed for valid expression
const myCalculator = {
  displayValue: "0", //represents user input.
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
};

function displayInputDigit(num) {
  const { displayValue, waitingForSecondOperand } = myCalculator;

  if (waitingForSecondOperand === true) {
    myCalculator.displayValue = num;
    myCalculator.waitingForSecondOperand = false;
  } else {
    myCalculator.displayValue = displayValue === "0" ? num : displayValue + num;
    //In tenary operator, condition ? true statement : false statement ;
  }
  console.log(myCalculator);
}

function displayDecimal(decimal) {
  if (myCalculator.waitingForSecondOperand === true) return;

  //if displayval doesnt av decimal....append decimal...
  if (!myCalculator.displayValue.includes(decimal)) {
    myCalculator.displayValue += decimal;
  } /*else {
    myCalculator.displayValue += num;
  }*/
  console.log(myCalculator); // }
}

function operatorHandler(nextoperator) {
  const { firstOperand, displayValue, operator } = myCalculator;
  const inputValue = parseFloat(displayValue);

  if (operator && myCalculator.waitingForSecondOperand) {
    myCalculator.operator = nextoperator;
    console.log(myCalculator);
    return;
  }

  //null = no value.
  if (firstOperand == null) {
    myCalculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const res = doCalculation[operator](currentValue, inputValue);

    myCalculator.displayValue = String(res);
    myCalculator.firstOperand = res;
  }

  myCalculator.waitingForSecondOperand = true;
  myCalculator.operator = nextoperator;

  console.log(myCalculator);
}

//doCalculation is an object with all operator instance.
const doCalculation = {
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand
};

//function to reset calculator using AC button.
function resetCalculator() {
  myCalculator.displayValue = "0";
  myCalculator.firstOperand = null;
  myCalculator.waitingForSecondOperand = false;
  myCalculator.operator = null;
  console.log(myCalculator);
}

//function displayEquals(equalSign) {}
// shows 0 as default.
function showDisplayValue() {
  const display = document.querySelector(".displayAreaScreen");
  display.value = myCalculator.displayValue;
}
showDisplayValue();

const keyPresses = document.querySelector(".calculatorButtons");
keyPresses.addEventListener("click", event => {
  //const {target} = event;

  //rename target as targets in event function
  const { target: targets } = event;

  if (!targets.matches("button")) {
    return;
  }

  if (targets.classList.contains("operator")) {
    //console.log("operator", targets.value);
    operatorHandler(targets.value);
    showDisplayValue();
    return;
  }

  if (targets.classList.contains("decimal")) {
    //console.log("decimal", targets.value);
    displayDecimal(targets.value);
    showDisplayValue();
    return;
  }

  if (targets.classList.contains("allClear")) {
    //console.log("reset", targets.value);
    resetCalculator();
    showDisplayValue();
    return;
  }

  /*if (targets.classList.contains("equalSign")) {
    //console.log("equality", targets.value);
    operatorHandler(targets.value);
    showDisplayValue();
    return;
  } */

  if (targets.classList.contains("num")) {
    //console.log("num", target.value);
    displayInputDigit(targets.value);
    showDisplayValue();
    return;
  }
});
