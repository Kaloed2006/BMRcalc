document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper'); // Получаем элемент с class="wrapper"
    fetch('http://localhost:3001/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Создаем HTML-код на основе полученных данных
            const html = data.map((data) => {
                return `
                <div class="card">
                    <img class="card__img" src="${data.image}">
                    <h2 class="card__title">${data.name} (100 грамм)</h2>
                    <h3 class="card__text calories">Кало-сть: ${data.calories} ккал</h3>
                    <h3 class="card__text proteins">Белки: ${data.proteins} г</h3>
                    <h3 class="card__text fats">Жиры: ${data.fats} г</h3>
                    <h3 class="card__text carbs">Углеводы: ${data.carbs} г</h3>
                </div>
        `}).join(''); // Объединяем HTML-код всех продуктов в одну строку
            // Вставляем HTML-код в элемент wrapper
            wrapper.innerHTML = html;
            console.log(html);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
});