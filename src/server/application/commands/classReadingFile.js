//analisa as linhas e monta os arrays a partir do arquivo copiado

//formata os campos
const patterns = {
	hour: /^\d{2}\:\d{2}\:\d{2}\.\d{3}/g,
	codPilot: /(\s\d{3}\s)/g,
	namePilot: /\s[a-zA-Z]\.?[a-zA-Z]*\s/g,
	lap: /(\s\d\s)/g,
	timeLap: /\s\d*\:\d{2}\.\d{3}/g,
	speed: /\s\d*,\d*/g,
	repl: /\/\t/g
}

//percorre as linhas
module.exports = lines => {

	let arr = []
	let codPilots = []
	let bestLap = {
		time: '59:59.999'
	}
	let msgErro = ''

	for (let i = 1; i < lines.length; i++){
		try{
			//lê cada linha e busca os valores no formato padrão pre definido
			let lap = lines[i].match(patterns.lap)[0].replace(patterns.repl, '').trim()
			let codPilot = lines[i].match(patterns.codPilot)[0].replace(patterns.repl, '').trim()
			let namePilot = lines[i].match(patterns.namePilot)[0].replace(patterns.repl, '').trim()
			let hour = lines[i].match(patterns.hour)[0].replace(patterns.repl, '').trim()
			let timeLap = lines[i].match(patterns.timeLap)[0].replace(patterns.repl, '').trim()
			let speed = lines[i].match(patterns.speed)[0].replace(patterns.repl, '').trim()

			//Preenche um array de com as informações do arquivo
			arr.push({
				codPilot: codPilot,
				namePilot: namePilot,
				hour: hour,
				lap: lap,
				timeLap: timeLap,
				speed: speed
			})

			//Gera array só com o código dos pilotos
			codPilots.push(codPilot)

			//Salva inofrmações sobre a melhor volta da corrida
			if(Date.parse(`01/01/1999 00:${bestLap.time}`) > Date.parse(`01/01/1999 00:${timeLap}`)){

				bestLap.time = timeLap
				bestLap.codPilot = codPilot
				bestLap.namePilot = namePilot
				bestLap.lap = lap
			}
		}
		catch(e) {
			msgErro += `Linha ${i+1} do arquivo está vazia ou não está no formato correto! \n`
			console.log(`Erro linha ${i+1} está vazia ou não está no formato correto `)
		}
	}

  //retira os duplicados
	codPilots = codPilots.filter((item, pos) => {

		return codPilots.indexOf(item) == pos
	})

	return({arr, codPilots, bestLap, msgErro})
}
