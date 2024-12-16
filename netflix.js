document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("emailInput");
    const goButton = document.getElementById("goButton");
    const errorMessage = document.getElementById("error-message");

    // Função para verificar e-mail e ativar/desativar o botão
    emailInput.addEventListener("input", function () {
        if (emailInput.value === "") {
            goButton.disabled = true; // Desativa o botão se o campo estiver vazio
            errorMessage.style.display = "none"; // Esconde a mensagem de erro
        } else if (emailInput.value.includes("@")) {
            goButton.disabled = false; // Ativa o botão se o e-mail contiver "@"
            errorMessage.style.display = "none"; // Esconde a mensagem de erro
        } else {
            goButton.disabled = true; // Desativa o botão se o e-mail não for válido
            errorMessage.style.display = "none"; // Esconde a mensagem de erro
        }
    });

    // Ao clicar no botão, valida o formulário
    goButton.addEventListener("click", function (event) {
        if (emailInput.value === "") {
            errorMessage.style.display = "block"; // Exibe a mensagem de erro
            errorMessage.innerHTML = "Preenchimento do e-mail é obrigatório."; // Mensagem de erro
            event.preventDefault(); // Impede o redirecionamento
        } else if (!emailInput.value.includes("@")) {
            errorMessage.style.display = "block"; // Exibe a mensagem de erro
            errorMessage.innerHTML = "Por favor, insira um e-mail válido."; // Mensagem de erro
            event.preventDefault(); // Impede o redirecionamento
        } else {
            // Se o e-mail for válido, permite o redirecionamento
            window.location.href = "pagamento.html"; // Redireciona para a página de pagamento
        }
    });
});