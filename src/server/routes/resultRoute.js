const readFile = require('../application/commands/readFile')
const classPilots = require('../application/commands/classPilots')

module.exports = app => {

	app.post('/result', async (req, res) => {

		const file = await readFile.readFile(req)
		const pilots = await classPilots(file.tableFile, file.listPilots)
		const bestLap = file.bestLap
		const msgErro = file.errorFile

		res.status(200)
		res.render('result', {
			pilots: pilots,
			bestLap: bestLap,
			msgErro: msgErro
		})
	})

	app.get('/result', (req, res) => {

		res.status(200)
		res.redirect('/uploadFile')
	})
}
