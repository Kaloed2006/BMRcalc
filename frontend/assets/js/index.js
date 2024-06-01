// ===== РАСЧЁТЫ =====
calculate();
// Добавляем функцию для активации кнопки "Сбросить вес" по умолчанию при загрузке страницы
function activateLoseWeightBtn() {
    document.getElementById('loseWeightBtn').classList.add('active');
    document.getElementById('gainWeightBtn').classList.remove('active');
    document.getElementById('maintainWeightBtn').classList.remove('active');
    calculate();
}

// Добавляем функцию для активации кнопки "Набрать вес" при загрузке страницы
function activateGainWeightBtn() {
    document.getElementById('loseWeightBtn').classList.remove('active');
    document.getElementById('gainWeightBtn').classList.add('active');
    document.getElementById('maintainWeightBtn').classList.remove('active');
    calculate();
}

// Добавляем функцию для активации кнопки "Удержать вес" при загрузке страницы
function activateMaintainWeightBtn() {
    document.getElementById('loseWeightBtn').classList.remove('active');
    document.getElementById('gainWeightBtn').classList.remove('active');
    document.getElementById('maintainWeightBtn').classList.add('active');
    calculate();
}

// Вызываем функции для активации кнопок по умолчанию
activateLoseWeightBtn(); // По умолчанию активна кнопка "Сбросить вес"

// Добавляем события для кнопок выбора цели
document.getElementById('loseWeightBtn').addEventListener('click', function () {
    activateLoseWeightBtn();
});

document.getElementById('gainWeightBtn').addEventListener('click', function () {
    activateGainWeightBtn();
});

document.getElementById('maintainWeightBtn').addEventListener('click', function () {
    activateMaintainWeightBtn();
});

function calculateBMR(gender) {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const selectedActivity = parseFloat(document.getElementById('activity').value);
    const fatPercentage = parseFloat(document.getElementById('fatPercentage').value);

    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const calories = Math.round(bmr * selectedActivity + (fatPercentage * height / weight));
    const kilojoules = Math.round(calories * 4.184);

    sessionStorage.setItem('calories', calories);
    sessionStorage.setItem('kilojoules', kilojoules);

    sessionStorage.setItem('weight', weight);
    sessionStorage.setItem('height', height);
}

function selectGender(gender) {
    document.getElementById('maleBtn').classList.toggle('active', gender === 'male');
    document.getElementById('femaleBtn').classList.toggle('active', gender === 'female');
}

document.getElementById('weight').addEventListener('input', calculate);
document.getElementById('height').addEventListener('input', calculate);
document.getElementById('age').addEventListener('input', calculate);
document.getElementById('activity').addEventListener('input', calculate);
document.getElementById('fatPercentage').addEventListener('input', calculate);

// Функция для расчета БЖУ
function calculateMacros(calories) {
    // Соотношение макронутриентов: 30% белков, 25% жиров и 45% углеводов
    const proteinCalories = calories * 0.3;
    const fatCalories = calories * 0.25;
    const carbCalories = calories * 0.45;

    // Калорийность макронутриентов: 1 г белков = 4 ккал, 1 г жиров = 9 ккал, 1 г углеводов = 4 ккал
    const proteinGrams = Math.round(proteinCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);
    const carbGrams = Math.round(carbCalories / 4);

    // Сохраняем результаты в sessionStorage
    sessionStorage.setItem('proteinGrams', proteinGrams);
    sessionStorage.setItem('fatGrams', fatGrams);
    sessionStorage.setItem('carbGrams', carbGrams);
}

