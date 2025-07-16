const request = require('supertest');
const { expect } = require ('chai')
require ('dotenv').config()

describe('Transferências', () => {
    describe ('POST /transferencias', () => {
        it ('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00' , async () => {
            //capturar o token
            const respostaLogin = await request (process.env.BASE_URL)
                .post('/login')
                .set('Content-Type' , 'application/json')
                .send({
                            'username': 'julio.lima',
                            'senha': '123456'
                         })

            const token = respostaLogin.body.token 

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type' , 'application/json')
                .set('Authorization' , `Bearer ${token}`)
                .send({
                     contaOrigem: 2,
                     contaDestino: 1,
                     valor: 11,
                     token: ""
                    })
                    
                    expect(resposta.status).to.equal(201);

                    console.log(resposta.body)
        })
        it ('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$ 10,00' , async () => {
            const respostaLogin = await request (process.env.BASE_URL)
                        .post('/login')
                        .set('Content-Type' , 'application/json')
                        .send({
                            'username': 'julio.lima',
                            'senha': '123456'
                         })

                         const token = respostaLogin.body.token 

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type' , 'application/json')
                .set('Authorization' , `Bearer ${token}`)
                .send({
                     contaOrigem: 2,
                     contaDestino: 1,
                     valor: 7,
                     token: ""
                    })
                    
                    expect(resposta.status).to.equal(422);

        })
    })
})