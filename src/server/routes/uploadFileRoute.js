module.exports = app => {

	app.get('/uploadFile', (req, res) => {

		res.status(200)
		res.render('uploadFile')
	})
}