function calculate() {
    let gender;

    if (document.getElementById('maleBtn').classList.contains('active')) {
        gender = 'male';
    } else if (document.getElementById('femaleBtn').classList.contains('active')) {
        gender = 'female';
    }

    calculateBMR(gender);
    calculateWHR();

    const calories = parseFloat(sessionStorage.getItem('calories'));

    let targetCalories;
    if (document.getElementById('loseWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories - 500);
    } else if (document.getElementById('gainWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories + 500);
    } else if (document.getElementById('maintainWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories + 100);
    }

    sessionStorage.setItem('goal', targetCalories > calories ? 'gainWeight' : targetCalories < calories ? 'loseWeight' : 'maintainWeight');
    sessionStorage.setItem('targetCalories', targetCalories);

    // Вызываем функцию для расчета БЖУ
    calculateMacros(targetCalories);

    // Вызываем функцию для обновления результатов
    updateResults();
}

// Добавляем функцию для обновления результатов на странице
function updateResults() {
    const targetCaloriesElement = document.getElementById('targetCalories');
    const kilojoulesElement = document.getElementById('kilojoules');
    const waterIntakeElement = document.getElementById('waterIntake');
    const bmiResultElement = document.getElementById('BMIresult');
    const bmiCategoryElement = document.getElementById('BMIcategory');
    const proteinResultElement = document.getElementById('proteinResult');
    const fatResultElement = document.getElementById('fatResult');
    const carbResultElement = document.getElementById('carbResult');

    const targetCalories = sessionStorage.getItem('targetCalories');
    const kilojoules = sessionStorage.getItem('kilojoules');

    targetCaloriesElement.textContent = targetCalories;
    kilojoulesElement.textContent = kilojoules;

    const weight = parseFloat(sessionStorage.getItem('weight'));

    // Вычисляем норму потребления воды
    const waterIntake = 27 * weight;
    waterIntakeElement.textContent = waterIntake + "мл";

    const height = parseFloat(sessionStorage.getItem('height'));

    const bmi = weight / Math.pow((height / 100), 2);
    let bmiCategory;

    if (bmi < 18.5) {
        bmiCategory = 'Недостаточный вес';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = 'Нормальный вес';
    } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = 'Избыточный вес';
    } else {
        bmiCategory = 'Ожирение';
    }

    bmiResultElement.innerHTML = bmi.toFixed(2);
    bmiCategoryElement.innerHTML = bmiCategory;

    // Обновляем результаты БЖУ
    const proteinGrams = sessionStorage.getItem('proteinGrams');
    const fatGrams = sessionStorage.getItem('fatGrams');
    const carbGrams = sessionStorage.getItem('carbGrams');

    proteinResultElement.textContent = `Белки: ${proteinGrams} г`;
    fatResultElement.textContent = `Жиры: ${fatGrams} г`;
    carbResultElement.textContent = `Углеводы: ${carbGrams} г`;
}

function calculateWHR() {
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip').value);

    const whr = waist / hip;
    let whrCategory;

    if (whr < 0.9) {
        whrCategory = 'Нормальное';
    } else if (whr >= 0.9 && whr < 0.95) {
        whrCategory = 'Граничное';
    } else {
        whrCategory = 'Повышенное';
    }

    document.getElementById('WHRresult').innerHTML = whr.toFixed(2);
    document.getElementById('WHRcategory').innerHTML = whrCategory;
}

// Добавляем события для кнопок выбора пола
document.getElementById('maleBtn').addEventListener('click', function () {
    selectGender('male');
    calculate(); // Вызываем calculate() при изменении пола
});

document.getElementById('femaleBtn').addEventListener('click', function () {
    selectGender('female');
    calculate(); // Вызываем calculate() при изменении пола
});

// Добавляем события для изменения значений полей ввода "Талия" и "Бедра"
document.getElementById('waist').addEventListener('input', function () {
    calculateWHR();
});

document.getElementById('hip').addEventListener('input', function () {
    calculateWHR();
});
// ===== РАСЧЁТЫ =====



// ===== ВЫБОР ПОЛА =====
const buttons = document.querySelectorAll('.toggle__button');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        if (button.classList.contains('active')) {
            return;
        }
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});
// ===== ВЫБОР ПОЛА =====



// ========== Синхронизация слайдеров с инпутами ==========
function syncInputWithSlider(inputId, sliderId) {
    // Находим ползунок и input number
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);
    // Обработчик события input для ползунка
    input.addEventListener('input', function () {
        // При изменении значения ползунка, обновляем значение input number
        slider.value = input.value;
        calculate();
    });
    // Обработчик события input для input number
    slider.addEventListener('input', function () {
        // При изменении значения input number, обновляем значение ползунка
        input.value = slider.value;
        calculate();
    });
}

syncInputWithSlider('weight', 'weightSlider');
syncInputWithSlider('height', 'heightSlider');
syncInputWithSlider('age', 'ageSlider');
syncInputWithSlider('fatPercentage', 'rangeInput');
syncInputWithSlider('waist', 'waistSlider');
syncInputWithSlider('hip', 'hipSlider');
// ========== Синхронизация слайдеров с инпутами ==========