document.querySelector('.form-register').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#regUserName').value;
    const password = document.querySelector('#regPassword').value;
    const confirmPass = document.querySelector('#regConfirmPassword').value;

    if (password !== confirmPass) return alert('Пароли не совпадают');
    if (!password && !confirmPass) return alert('Введите пароль');
    if (username.length < 2) return alert('Заполните поле "Имя пользователя"');
    try {
        const response = await fetch('http://127.0.0.1:3001/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        if (data.error) return alert(data.error)
        window.location.href = '../pages/login.html'
    } catch (error) {
        console.error(error.message);
    }
});
