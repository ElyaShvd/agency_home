async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const responseMessage = document.getElementById('registerResponseMessage');

    // Очистка предыдущего сообщения
    responseMessage.textContent = '';
    responseMessage.classList.remove('success', 'error');

    if (!name || !email || !password) {
        responseMessage.textContent = 'Будь ласка, заповніть усі поля';
        responseMessage.classList.add('error');
        return;
    }

    try {
        const response = await fetch('http://home-agency.api.voloshin.website/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'done') {
            responseMessage.textContent = 'Користувач успішно зареєстрований';
            responseMessage.classList.add('success');
        } else {
            responseMessage.textContent = 'Email вже зареєстрований';
            responseMessage.classList.add('error');
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.textContent = 'Сталася помилка при реєстрації';
        responseMessage.classList.add('error');
    }
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const responseMessage = document.getElementById('loginResponseMessage');

    // Очистка предыдущего сообщения
    responseMessage.textContent = '';
    responseMessage.classList.remove('success', 'error');

    if (!email || !password) {
        responseMessage.textContent = 'Будь ласка, заповніть усі поля';
        responseMessage.classList.add('error');
        return;
    }

    try {
        const response = await fetch('http://home-agency.api.voloshin.website/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'done') {
            responseMessage.textContent = 'Успішний вхід';
            responseMessage.classList.add('success');
            // Сохранение токена или выполнение других действий при успешном входе
            console.log('Token:', result.data.token);
        } else {
            if (result.message === 'Password is incorrect') {
                responseMessage.textContent = 'Неправильний пароль';
            } else if (result.message === 'User with this email was not found') {
                responseMessage.textContent = 'Користувача з таким email не знайдено';
            } else {
                responseMessage.textContent = 'Сталася помилка при вході';
            }
            responseMessage.classList.add('error');
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.textContent = 'Сталася помилка при вході';
        responseMessage.classList.add('error');
    }
}