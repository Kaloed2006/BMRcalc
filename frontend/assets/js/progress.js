// =============== БОВ блок 1 ===============
function activateLoseWeightBtn() {
    document.getElementById('loseWeightBtn').classList.add('active');
    document.getElementById('gainWeightBtn').classList.remove('active');
    document.getElementById('maintainWeightBtn').classList.remove('active');
    calculate();
}

function activateGainWeightBtn() {
    document.getElementById('loseWeightBtn').classList.remove('active');
    document.getElementById('gainWeightBtn').classList.add('active');
    document.getElementById('maintainWeightBtn').classList.remove('active');
    calculate();
}

function activateMaintainWeightBtn() {
    document.getElementById('loseWeightBtn').classList.remove('active');
    document.getElementById('gainWeightBtn').classList.remove('active');
    document.getElementById('maintainWeightBtn').classList.add('active');
    calculate();
}

activateLoseWeightBtn();

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
    const weight = parseFloat(document.getElementById('startWeight').value);
    const height = parseFloat(document.getElementById('startHeight').value);
    const age = parseFloat(document.getElementById('startAge').value);
    const selectedActivity = parseFloat(document.getElementById('activity').value);
    const fatPercentage = parseFloat(document.getElementById('startFatPercentage').value);

    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const calories = Math.round(bmr * selectedActivity * (1 - fatPercentage / 100));
    const kilojoules = Math.round(calories * 4.184);

    sessionStorage.setItem('calories', calories);
    sessionStorage.setItem('kilojoules', kilojoules);

    sessionStorage.setItem('weight', weight);
    sessionStorage.setItem('height', height);
}

function selectGender(gender) {
    document.getElementById('startMaleBtn').classList.toggle('active', gender === 'male');
    document.getElementById('startFemaleBtn').classList.toggle('active', gender === 'female');
}

document.getElementById('startMaleBtn').addEventListener('click', function () {
    selectGender('male');
    calculate();
});

document.getElementById('startFemaleBtn').addEventListener('click', function () {
    selectGender('female');
    calculate();
});

document.getElementById('startWeight').addEventListener('input', calculate);
document.getElementById('startHeight').addEventListener('input', calculate);
document.getElementById('startAge').addEventListener('input', calculate);
document.getElementById('activity').addEventListener('input', calculate);
document.getElementById('startFatPercentage').addEventListener('input', calculate);

