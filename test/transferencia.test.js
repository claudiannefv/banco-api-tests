
const request = require('supertest');
const { expect } = require ('chai')
require ('dotenv').config()
const {obterToken} = require ('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferências', () => {

    let token 

    beforeEach( async () => {
        token = await obterToken('julio.lima', '123456')
    })

    describe ('POST /transferencias', () => {
       
        it ('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00' , async () => {
            const bodyTransferencias = { ...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type' , 'application/json')
                .set('Authorization' , `Bearer ${token}`)
                .send(bodyTransferencias)
                    
                    expect(resposta.status).to.equal(201);

                    console.log(resposta.body)
        })
        it ('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$ 10,00' , async () => {
           const bodyTransferencias = { ...postTransferencias}
           bodyTransferencias.valor = 7

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type' , 'application/json')
                .set('Authorization' , `Bearer ${token}`)
                .send(bodyTransferencias)
                    
                    expect(resposta.status).to.equal(422);

        })
    })

    describe ('GET /transferencias/id', () => {
        it ('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o id for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/8')
                .set('Authorization', `Bearer ${token}`)

                console.log(resposta.staus)
                console.log(resposta.body)
        })
    })
})