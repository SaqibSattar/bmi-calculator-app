// JavaScript
document.getElementById("bmiForm").addEventListener('submit', function (e) {

    e.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const heightFeet = parseInt(document.getElementById('height-feet').value);
    const heightInches = parseInt(document.getElementById('height-inches').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (gender && age && heightFeet && heightInches && weight) {

        const heightInMeters = ((heightFeet * 12) + heightInches) * 0.0254;  // in meters
        const bmi = weight / (heightInMeters * heightInMeters);
        const resultElement = document.getElementById("result");

        let category = '';

        if (bmi < 18.5) {
            category = 'Under Weight';
            resultElement.style.backgroundColor = '#f1c40f'; // Yellow for underweight
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal Weight ';
            resultElement.style.backgroundColor = '#2ecc71'; // Green for normal weight
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Over Weight';
            resultElement.style.backgroundColor = '#e74c3c'; // Red for overweight
        } else {
            category = 'Obese';
            resultElement.style.backgroundColor = '#e74c3c'; // Red for obese
        }

        let resultMessage = 'Your BMI: ' + bmi.toFixed(2) + '<br>';
        resultMessage += 'Category: ' + category;

        resultElement.innerHTML = resultMessage;

        // Save BMI data to localStorage
        saveBmiData({ gender, age, heightFeet, heightInches, weight, bmi, category });
    }
});

// Load BMI data from localStorage on page load
window.onload = function () {
    const savedBmiData = loadBmiData();
    if (savedBmiData) {
        displaySavedBmiData(savedBmiData);
    }
};

// Function to save BMI data to localStorage
function saveBmiData(data) {
    localStorage.setItem("bmiData", JSON.stringify(data));
}

// Function to load BMI data from localStorage
function loadBmiData() {
    const savedBmiData = localStorage.getItem("bmiData");
    return savedBmiData ? JSON.parse(savedBmiData) : null;
}

// Function to display saved BMI data
function displaySavedBmiData(data) {
    const resultElement = document.getElementById("result");
    resultElement.style.backgroundColor = getCategoryColor(data.category);
    let resultMessage = 'Your BMI: ' + data.bmi.toFixed(2) + '<br>';
    resultMessage += 'Category: ' + data.category;
    resultElement.innerHTML = resultMessage;
}

// Function to get color based on BMI category
function getCategoryColor(category) {
    switch (category) {
        case 'Under Weight':
            return '#f1c40f'; // Yellow for underweight
        case 'Normal Weight ':
            return '#2ecc71'; // Green for normal weight
        case 'Over Weight':
        case 'Obese':
            return '#e74c3c'; // Red for overweight and obese
        default:
            return '#3498db'; // Default blue color
    }
}
