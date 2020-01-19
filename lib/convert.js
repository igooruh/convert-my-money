const convert = (cotacao, quantidade) => {
    const result = parseFloat(cotacao) * parseFloat(quantidade)
    return result
}

const toMoney = valor => {
    return parseFloat(valor).toFixed(2)
}

module.exports = {
    convert,
    toMoney
}