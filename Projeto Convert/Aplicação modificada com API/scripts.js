//Obtendo acesso a API ExchangeRate-API
const API_KEY = "0ffee5447319dd9de1cfbc7f";
const BASE_URL = "https://v6.exchangerate-api.com/v6/0ffee5447319dd9de1cfbc7f/latest/USD";

//Cotação de moedas diarias
let exchangeRates = {
    USD: 4.87,
    EUR: 5.32,
    GBP: 6.08
}

//Obtendo os elementos
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactesRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactesRegex, "")
})

//converção da moeda com a API
async function fetchExchangeRates() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data.result === "success") {
            exchangeRates.USD = data.conversion_rates.BRL;
            exchangeRates.EUR = data.conversion_rates.EUR * exchangeRates.USD;
            exchangeRates.GBP = data.conversion_rates.GBP * exchangeRates.USD;

            console.log("taxas atualizadas:", exchangeRates);
            return true;
        }
        else {
            console.error("Erro ao buscar taxas de câmbio:", data);
            return false;
        }
    } catch (error) {
        console.error("Erro ao conectar com a API:", error);
        return false;
    }
}
fetchExchangeRates();
setInterval(fetchExchangeRates, 3600000);

//captura de evento de submit do formulario
form.onsubmit = async (event) => {
    event.preventDefault()
    const updated = await fetchExchangeRates();
    
    if (!updated) {
        return alert("Erro ao atualizar as taxas. Tente novamente.");
    }

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, exchangeRates.USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, exchangeRates.EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, exchangeRates.GBP, "£")
    }
}

//função para converter a moeda na exibição
function convertCurrency(amount, price, symbol) {
    try {
        //exbindo a cotação ataulizada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //Calcula,formata e exibe o total e o resultado
        let total = amount * price
        // Verifica se é um numero
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente!")
        }
        total = formatCurrencyBRL(total).replace("R$", "")
        result.textContent = `${total} Reais`
        //Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")

    } catch (error) {
        console.log(error)
        //Remove a classe do footer removendo ele.
        footer.classList.remove("show-result")
        alert("Não foi possível converter. Tente novamente mais tarde.")

    }

}
//fomatando o real
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

}