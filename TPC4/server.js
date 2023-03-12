// server.js
// RPCW2023: 2023-03-08

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypage = require('./mypage')
var static = require('./static.js')
var fs = require('fs')
const { parse } = require('querystring');



function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}



var todoServer = http.createServer(function(req, res) {
    // Logger: what was requested and when it was requested
	var d = new Date().toISOString().substring(0, 16)
	console.log(req.method + " " + req.url + " " + d)
	

	var dicURL = url.parse(req.url, true)


	// Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    } else {

    	 switch(req.method){
            case "GET": {

            	editModeTodoRegex = /\/tarefas_por_realizar\/editRow\/[0-9]+\?$/i
            	editModeDoneRegex = /\/tarefas_realizadas\/editRow\/[0-9]+\?$/i


                
                if(req.url == '/' || editModeTodoRegex.test(req.url) || editModeDoneRegex.test(req.url)){
	                // GET / --------------------------------------------------------------------
	                // GET /tarefas_por_realizar/editRow/idRow? -------------------------------------
	            	
	            	// Caso Edit Mode:
	            	let idTarefaEditar = -1
	            	let idTableEditar = -1
	            	if (editModeTodoRegex.test(req.url) || editModeDoneRegex.test(req.url)) {
						idTarefaEditar = req.url.split("/")[3].replace('?', '') // Strip '?' from id
						idTableEditar = editModeTodoRegex.test(req.url) ? 0 : 1
	            	}
					console.log("ROW Tarefa Editar" + idTarefaEditar + "ID Table Editar")
	            	// ---------------


	                let urls = [ 
	                	"http://localhost:3000/tarefas_por_realizar/",
	  					"http://localhost:3000/tarefas_realizadas/"
					];

					const requests = urls.map((url) => axios.get(url));
	                    
	        		axios.all(requests)
						.then( function(responses) {

							let myLists = []
							responses.forEach( (resp) => {

								myLists.push(resp.data)

							})

			 				res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
			 				console.log(d.substring(0, 10))
			 				res.end(mypage.singlePageApp(myLists[0], myLists[1], d.substring(0, 10), idTarefaEditar, idTableEditar))
	 				})
				
					.catch( erro => {
						console.log("Erro: " + erro)
					 	res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
					 	res.end("Erro: " + erro)

			 		})
			 	}

                break

            }
            case "POST": {

                
                // POST /tarefas_por_realizar/add -------------------------------------------------------------------
                if(req.url == '/tarefas_por_realizar/add/'){

	                collectRequestBodyData(req, result => {	                   
	                    
	                    if(result) {
	                        axios.post("http://localhost:3000/tarefas_por_realizar", result)
	                        	.then(function(resp) {
	                        		console.dir(result)
	                            	console.log(resp.status)

	                                // Como o pedido AXIOS é assincrono, o codigo abaixo tem que estar dentro deste 'then'
	                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                                res.write(`<p>Tarefa ${result.whatToDo} recebida...</p>`)
	                                res.end()
	                            })
	                            .catch(erro => {
	                                console.log("Erro: " + erro)
	                            })
	                    }
	                    else{
	                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                        res.write("<p>Unable to collect data from body...</p>")
	                        res.end()
	                    }
	                });
	            
	            // POST /tarefas_por_realizar/done/id -------------------------------------------------------------------	            
	            } else if (/^\/tarefas_por_realizar\/done\/[0-9]+$/i.test(req.url)) {
	            	var idTarefa = req.url.split("/")[3]
	                console.log("DONE idTarefa: " + idTarefa)
	                

	                collectRequestBodyData(req, result => {
	                    	                    
	                    if(result) {
	                    	
	                    	// 1. Add lista tarefas_realizadas
	                    	axios.post("http://localhost:3000/tarefas_realizadas", result)
	                    		.then(function(resp) {
	                    			console.dir(result)	                    			
	                    			res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                                res.end(`<p>Tarefa ${result.whatToDo} realizada...</p>`)
	                    		})
	                    		.catch(erro => {
	                                console.log("Erro: " + erro)
	                            })
							
							// 2. Remove lista tarefas_por_realizar
                    		axios.delete("http://localhost:3000/tarefas_por_realizar/" + idTarefa)
                    		.then(function(resp) {
                    			res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(`<p>Tarefa ${result.whatToDo} deleted...</p>`)
                    		})
                    		.catch(erro => {
                                console.log("Erro: " + erro)
                            })

	                    
	                    } else {
	                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                        res.write("<p>Unable to collect data from body...</p>")
	                        res.end()
	                    }
	                });
	            
	            // POST /tarefas_por_realizar/edit/id -------------------------------------------------------------------	            
	            } else if (/\/tarefas_por_realizar\/edit\/[0-9]+$/i.test(req.url)) {
	            	var idTarefa = req.url.split("/")[3]
	                console.log("EDIT idTarefa: " + idTarefa)
	                

	                collectRequestBodyData(req, result => {
	                    	                    
	                    if(result) {
	                    	console.dir(result)

	                    	// 1. Put edit lista tarefas_por_realizar
                    		axios.put("http://localhost:3000/tarefas_por_realizar/" + idTarefa, result)
                    		.then(function(resp) {
                    			res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(`<p>Tarefa ${result.whatToDo} edited...</p>`)
                    		})
                    		.catch(erro => {
                                console.log("Erro: " + erro)
                            })   

	                    
	                    } else {
	                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                        res.write("<p>Unable to collect data from body...</p>")
	                        res.end()
	                    }
	                });


	            // POST /tarefas_por_realizar/delete/id -------------------------------------------------------------------	            
	            } else if (/\/tarefas_por_realizar\/delete\/[0-9]+$/i.test(req.url)) {
	            	var idTarefa = req.url.split("/")[3]
	                console.log("DELETE idTarefa: " + idTarefa)
	                

	                collectRequestBodyData(req, result => {
	                    	                    
	                    if(result) {
	                    	console.dir(result)

	                    	// 1. Remove lista tarefas_por_realizar
                    		axios.delete("http://localhost:3000/tarefas_por_realizar/" + idTarefa)
                    		.then(function(resp) {
                    			res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end()
                    		})
                    		.catch(erro => {
                                console.log("Erro: " + erro)
                            })                  				                    		                
	                    
	                    } else {
	                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                        res.write("<p>Unable to collect data from body...</p>")
	                        res.end()
	                    }
	                });

	            // POST /tarefas_realizadas/delete/id -------------------------------------------------------------------	            
	            } else if (/\/tarefas_realizadas\/delete\/[0-9]+$/i.test(req.url)) {
	            	var idTarefa = req.url.split("/")[3]
	                console.log("DELETE idTarefa: " + idTarefa)
	                

	                collectRequestBodyData(req, result => {
	                    	                    
	                    if(result) {
	                    	console.dir(result)

	                    	// 1. Remove lista tarefas_por_realizar
                    		axios.delete("http://localhost:3000/tarefas_realizadas/" + idTarefa)
                    		.then(function(resp) {
                    			res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(`<p>Tarefa ${result.whatToDo} deleted...</p>`)
                    		})
                    		.catch(erro => {
                                console.log("Erro: " + erro)
                            })                  				                    		                
	                    
	                    } else {
	                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                        res.write("<p>Unable to collect data from body...</p>")
	                        res.end()
	                    }
	                });


	            // POST /tarefas_realizadas/edit/id -------------------------------------------------------------------	            
	            } else if (/\/tarefas_realizadas\/edit\/[0-9]+$/i.test(req.url)) {
	            	var idTarefa = req.url.split("/")[3]
	                console.log("EDIT idTarefa: " + idTarefa)
	                

	                collectRequestBodyData(req, result => {
	                    	                    
	                    if(result) {
	                    	console.dir(result)

							// 1. Put edit lista tarefas_realizadas
                    		axios.put("http://localhost:3000/tarefas_realizadas/" + idTarefa, result)
                    		.then(function(resp) {
                    			res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(`<p>Tarefa ${result.whatToDo} edited...</p>`)
                    		})
                    		.catch(erro => {
                                console.log("Erro: " + erro)
                            })   

	                    
	                    } else {
	                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
	                        res.write("<p>Unable to collect data from body...</p>")
	                        res.end()
	                    }
	                });
	            }

	            break
	        }
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }

    }

})


todoServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
