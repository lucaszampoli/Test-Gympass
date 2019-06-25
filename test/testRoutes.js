const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
chai.use(chaiHttp)

describe('Testa as rotas', function() {

    it('Tete no endereço /home', function(done) {
        chai
            .request(server)
            .get('/home')
            .end((err, res) => {

                res.should.have.status(200)
                done()
            })
    })

    it('Teste no endereço /', function(done) {
        chai
            .request(server)
            .get('/')
            .end((err, res) => {

                res.should.have.status(200)
                done()
            })
    })

    it('Teste no endereço /uploadFile', function(done) {
        chai
            .request(server)
            .get('/uploadFile')
            .end((err, res) => {

                res.should.have.status(200)
                done()
            })
    })

    it('Teste no endereço /result', function(done) {
        chai
            .request(server)
            .post('/result')
            .set('content-type', 'application/x-www-form-urlencoded')
            .attach('fileupload', './testFiles/testExample.txt')
            .end((err, res) => {

                res.should.have.status(200)
                done()
            })
    })


    it('Teste retorno error 404 ao acessar um endereço inválido', function(done) {
        chai
            .request(server)
            .get('/pageNotFound')
            .end((err, res) => {

                res.should.have.status(404)
                done()
            })
    })
})
