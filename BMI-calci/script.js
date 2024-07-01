function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const heightError = document.getElementById('heightError');
    const weightError = document.getElementById('weightError');
    const bmiResult = document.getElementById('bmiResult');
    const bmiCategory = document.getElementById('bmiCategory');
    const healthTips = document.getElementById('healthTips');
    const resultElement = document.querySelector('.result');

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    let isValid = true;

    // Validation for height
    if (!height || height <= 0 || heightInput.value.length > 3) {
        displayError(heightError, 'Please enter a valid height (up to 3 digits).');
        isValid = false;
    } else {
        hideError(heightError);
    }

    // Validation for weight
    if (!weight || weight <= 0 || weightInput.value.length > 3) {
        displayError(weightError, 'Please enter a valid weight (up to 3 digits).');
        isValid = false;
    } else {
        hideError(weightError);
    }

    if (isValid) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        const category = determineCategory(bmi);
        
        displayBMIResult(bmi, category);
        displayHealthTips(category);

        // Display result with animation
        resultElement.classList.add('show');

        // Scroll to result with smooth behavior
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        clearResult();
    }
}

function displayError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function determineCategory(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 24.9) {
        return 'Normal weight';
    } else if (bmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Obesity';
    }
}

function displayBMIResult(bmi, category) {
    bmiResult.textContent = `BMI: ${bmi}`;
    bmiCategory.textContent = category;

    switch (category) {
        case 'Underweight':
            bmiCategory.style.color = '#ff1744';
            break;
        case 'Normal weight':
            bmiCategory.style.color = '#76ff03';
            break;
        case 'Overweight':
            bmiCategory.style.color = '#ffea00';
            break;
        case 'Obesity':
            bmiCategory.style.color = '#ff1744';
            break;
        default:
            bmiCategory.style.color = '#ffffff'; // Default color
            break;
    }
}

function displayHealthTips(category) {
    let tips = '';

    switch (category) {
        case 'Underweight':
            tips = 'Consider eating more frequently and choosing nutrient-rich foods.';
            break;
        case 'Normal weight':
            tips = 'Maintain your healthy weight by staying active and eating a balanced diet.';
            break;
        case 'Overweight':
            tips = 'Incorporate more physical activity and watch your portion sizes.';
            break;
        case 'Obesity':
            tips = 'Consult a healthcare provider for personalized advice.';
            break;
        default:
            tips = 'No tips available.';
            break;
    }

    healthTips.textContent = tips;
}

function clearResult() {
    bmiResult.textContent = '';
    bmiCategory.textContent = '';
    healthTips.textContent = '';
}
