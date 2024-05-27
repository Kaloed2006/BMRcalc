document.querySelector('.form-login').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#loginUserName').value;
    const password = document.querySelector('#loginPassword').value;

    if (!password && !username) throw new alert('Введите логин и пароль');
    if (!password && !username) throw new alert('Неверный пароль');
    try {
        const response = await fetch('http://127.0.0.1:3001/api/auth/signin', {
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
        document.cookie = `token=${data.jwt}`
        if (data.error) return alert(data.error)
        window.location.href = '../pages/index.html'
    } catch (error) {
        console.error(error.message);
    }
});