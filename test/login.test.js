const request = require('supertest');
const { expect } = require ('chai')

describe('Login', () => {
    describe('POST /login' , () => {
        it ('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const resposta = await request ('http://localhost:3000')
            .post('/login')
            .set('Content-Type' , 'application/json')
            .send({
                'username': 'julio.lima',
                'senha': '123456'
             })

            console.log(resposta.status)
            console.log(resposta.body)

            expect (resposta.status).to.equal(200);
            expect (resposta.body.token).to.be.a('string');
            
        })
    })
})
/* describe('Transferências', () => {
  const token = 'seu_token_aqui';

  it('Deve realizar uma transferência com sucesso', async () => {
    const resposta = await request ('http://localhost:3000')
      .post('/transferencias')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'contaOrigem': '2',
        'contaDestino': '1',
        'valor': 40
      });

    expect(resposta.status).to.equal(201);
    expect(resposta.body).to.have.property('sucesso', true);
    expect(resposta.body).to.have.property('mensagem').that.is.a('string');
    expect(resposta.body).to.have.property('dados');
    expect(resposta.body.dados).to.have.property('saldoAtualizado');
  });

  it('Deve retornar erro se token não for enviado', async () => {
    const resposta = await request ('http://localhost:3000')
      .post('/transferencias')
      .send({
        'contaOrigem': '2',
        'contaDestino': '1',
        'valor': 40
      });

    expect(resposta.status).to.equal(401);
    expect(resposta.body).to.have.property('erro').that.is.a('string');
  });

  it('Deve retornar erro se saldo insuficiente', async () => {
    const resposta = await request ('http://localhost:3000')
      .post('/transferencias')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'contaOrigem': '2',
        'contaDestino': '1',
        'valor': 40
      });

    expect(resposta.status).to.equal(400);
    expect(resposta.body).to.have.property('erro').that.is.a('string');
  });
});
*/