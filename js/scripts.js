//Seleção dos elementos:
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

//Lógica da aplicação / "constructor: Função JavaScript que pode inicializar propriedades"
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  //Add digit to calculator screen:
  addDigit(digit) {
    //Check if current operation already has a dot:
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  //Process all calculator operations:
  processOperation(operation) {
    //Check if current value is empty:
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      //Change operation:
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    //get previous and current value:
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, previous, current);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  //Change values of the calculator screen:
  updateScreen(
    operationValue = null,
    operation = null,
    previous = null,
    current = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //Check if value is zero, if it is just add current value:
      if (previous === 0) {
        operationValue = current;
      }
      //Add current value to previous:
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  //Change math operation:
  changeOperation(operation) {
    const mathOperations = ["+", "-", "*", "/"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  //Delete the last digit:
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  //Clear all operations:
  processClearOperation() {
    this.previousOperationText.innerText = "";
    this.currentOperationText.innerText = "";
  }

  //Clear current operation:
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  //Process an operation:
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

//Criando uma nova instância de "Calculator"
const calc = new Calculator(previousOperationText, currentOperationText);

//Eventos utilizados:
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    //Separando as operações dos números:
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