function calculate() {
    let gender;

    if (document.getElementById('startMaleBtn').classList.contains('active')) {
        gender = 'male';
    } else if (document.getElementById('startFemaleBtn').classList.contains('active')) {
        gender = 'female';
    }

    calculateBMR(gender);

    const calories = parseFloat(sessionStorage.getItem('calories'));

    let targetCalories;
    if (document.getElementById('loseWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories - 655);
    } else if (document.getElementById('gainWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories + 373);
    } else if (document.getElementById('maintainWeightBtn').classList.contains('active')) {
        targetCalories = Math.round(calories + 112);
    }

    sessionStorage.setItem('goal', targetCalories > calories ? 'gainWeight' : targetCalories < calories ? 'loseWeight' : 'maintainWeight');
    sessionStorage.setItem('targetCalories', targetCalories);

    const targetCaloriesElement = document.getElementById('targetCalories');
    const kilojoulesElement = document.getElementById('kilojoules');

    targetCaloriesElement.textContent = targetCalories;
    kilojoulesElement.textContent = sessionStorage.getItem('kilojoules');
}
// =============== БОВ блок 1 ===============

// =============== БОВ блок 2 ===============
function activateLoseWeightBtn2() {
    document.getElementById('loseWeightBtn2').classList.add('active');
    document.getElementById('gainWeightBtn2').classList.remove('active');
    document.getElementById('maintainWeightBtn2').classList.remove('active');
    calculate2();
}

function activateGainWeightBtn2() {
    document.getElementById('loseWeightBtn2').classList.remove('active');
    document.getElementById('gainWeightBtn2').classList.add('active');
    document.getElementById('maintainWeightBtn2').classList.remove('active');
    calculate2();
}

function activateMaintainWeightBtn2() {
    document.getElementById('loseWeightBtn2').classList.remove('active');
    document.getElementById('gainWeightBtn2').classList.remove('active');
    document.getElementById('maintainWeightBtn2').classList.add('active');
    calculate2();
}

activateLoseWeightBtn2();

document.getElementById('loseWeightBtn2').addEventListener('click', function () {
    activateLoseWeightBtn2();
});

document.getElementById('gainWeightBtn2').addEventListener('click', function () {
    activateGainWeightBtn2();
});

document.getElementById('maintainWeightBtn2').addEventListener('click', function () {
    activateMaintainWeightBtn2();
});

function calculateBMR2(gender) {
    const weight2 = parseFloat(document.getElementById('endWeight2').value);
    const height2 = parseFloat(document.getElementById('endHeight2').value);
    const age2 = parseFloat(document.getElementById('endAge2').value);
    const selectedActivity2 = parseFloat(document.getElementById('activity2').value);
    const fatPercentage2 = parseFloat(document.getElementById('endFatPercentage2').value);

    let bmr2;
    if (gender === 'male') {
        bmr2 = (10 * weight2) + (6.25 * height2) - (5 * age2) + 5;
    } else {
        bmr2 = (10 * weight2) + (6.25 * height2) - (5 * age2) - 161;
    }

    const calories2 = Math.round(bmr2 * selectedActivity2 * (1 - fatPercentage2 / 100));
    const kilojoules2 = Math.round(calories2 * 4.184);

    sessionStorage.setItem('calories2', calories2);
    sessionStorage.setItem('kilojoules2', kilojoules2);

    sessionStorage.setItem('weight2', weight2);
    sessionStorage.setItem('height2', height2);
}

function selectGender2(gender) {
    document.getElementById('endMaleBtn2').classList.toggle('active', gender === 'male');
    document.getElementById('endFemaleBtn2').classList.toggle('active', gender === 'female');
}

document.getElementById('endMaleBtn2').addEventListener('click', function () {
    selectGender2('male');
    calculate2();
});

document.getElementById('endFemaleBtn2').addEventListener('click', function () {
    selectGender2('female');
    calculate2();
});

document.getElementById('endWeight2').addEventListener('input', calculate2);
document.getElementById('endHeight2').addEventListener('input', calculate2);
document.getElementById('endAge2').addEventListener('input', calculate2);
document.getElementById('activity2').addEventListener('input', calculate2);
document.getElementById('endFatPercentage2').addEventListener('input', calculate2);

function calculate2() {
    let gender2;

    if (document.getElementById('endMaleBtn2').classList.contains('active')) {
        gender2 = 'male';
    } else if (document.getElementById('endFemaleBtn2').classList.contains('active')) {
        gender2 = 'female';
    }

    calculateBMR2(gender2);

    const calories2 = parseFloat(sessionStorage.getItem('calories2'));

    let targetCalories2;
    if (document.getElementById('loseWeightBtn2').classList.contains('active')) {
        targetCalories2 = Math.round(calories2 - 655);
    } else if (document.getElementById('gainWeightBtn2').classList.contains('active')) {
        targetCalories2 = Math.round(calories2 + 373);
    } else if (document.getElementById('maintainWeightBtn2').classList.contains('active')) {
        targetCalories2 = Math.round(calories2 + 112);
    }

    sessionStorage.setItem('goal2', targetCalories2 > calories2 ? 'gainWeight' : targetCalories2 < calories2 ? 'loseWeight' : 'maintainWeight');
    sessionStorage.setItem('targetCalories2', targetCalories2);

    const targetCaloriesElement2 = document.getElementById('targetCalories2');
    const kilojoulesElement2 = document.getElementById('kilojoules2');

    targetCaloriesElement2.textContent = targetCalories2;
    kilojoulesElement2.textContent = sessionStorage.getItem('kilojoules2');
}

// =============== БОВ блок 2 ===============

// ========== Синхронизация слайдеров с инпутами ==========
function syncInputWithSlider(inputId, sliderId) {
    const input = document.getElementById(inputId);
    const slider = document.getElementById(sliderId);

    input.addEventListener('input', function () {
        slider.value = input.value;
        calculate();
        calculate2();
    });

    slider.addEventListener('input', function () {
        input.value = slider.value;
        calculate();
        calculate2();
    });
}

syncInputWithSlider('startWeight', 'startWeightSlider');
syncInputWithSlider('startHeight', 'startHeightSlider');
syncInputWithSlider('startAge', 'startAgeSlider');
syncInputWithSlider('startFatPercentage', 'startFatPercentageSlider');
syncInputWithSlider('startWaist', 'startWaistSlider');
syncInputWithSlider('startHip', 'startHipSlider');

syncInputWithSlider('endWeight2', 'endWeightSlider2');
syncInputWithSlider('endHeight2', 'endHeightSlider2');
syncInputWithSlider('endAge2', 'endAgeSlider2');
syncInputWithSlider('endFatPercentage2', 'endFatPercentageSlider2');
syncInputWithSlider('endWaist2', 'endWaistSlider2');
syncInputWithSlider('endHip2', 'endHipSlider2');

// ========== Синхронизация слайдеров с инпутами ==========

// ========== Графики ==========
document.addEventListener('DOMContentLoaded', () => {
    // ========== График BMI ==========
    const graph2 = document.getElementById("graph-2").getContext("2d");
    const gradient2 = graph2.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, "rgba(75, 192, 192, 0.8)");
    gradient2.addColorStop(1, "rgba(75, 192, 192, 0.2)");

    const myChart = new Chart(graph2, {
        type: "line",
        data: {
            labels: ["Старый вес", "Новый вес"],
            datasets: [
                {
                    label: 'Dynamic Data',
                    data: [],
                    borderColor: "rgb(75, 192, 192)",
                    borderWidth: 3,
                    fill: true,
                    backgroundColor: gradient2,
                    tension: 0.4,
                    pointBackgroundColor: ["#fff", "#fff"],
                    pointBorderColor: "rgb(75, 192, 192)",
                    pointHoverRadius: 10,
                    pointRadius: 5,
                    pointHitRadius: 30,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    max: 30,
                    min: 10,
                    ticks: {
                        stepSize: 5,
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ": " + context.parsed.y.toFixed(2);
                        },
                    },
                },
                legend: {
                    display: false,
                },
            },
        },
    });

    function calculateBMI() {
        const startHeight = parseFloat(document.getElementById('startHeightSlider').value) / 100;
        const startWeight = parseFloat(document.getElementById('startWeightSlider').value);

        const endHeight = parseFloat(document.getElementById('endHeightSlider2').value) / 100;
        const endWeight = parseFloat(document.getElementById('endWeightSlider2').value);

        if (isNaN(startHeight) || isNaN(startWeight)) {
            document.getElementById('BMIresult').innerHTML = "Введите данные";
            alert("Пожалуйста, введите правильное значение старого веса и роста.");
            return;
        }

        const currentBMI = startWeight / (startHeight * startHeight);
        let resultBMI = `<h4>Старый BMI: ${currentBMI.toFixed(2)} (${getBMICategory(currentBMI)})</h4>`;

        let chartData = [currentBMI];

        if (!isNaN(endHeight) && !isNaN(endWeight)) {
            const prevBMI = endWeight / (endHeight * endHeight);
            resultBMI += `<h4>Новый BMI: ${prevBMI.toFixed(2)} (${getBMICategory(prevBMI)})</h4>`;
            chartData.push(prevBMI);

            if (currentBMI > prevBMI) {
                resultBMI += `<h5>Ваш BMI индекс уменьшился.</h5>`;
            } else if (currentBMI < prevBMI) {
                resultBMI += `<h5>Ваш BMI индекс увеличился.</h5>`;
            } else {
                resultBMI += `<h5>Ваш BMI индекс остался без изменений.</h5>`;
            }
        } else {
            chartData.push(null);
        }

        document.getElementById('BMIresult').innerHTML = resultBMI;
        myChart.data.datasets[0].data = chartData;
        myChart.update();
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Недостаточный вес";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return "Нормальный вес";
        } else if (bmi >= 25 && bmi < 29.9) {
            return "Избыточный вес";
        } else {
            return "Ожирение";
        }
    }

    calculateBMI();
    document.getElementById('startHeightSlider').addEventListener('input', calculateBMI);
    document.getElementById('startWeightSlider').addEventListener('input', calculateBMI);
    document.getElementById('endHeightSlider2').addEventListener('input', calculateBMI);
    document.getElementById('endWeightSlider2').addEventListener('input', calculateBMI);

    document.getElementById('startHeight').addEventListener('input', calculateBMI);
    document.getElementById('startWeight').addEventListener('input', calculateBMI);
    document.getElementById('endHeight2').addEventListener('input', calculateBMI);
    document.getElementById('endWeight2').addEventListener('input', calculateBMI);

    // ========== График WHR ==========
    const graphWHR = document.getElementById("graph-whr").getContext("2d");
    const gradientWHR = graphWHR.createLinearGradient(0, 0, 0, 400);
    gradientWHR.addColorStop(0, "rgba(255, 99, 132, 0.8)");
    gradientWHR.addColorStop(1, "rgba(255, 99, 132, 0.2)");

    const myChartWHR = new Chart(graphWHR, {
        type: "line",
        data: {
            labels: ["Старый индекс", "Новый индекс"],
            datasets: [
                {
                    label: 'WHR Data',
                    data: [],
                    borderColor: "rgb(255, 99, 132)",
                    borderWidth: 3,
                    fill: true,
                    backgroundColor: gradientWHR,
                    tension: 0.4,
                    pointBackgroundColor: ["#fff", "#fff"],
                    pointBorderColor: "rgb(255, 99, 132)",
                    pointHoverRadius: 10,
                    pointRadius: 5,
                    pointHitRadius: 30,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    max: 1.5,
                    ticks: {
                        stepSize: 0.2,
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ": " + context.parsed.y.toFixed(2);
                        },
                    },
                },
                legend: {
                    display: false,
                },
            },
        },
    });

    function calculateWHR() {
        const startWaist = parseFloat(document.getElementById('startWaistSlider').value);
        const startHip = parseFloat(document.getElementById('startHipSlider').value);

        const endWaist = parseFloat(document.getElementById('endWaistSlider2').value);
        const endHip = parseFloat(document.getElementById('endHipSlider2').value);

        if (isNaN(startWaist) || isNaN(startHip)) {
            document.getElementById('WHRresult').innerHTML = "Введите данные";
            alert("Пожалуйста, введите правильное значение талии и бедер.");
            return;
        }

        const currentWHR = startWaist / startHip;
        let resultWHR = `<h4>Старый WHR: ${currentWHR.toFixed(2)} (${getWHRCategory(currentWHR)})</h4>`;

        let chartData = [currentWHR];

        if (!isNaN(endWaist) && !isNaN(endHip)) {
            const prevWHR = endWaist / endHip;
            resultWHR += `<h4>Новый WHR: ${prevWHR.toFixed(2)} (${getWHRCategory(prevWHR)})</h4>`;
            chartData.push(prevWHR);

            if (currentWHR > prevWHR) {
                resultWHR += `<h5>Ваш WHR уменьшился.</h5>`;
            } else if (currentWHR < prevWHR) {
                resultWHR += `<h5>Ваш WHR увеличился.</h5>`;
            } else {
                resultWHR += `<h5>Ваш WHR остался без изменений.</h5>`;
            }
        } else {
            chartData.push(null);
        }

        document.getElementById('WHRresult').innerHTML = resultWHR;

        myChartWHR.data.datasets[0].data = chartData;
        myChartWHR.update();
    }

    function getWHRCategory(whr) {
        if (whr < 0.9) {
            return "Низкий риск";
        } else if (whr >= 0.9 && whr < 1) {
            return "Средний риск";
        } else {
            return "Высокий риск";
        }
    }

    calculateWHR();
    document.getElementById('startWaistSlider').addEventListener('input', calculateWHR);
    document.getElementById('startHipSlider').addEventListener('input', calculateWHR);
    document.getElementById('endWaistSlider2').addEventListener('input', calculateWHR);
    document.getElementById('endHipSlider2').addEventListener('input', calculateWHR);

    document.getElementById('startWaist').addEventListener('input', calculateWHR);
    document.getElementById('startHip').addEventListener('input', calculateWHR);
    document.getElementById('endWaist2').addEventListener('input', calculateWHR);
    document.getElementById('endHip2').addEventListener('input', calculateWHR);

    // ========== График Нормы воды ==========
    const waterIntakeChart = document.getElementById("waterIntakeChart").getContext("2d");

    const waterData = {
        labels: ["Старая норма", "Новая норма"],
        datasets: [{
            label: "Water Intake",
            data: [],
            backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1
        }]
    };

    const waterOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 5000,
                ticks: {
                    stepSize: 500,
                    callback: function (value) {
                        return value + "мл";
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const waterChart = new Chart(waterIntakeChart, {
        type: 'bar',
        data: waterData,
        options: waterOptions
    });

    function waterIntake() {
        let startWeight = parseFloat(document.getElementById("startWeightSlider").value);
        let endWeight = parseFloat(document.getElementById("endWeightSlider2").value);

        if (isNaN(startWeight) || isNaN(endWeight)) {
            document.getElementById("oldResult").innerHTML = "";
            document.getElementById("newResult").innerHTML = "";
            waterChart.data.datasets[0].data = [];
        } else {
            let oldWaterIncrease = startWeight * 27;
            let newWaterIncrease = endWeight * 27;

            document.getElementById("oldResult").innerHTML = "<h4>Старая норма потребления воды: " + oldWaterIncrease.toFixed(2) + "ml</h4>";
            document.getElementById("newResult").innerHTML = "<h4>Новая норма потребления воды: " + newWaterIncrease.toFixed(2) + "ml</h4>";

            waterChart.data.datasets[0].data = [oldWaterIncrease, newWaterIncrease];
        }
        waterChart.update();
    }

    document.getElementById("startWeightSlider").addEventListener("input", waterIntake);
    document.getElementById("endWeightSlider2").addEventListener("input", waterIntake);
    
    document.getElementById("startWeight").addEventListener("input", waterIntake);
    document.getElementById("endWeight2").addEventListener("input", waterIntake);

    waterIntake();
});