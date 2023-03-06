// pessoas_server.js
// RPCW2023: 2023-02-27

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(async function(req, res) {
	var d = new Date().toISOString().substring(0, 16)
	console.log(req.method + " " + req.url + " " + d)
	var dicURL = url.parse(req.url, true)

	const myRegex = /p(\d+)/
	const regexDesporto = /tabela_desporto_(.+)/
	const regexProfissao = /tabela_profissao_(.+)/


	

	if (dicURL.pathname == "/") {

		fs.readFile('index.html', function (err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'})
			if (err)
				res.write("Erro: " + err)
			else
				res.write(data)

			res.end()
		})

	// Pagina perfil pessoa
	} else if(dicURL.pathname.match(myRegex)) {

		var idPessoa = req.url.substring(1,9)


		axios.get("http://localhost:3000/pessoas/" + idPessoa)
			.then( function(resp) {
			 	var pessoa = resp.data
			 	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end(mypages.perfilPage(pessoa, idPessoa))
	 		})
			
			.catch( erro => {
				console.log("Erro: " + erro)
			 	res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end("Erro: " + erro)

	 		})


	} else if(dicURL.pathname == "/tabela_pessoas") {

		axios.get("http://localhost:3000/pessoas/")
			.then( function(resp) {
			 	var pessoas = resp.data
			 	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end(mypages.pessoasPage(pessoas))
	 		})
			
			.catch( erro => {
				console.log("Erro: " + erro)
			 	res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end("Erro: " + erro)

	 		})


	} else if (dicURL.pathname == "/distribuicao_por_sexo") {


		var listaF = await axios.get("http://localhost:3000/pessoas?sexo=feminino")
		var listaM = await axios.get("http://localhost:3000/pessoas?sexo=masculino")
		var listaO = await axios.get("http://localhost:3000/pessoas?sexo=outro")


		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.sexoPage(listaF.data, listaM.data, listaO.data))
	} else if (dicURL.pathname == "/tabela_sexo_f") {
		
		var listaF = await axios.get("http://localhost:3000/pessoas?sexo=feminino")

		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.pessoasPage(listaF.data))


	} else if (dicURL.pathname == "/tabela_sexo_m") {
		
		var listaM = await axios.get("http://localhost:3000/pessoas?sexo=masculino")

		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.pessoasPage(listaM.data))

	} else if (dicURL.pathname == "/tabela_sexo_o") {
		
		var listaO = await axios.get("http://localhost:3000/pessoas?sexo=outro")

		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.pessoasPage(listaO.data))
	
	} else if (dicURL.pathname == "/distribuicao_por_desporto") {

		var resp = await axios.get("http://localhost:3000/pessoas/")
		var listaPessoas = resp.data


		var dictDesportos = {}


		for (let i = 0; i < listaPessoas.length; i++) {
			
			for (let j = 0; j < listaPessoas[i].desportos.length; j++) {
				
				myStr = listaPessoas[i].desportos[j]
				
				v = dictDesportos[myStr]

				if (v)
					dictDesportos[myStr] += 1
				else
					dictDesportos[myStr] = 1
			}
		}

		
		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.desportosPage(dictDesportos))

	} else if (dicURL.pathname.match(regexDesporto)) {


		// /tabela_desporto_(.+)		
		var desporto = req.url.substring(17,40)
		//console.log(desporto)

		var resp = await axios.get("http://localhost:3000/pessoas?q=" + desporto)
		var lista = resp.data


		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.pessoasPage(lista))

	} else if (dicURL.pathname == "/top_10_profissoes") {


		var resp = await axios.get("http://localhost:3000/pessoas/")
		var listaPessoas = resp.data


		var dictProfissoes = {}


		for (let i = 0; i < listaPessoas.length; i++) {
			

			myStr = listaPessoas[i].profissao

			v = dictProfissoes[myStr]

			if (v)
				dictProfissoes[myStr] += 1
			else
				dictProfissoes[myStr] = 1
		}

		//console.log(dictProfissoes)
		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.top10ProfissoesPage(dictProfissoes))

	} else if (dicURL.pathname.match(regexProfissao)) {

		// /tabela_profissao_(.+)		
		var profissao = req.url.substring(18,80)
		
		var resp = await axios.get("http://localhost:3000/pessoas?q=" + profissao)
		var lista = resp.data


		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
		res.end(mypages.pessoasPage(lista))


	} else if (dicURL.pathname == "/ordenada") {
		axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
			.then( function(resp) {
			 	var pessoas = resp.data
			 	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end(mypages.pessoasPage(pessoas))
	 		})
			
			.catch( erro => {
				console.log("Erro: " + erro)
			 	res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end("Erro: " + erro)

	 		})
	} else if (dicURL.pathname == "/ordenadav2") {
		axios.get("http://localhost:3000/pessoas")
			.then( function(resp) {
			 	var pessoas = resp.data
			 	let pessoasOrdenadas = pessoas.sort(
			 		(p1, p2) => (p1.nome < p2.nome) ? -1 : 1
			 		// function(p1, p2) {return (p1.nome < p2.nome) ? -1 : 1}
			 	)
			 	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end(mypages.pessoasPage(pessoasOrdenadas))
	 		})
			
			.catch( erro => {
				console.log("Erro: " + erro)
			 	res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
			 	res.end("Erro: " + erro)

	 		})
	} else if (dicURL.pathname == "/w3.css") {
		fs.readFile('w3.css', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/css'})
			if(err) {
				console.log("Erro na leitura da stylesheet")
				res.write("Erro: " + err)
			} else
				res.write(data)

			res.end()
		})

	} else {
		res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
		res.end("ERRO: Operação não suportada")
	}
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")