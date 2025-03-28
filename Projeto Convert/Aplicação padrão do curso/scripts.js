//Cotação de moedas diarias
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

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

//captura de evento de submit do formulario
form.onsubmit = (event) => {
    event.preventDefault()

    switch(currency.value) {
        case "USD" :
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR" :
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP" : 
            convertCurrency(amount.value, GBP, "£")
    }
}

//função para converter a moeda
function convertCurrency (amount, price, symbol){
    try{
        //exbindo a cotação ataulizada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //Calcula,formata e exibe o total e o resultado
        let total = amount * price
        // Verifica se é um numero
        if(isNaN(total)) {
            return alert("Por favor, digite o valor corretamente!")
        }
        total = formatCurrencyBRL(total).replace("R$", "")
        result.textContent = `${total} Reais`
        //Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")

    } catch (error){
        console.log(error)
        //Remove a classe do footer removendo ele.
        footer.classList.remove("show-result")
        alert("Não foi possível converter. Tente novamente mais tarde.")

    }

}
//fomatando o real
function formatCurrencyBRL(value){
    return Number(value).toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
    })

}