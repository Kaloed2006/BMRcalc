document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper'); // Получаем элемент с class="wrapper"
    fetch('http://localhost:3001/api/protein')
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
                <h1 class="card__title">${data.name}</h1>
                <h3 class="card__text">${data.description}</h3>
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