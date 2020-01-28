const axios = require('axios')

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = date => axios.get(getUrl(date))
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getCotacao = ({getCotacaoAPI, extractCotacao}) => async() => {
    try {

        // const res = await getCotacaoAPI('20-01-2020')
        const res = await getCotacaoAPI('04-12-2019')
        const cotacao = extractCotacao(res)
        return cotacao
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getCotacaoAPI,
    extractCotacao,
    getCotacao: getCotacao({getCotacaoAPI, extractCotacao}),
    getUrl,
    pure: {
        getCotacao
    }
}