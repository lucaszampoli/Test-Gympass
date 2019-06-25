const chai = require('chai')
const readFile = require('../src/server/application/commands/readFile')
const classPilots = require('../src/server/application/commands/classPilots')
const expect = chai.expect
let obj = {}
let info = {}

describe('Verifica se há registros e classifica os Pilotos', () => {

	it('Retorna mensagem de erro caso possua somente o cabeçalho no arquivo', async () => {

		obj ={
			name: 'testExampleCorrectEmpty.txt',
			path: './testFiles/testExampleCorrectEmpty.txt'
		}
		info = await readFile.readFile(obj)
		expect(info.bestLap.time).to.equal(null)
		expect(info.bestLap.codPilot).to.equal(null)
		expect(info.bestLap.namePilot).to.equal(null)
		expect(info.bestLap.lap).to.equal(null)
		expect(info.errorFile).to.equal('O arquivo deve conter mais de uma linha contando com o cabeçalho.')
		expect(info.tableFile.length).to.equal(0)
		expect(info.listPilots.length).to.equal(0)
	})

	it('Não há classificação', async () => {

		obj ={
			name: 'testExampleCorrectEmpty.txt',
			path: './testFiles/testExampleCorrectEmpty.txt'
		}
		info = await readFile.readFile(obj)
		const resultado = await classificaPilotos(info.tableFile, info.listPilots)
		expect(resultado.length).to.equal(0)
	})

	it('Lê o arquivo correto', async () => {

		obj ={
			name: 'testExampleCorrect.txt',
			path: './testFiles/testExampleCorrect.txt'
		}
		info = await readFile.readingFile(obj)
		expect(info.bestLap.time).to.equal('1:02.769')
		expect(info.bestLap.codPilot).to.equal('038')
		expect(info.bestLap.namePilot).to.equal('F.MASSA')
		expect(info.bestLap.lap).to.equal('3')
		expect(info.errorFile).to.equal('')
		expect(info.tableFile.length).to.equal(23)
		expect(info.listPilots.length).to.equal(6)
	})

	it('Clasifica os pilotos', async () => {

		obj ={
			name: 'testExampleCorrect.txt',
			path: './testFiles/testExampleCorrect.txt'
		}
		info = await readFile.readFile(obj)
		const resultado = await classificaPilotos(info.tableFile, info.listPilots)
		expect(resultado.length).to.equal(6)
		expect(resultado[0].codPilot).to.equal('038')
		expect(resultado[5].codPilot).to.equal('011')
	})

})
