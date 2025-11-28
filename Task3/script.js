document.getElementById('convertButton').addEventListener('click', convertTemperature);
document.getElementById('swapButton').addEventListener('click', swapUnits);

function swapUnits() {
    const unitFrom = document.getElementById('unitFrom');
    const unitTo = document.getElementById('unitTo');
    
    // Swap the currently selected values
    const tempValue = unitFrom.value;
    unitFrom.value = unitTo.value;
    unitTo.value = tempValue;

    // Clear the previous result and message
    document.getElementById('resultDisplay').textContent = '---';
    document.getElementById('validationMessage').textContent = '';
}


function convertTemperature() {
    // 1. Get input values
    const inputElement = document.getElementById('temperatureInput');
    const tempValue = inputElement.value;
    const unitFrom = document.getElementById('unitFrom').value;
    const unitTo = document.getElementById('unitTo').value;
    const resultDisplay = document.getElementById('resultDisplay');
    const validationMessage = document.getElementById('validationMessage');

    // Reset previous results/messages
    resultDisplay.textContent = 'Calculating...';
    validationMessage.textContent = '';

    // 2. Input Validation (Must be a number)
    const tempNumber = parseFloat(tempValue);
    
    if (isNaN(tempNumber) || tempValue.trim() === '') {
        validationMessage.textContent = '⚠ Please enter a valid numerical temperature.';
        inputElement.focus();
        resultDisplay.textContent = '---'; // Reset on error
        return;
    }

    // 3. Conversion Logic
    let convertedTemp = 0;
    let unitSymbol = '';

    if (unitFrom === unitTo) {
        convertedTemp = tempNumber;
    } else {
        // Step A: Convert to Celsius (the intermediate base)
        let tempInCelsius = 0;
        switch (unitFrom) {
            case 'celsius':
                tempInCelsius = tempNumber;
                break;
            case 'fahrenheit':
                // C = (F - 32) * 5/9
                tempInCelsius = (tempNumber - 32) * (5 / 9);
                break;
            case 'kelvin':
                // C = K - 273.15
                tempInCelsius = tempNumber - 273.15;
                break;
        }

        // Step B: Convert from Celsius to the target unit
        switch (unitTo) {
            case 'celsius':
                convertedTemp = tempInCelsius;
                unitSymbol = '°C';
                break;
            case 'fahrenheit':
                // F = (C * 9/5) + 32
                convertedTemp = (tempInCelsius * (9 / 5)) + 32;
                unitSymbol = '°F';
                break;
            case 'kelvin':
                // K = C + 273.15
                convertedTemp = tempInCelsius + 273.15;
                unitSymbol = 'K';
                break;
        }
    }

    // 4. Display the result
    const finalResult = convertedTemp.toFixed(2);
    resultDisplay.textContent = `${finalResult} ${unitSymbol}`;
}