document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                updateDisplay();
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate();
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    currentOperator = value;
                }
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                clear();
            }
        });
    });

    function updateDisplay() {
        result.value = currentInput;
    }

    function calculate() {
        if (previousInput !== '' && currentInput !== '' && currentOperator !== '') {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            let calculatedResult;

            switch (currentOperator) {
                case '+':
                    calculatedResult = prev + current;
                    break;
                case '-':
                    calculatedResult = prev - current;
                    break;
                case '*':
                    calculatedResult = prev * current;
                    break;
                case '/':
                    calculatedResult = prev / current;
                    break;
            }

            currentInput = calculatedResult.toString();
            previousInput = '';
            currentOperator = '';
            updateDisplay();
        }
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        currentOperator = '';
        updateDisplay();
    }
});