//sobe o serviço na porta 8080
const app = require('./src/server/app')
const port = process.env.PORT || 8080
const server = app.listen(port, () => console.log(`Server up in ${port}`))

module.exports = server
