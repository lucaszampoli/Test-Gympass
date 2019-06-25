const fs = require('fs')
const formidable = require('formidable')
const classPilots = require('./classPilots')
const classReadingFile = require('./classReadingFile')

//pega o arquivo apos o upload e realiza a leitura
const readFile = async req => {

	let read
	let result

	result = await getFile(req)
		.then(async result => {
			return result
		})
//realiza leitura
	read = await readingFile(result.files.fileupload)

	return read
}
//pega o arquivo
const getFile = req => {

	return new Promise((resolve, reject) => {

		const form = new formidable.IncomingForm()
		form.parse(req, (err, fields, files) => {

      		resolve({ files: files })
			return 1
		})
	})
}

const readingFile = async (obj) => {

	let oldFile
	let dirFile
	let errorFile = null
	let bestLap
	let tableFile
	let listPilots
	const nomeArquivo = obj.name

	//salva arquivo que foi feito o upload localmente
	await copyFile(obj)

	oldFile = `./src/server/application/upload/file-import/${nomeArquivo.split('.')[0]}_${new Date().getMinutes()}${new Date().getSeconds()}.${nomeArquivo.split('.')[1]}`
	dirFile = `./src/server/application/upload/${nomeArquivo}`

	const data = fs.readFileSync(dirFile, 'utf8')
	const lines = data.split('\n')
	await fs.rename(dirFile, oldFile, () => {})

	//verifica se o arquivo possui somente 1 linha (cabeçalho) e trava a leitura.
	if(lines.length <= 1){

		errorFile = 'O arquivo deve conter mais de uma linha contando com o cabeçalho.'
		tableFile = []
		listPilots = []
		bestLap = {
			time: null,
			codPilots: null,
			namePilots: null,
			lap: null
		}
		return {tableFile, listPilots, bestLap, errorFile}
	}
	else {
		//realiza leitura e tratamento do arquivo
		const infoRace = await classReadingFile(lines)
		bestLap = infoRace.bestLap
		errorFile = infoRace.msgErro
		tableFile = infoRace.arr
		listPilots = infoRace.codPilots

		return {tableFile, listPilots, bestLap, errorFile}
	}
}
//salva arquivo na pasta do projeto
const copyFile = obj => {

	return new Promise((resolve, reject) => {

		fs.copyFile(obj.path, `./src/server/application/upload/${obj.name}`, (err) => {

			fs.statSync(`./src/server/application/upload/${obj.name}`)
			resolve(console.log('Arquivo copiado com Sucesso!'))
		})
	})
}

module.exports = {readingFile, readFile, copyFile}

//analisa as linhas e monta os arrays a partir do arquivo copiado
const getPodium = pilots => {

}
