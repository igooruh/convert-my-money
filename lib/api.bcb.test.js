const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
    const res = {
        data: {
            value: [
                {cotacaoVenda : 3.90}
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('04-12-2019').then(res => {
        expect(res).toEqual(res)
    }) 
})

test('getCotacaoAPI is Empty', () => {
    const res = {
        data: {
            value: [
                {cotacaoVenda : 3.90}
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('04-12-2019').then(res => {
        expect(res).toEqual({})
    }) 
})

test('extractCotacao', () => {
    const cotacao = api.extractCotacao({
        data: {
            value: [
                {cotacaoVenda : 3.90}
            ]
        }
    })
    expect(cotacao).toEqual(3.90)
})

test('getUrl', () => {
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

tesft('getCotacao', () => {
    const res = {
        data: {
            value: [
                {cotacaoVenda : 3.90}
            ]
        }
    }

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(res)

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.90)

    api.pure
        .getCotacao({getCotacaoAPI, extractCotacao})()
        .then( res => {
            expect(res).toBe(3.90)
        })
})

test('getCotacao Exception', () => {
    const res = {
        data: {
            value: [
                {cotacaoVenda : 3.90}
            ]
        }
    }

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.90)

    api.pure
        .getCotacao({getCotacaoAPI, extractCotacao})()
        .then( res => {
            expect(res).toBe('')
        })
})