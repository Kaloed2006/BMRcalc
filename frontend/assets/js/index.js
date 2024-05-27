calculate();

// Функции для активации кнопок целей
function activateBtn(btnId) {
    const buttons = ['loseWeightBtn', 'gainWeightBtn', 'maintainWeightBtn'];
    buttons.forEach(id => document.getElementById(id).classList.toggle('active', id === btnId));
}

// Вызов функции для активации кнопки цели по умолчанию
function activateLoseWeightBtn() {
    activateBtn('loseWeightBtn');
}

// Добавление обработчиков событий для кнопок целей
['loseWeightBtn', 'gainWeightBtn', 'maintainWeightBtn'].forEach(btnId => {
    document.getElementById(btnId).addEventListener('click', () => activateBtn(btnId));
});

// Функция для расчета BMR
function calculateBMR(gender) {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const fatPercentage = parseFloat(document.getElementById('fatPercentage').value);

    const bmr = gender === 'male'
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    const calories = Math.round(bmr * activity * (1 - fatPercentage / 100));
    sessionStorage.setItem('calories', calories);
    sessionStorage.setItem('kilojoules', Math.round(calories * 4.184));
    sessionStorage.setItem('weight', weight);
    sessionStorage.setItem('height', height);
}

// Функция для выбора пола
function selectGender(gender) {
    document.getElementById('maleBtn').classList.toggle('active', gender === 'male');
    document.getElementById('femaleBtn').classList.toggle('active', gender === 'female');
}

// Основная функция для расчетов
function calculate() {
    const gender = document.getElementById('maleBtn').classList.contains('active') ? 'male' : 'female';
    calculateBMR(gender);
    calculateWHR(); // Предполагаем, что эта функция существует и работает корректно

    const calories = parseFloat(sessionStorage.getItem('calories'));
    let targetCalories;

    if (document.getElementById('loseWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories - 655);
    } else if (document.getElementById('gainWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories + 373);
    } else {
        targetCalories = Math.round(calories + 112);
    }

    sessionStorage.setItem('targetCalories', targetCalories);

    const macros = calculateMacros(targetCalories);
    sessionStorage.setItem('protein', macros.protein);
    sessionStorage.setItem('fat', macros.fat);
    sessionStorage.setItem('carb', macros.carb);

    updateResults();
}

function calculateMacros(targetCalories) {
    const protein = (targetCalories * 0.25) / 4;
    const fat = (targetCalories * 0.25) / 9;
    const carb = (targetCalories * 0.5) / 4;

    return { protein, fat, carb };
}

// Обновление результатов
function updateResults() {
    const targetCalories = parseFloat(sessionStorage.getItem('targetCalories'));
    const weight = parseFloat(sessionStorage.getItem('weight'));
    const height = parseFloat(sessionStorage.getItem('height'));

    document.getElementById('targetCalories').textContent = targetCalories;
    document.getElementById('kilojoules').textContent = sessionStorage.getItem('kilojoules');
    document.getElementById('waterIntake').textContent = (27 * weight).toFixed(2) + " мл";

    const bmi = weight / Math.pow(height / 100, 2);
    const bmiCategory = bmi < 18.5 ? 'Недостаточный вес' : bmi < 25 ? 'Нормальный вес' : bmi < 30 ? 'Избыточный вес' : 'Ожирение';

    document.getElementById('BMIresult').textContent = bmi.toFixed(2);
    document.getElementById('BMIcategory').textContent = bmiCategory;

    const macros = calculateMacros(targetCalories);
    document.getElementById('protein').textContent = 'Белки: ' + macros.protein.toFixed(2) + ' г';
    document.getElementById('fat').textContent = 'Жиры: ' + macros.fat.toFixed(2) + ' г';
    document.getElementById('carb').textContent = 'Углеводы: ' + macros.carb.toFixed(2) + ' г';

    // Рассчитать калории из макросов
    const caloriesFromMacros = (macros.protein * 4) + (macros.fat * 9) + (macros.carb * 4);

    // Рассчитать оставшиеся калории, не учтенные макросами
    const caloriesWithoutMacros = targetCalories - caloriesFromMacros;

    // Если разница незначительна (в пределах 1 калории), устанавливаем ее на 0
    const roundedCaloriesWithoutMacros = Math.abs(caloriesWithoutMacros) < 1 ? 0 : caloriesWithoutMacros;

    document.getElementById('caloriesWithoutMacros').textContent = 'Калории: ' + roundedCaloriesWithoutMacros.toFixed(2) + ' ккал';
}

// Обработчики событий для кнопок выбора пола
document.getElementById('maleBtn').addEventListener('click', () => selectGender('male'));
document.getElementById('femaleBtn').addEventListener('click', () => selectGender('female'));

// Обработчик события для кнопки расчета
document.getElementById('calculateBtn').addEventListener('click', calculate);

// Активировать кнопку по умолчанию
activateLoseWeightBtn();



// Расчет WHR
function calculateWHR() {
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip').value);
    const whr = waist / hip;
    const whrCategory = whr < 0.9 ? 'Нормальное' : whr < 0.95 ? 'Граничное' : 'Повышенное';

    document.getElementById('WHRresult').textContent = whr.toFixed(2);
    document.getElementById('WHRcategory').textContent = whrCategory;
}

// События для изменения значений полей ввода "Талия" и "Бедра"
['waist', 'hip'].forEach(id => document.getElementById(id).addEventListener('input', calculateWHR));



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
    });
    // Обработчик события input для input number
    slider.addEventListener('input', function () {
        // При изменении значения input number, обновляем значение ползунка
        input.value = slider.value;
    });
}

syncInputWithSlider('weight', 'weightSlider');
syncInputWithSlider('height', 'heightSlider');
syncInputWithSlider('age', 'ageSlider');
syncInputWithSlider('fatPercentage', 'rangeInput');
syncInputWithSlider('waist', 'waistSlider');
syncInputWithSlider('hip', 'hipSlider');
// ========== Синхронизация слайдеров с инпутами ==========