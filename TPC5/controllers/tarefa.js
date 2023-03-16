var axios = require('axios')

module.exports.listaTarefasTodo = () => {
	return axios.get('http://localhost:3000/tarefas_por_realizar')
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}

module.exports.listaTarefasDone = () => {
	return axios.get('http://localhost:3000/tarefas_realizadas')
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}


module.exports.addTarefaTodo = t => {
	return axios.post('http://localhost:3000/tarefas_por_realizar', t)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}

module.exports.addTarefaDone = t => {
	return axios.post('http://localhost:3000/tarefas_realizadas', t)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}

module.exports.deleteTarefaTodo = id => {
	return axios.delete('http://localhost:3000/tarefas_por_realizar/' + id)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}

module.exports.deleteTarefaDone = id => {
	return axios.delete('http://localhost:3000/tarefas_realizadas/' + id)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}


module.exports.editTarefaTodo = t => {
	return axios.put('http://localhost:3000/tarefas_por_realizar/' + t.id, t)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}

module.exports.editTarefaDone = t => {
	return axios.put('http://localhost:3000/tarefas_realizadas/' + t.id, t)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}



module.exports.getTarefaTodo = id => {
	return axios.get('http://localhost:3000/tarefas_por_realizar/' + id)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}

module.exports.getTarefaDone = id => {
	return axios.get('http://localhost:3000/tarefas_realizadas/' + id)
		.then(resposta => {
			return resposta.data
		})
		.catch(erro => {
			return erro
		})
}




