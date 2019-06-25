//monta a classificão dos pilotos
module.exports = (tableFile, listPilots) => {

	let pilots = []
	//percorre todos os códigos dos pilotos do arquivo e gera as informações
	for(let i = 0; i < listPilots.length; i++){

		const pilot = tableFile.filter(item => listPilots[i] == item.codPilot)
		pilots.push(getInfoPilot(pilot))
	}
	//adiciona a posição dos pilotos e a diferença de chegada do primeiro colocado
	pilots = getPodium(pilots)

	return pilots
}
//Função para gerar as informações de chegada, melhor volta, quantidades de volta de um piloto.
const getInfoPilot = pilot => {

	let bestLap = '59:59.999'
	let arrival = null
	let start = null
	let laps = 0
	let averageSpeed = 0.0000
	let infopilot = {}
	let smallerLap = Number.MAX_SAFE_INTEGER

	//analisa cada uma das linhas do piloto para coletar informações de melhor volta...
	for(let i = 0; i < pilot.length; i++){

		if(Date.parse(`01/01/1999 00:${bestLap}`) > Date.parse(`01/01/1999 00:${pilot[i].timeLap}`)){

			bestLap = pilot[i].timeLap
		}

		if(laps < parseInt(pilot[i].lap)){

			laps = pilot[i].lap
			arrival = pilot[i].hour
		}
		if(pilot[i].lap < smallerLap){

			start = pilot[i].hour
			smallerLap = pilot[i].lap
		}

		averageSpeed += parseFloat((pilot[i].speed).replace(',', '.'))
	}
	//calculo da velocidade média dos pilotos
	averageSpeed = parseFloat(averageSpeed / pilot.length).toFixed(3)

	//passa os valores consolidados - Informações de chegada....
	infopilot = {
		codPilot: pilot[0].codPilot,
		namePilot: pilot[0].namePilot,
		laps: laps,
		arrival: arrival,
		bestLap: bestLap,
		averageSpeed: averageSpeed,
		difference: null,
		timeLap: differenceHour(start, arrival)
	}

	return infopilot
}

const getPodium = pilots => {

	//ordena pilotos pela ordem de chegada e voltas
	pilots.sort(function (a, b) {
		return b.laps - a.laps
		|| Date.parse(`01/01/1999 ${a.arrival}`, 'dd/MM/yyyy hh:mm:ss.sss') - Date.parse(`01/01/1999 ${b.arrival}`, 'dd/MM/yyyy hh:mm:ss.sss')
		|| Date.parse(`01/01/1999 00:${a.bestLap}`, 'dd/MM/yyyy hh:mm:ss.sss') - Date.parse(`01/01/1999 00:${b.bestLap}`, 'dd/MM/yyyy hh:mm:ss.sss')
	})

	//adiciona a informação da posição dos pilots que estão ordenados e a distancia de cada um para o primeiro colocado
	for(let i = 0; i < pilots.length; i++){

		pilots[i].position = i+1
		if(i == 0)
			pilots[i].difference = 0
		else
			pilots[i].difference = differenceHour(pilots[0].arrival, pilots[i].arrival)
	}

	return(pilots)
}

//Função que realiza a diferença das horas
const differenceHour = (start, end) => {

	const options = { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric' , ms: 'numeric',  hour12: false}
	const dif = new Date(Date.parse(`01/01/1999 ${end}`, 'dd/MM/yyyy hh:mm:ss.sss') - Date.parse(`01/01/1999 ${start}`, 'dd/MM/yyyy hh:mm:ss.sss'))

	return `+${Intl.DateTimeFormat('en-US', options).format(dif)}.${dif.getMilliseconds()}`
}
