const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll("#buttons-container button")


class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    // add digite to calculator screen
    addDigit(digit){
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
        return;
        }
   

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    prossesOpeation(operation){
        // check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            // Change operation
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return;
        }

        // Get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.prossesDelOperator()
                break;
            case "CE":
                this.prossesClearCurrentOperation()
                break;
            case "C":
                this.prossesClearAllOperation()
                break;
            case "=":
                this.processEqualOperator()
                break;
            default:
                return;
        }


    }

    // Charge values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {

        console.log(operationValue, operation, current, previous)    
        

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            // Check if value is zero, if it is just add current value
            if(previous === 0){
                operationValue = current
            }

            // Add current value too previous 
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }
    
    // Change mah operation
    changeOperation(operation){

        const mathOperation = ["+", "-", "/", "*"]

        if(!mathOperation.includes(operation)){
            return;
        }
        
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }
    // Delet the last digit
    prossesDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // Clear current operation
    prossesClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }
    // Clear all operations
    prossesClearAllOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""    
    }
    // Process and operation
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]
        this.prossesOpeation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)



buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        }else{
            calc.prossesOpeation(value)
        }

    });
});