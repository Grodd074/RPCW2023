exports.pessoasPage = function(lista) {
	var pagHTML = `
	<!DOCTYPE html>

	<html>
		<head>
			<meta charset = "UTF-8"/>
			<link rel="stylesheet" href="w3.css">
			<title> About people...</title>
		</head>
		
		<style>
			tr[data-href] {
				cursor: pointer;
			}
		</style>

		<body>
			<div class="w3-card-4">

				<header class="w3-container w3-blue">
			  		<h1>Lista de pessoas</h1>
				</header>

			<div class="w3-container">
				<table class="w3-table-all w3-hoverable">
					<tr>
						<th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
					</tr>
			</div>

			
				`

for(let i=0; i < lista.length; i++) {
	pagHTML += `
			<tr data-href="${lista[i].id}">
				<td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
				<td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
			</tr>

	`
}


pagHTML += `
			</table>

			<script>
				document.addEventListener("DOMContentLoaded", () => {
					const rows = document.querySelectorAll("tr[data-href]");

					rows.forEach(row => {
						row.addEventListener("click", () => {
							window.location.href = row.dataset.href;
						});
					});
				});
			</script>

			</div>
				<footer class="w3-container w3-blue">
					<h5>Generated in RPCW 2023</h5>
				</footer>

		</body>
	</html>
	`
	return pagHTML
}


exports.perfilPage = function(pessoa, id) {
	

	var pagHTML = `

	<!DOCTYPE html>

	<html>
		<head>
			<meta charset = "UTF-8"/>
			<link rel="stylesheet" href="w3.css">
			<title> ${id} </title>
		</head>

		<body>

			<div class="w3-card-4">

			<header class="w3-container w3-blue">

				<div class="w3-card w3-center" style="width:100%">
  					<h1> ${pessoa.nome} </h1>
				</div>
			  
			</header>

			<div class="w3-container">

				<div class="row">
					<div class="column" style="float:left;width:50%;padding: 0 10px">
						<div class="w3-card">
							<h2> <b>Informações pessoais</b> </h2>
		  					<h4> <b>Idade</b>: ${pessoa.idade} </h4>
		  					<h4> <b>Sexo</b>: ${pessoa.sexo} </h4>
		  					<h4> <b>Morada</b>: ${pessoa.morada.cidade} - ${pessoa.morada.distrito} </h4>
		  					<h4> <b>Profissão</b>: ${pessoa.profissao} </h4>
		  					<h4> <b>BI/CC</b>: ${pessoa.CC ? pessoa.CC : pessoa.BI} </h4>
						</div>
					</div>
					
					<div class="column" style="float:left;width:50%">
							<div class="w3-card">
							<h2> <b>Descrição</b> </h2>
		  					<h4> ${pessoa.descricao ? pessoa.descricao : "Sem descrição"} </h4>
						</div>
					</div>
				</div>	
			
			</div>




			<div class="w3-container">

				<div class="row">
					<div class="column" style="float:left;width:33%">
							<div class="w3-card">
							<h2> <b>Atributos</b> </h2>
		  					<h4> <b>Fumador:</b> ${pessoa.atributos.fumador} </h4>
		  					<h4> <b>Gosta Cinema:</b> ${pessoa.atributos.gosta_cinema} </h4>
		  					<h4> <b>Gosta Viajar:</b> ${pessoa.atributos.gosta_viajar} </h4>
		  					<h4> <b>Acorda cedo:</b> ${pessoa.atributos.acorda_cedo} </h4>
		  					<h4> <b>Gosta ler:</b> ${pessoa.atributos.gosta_ler} </h4>
		  					<h4> <b>Gosta música:</b> ${pessoa.atributos.gosta_musica} </h4>
		  					<h4> <b>Gosta comer:</b> ${pessoa.atributos.gosta_comer} </h4>
		  					<h4> <b>Gosta animais estimação:</b> ${pessoa.atributos.gosta_animais_estimacao} </h4>
		  					<h4> <b>Gosta dançar:</b> ${pessoa.atributos.gosta_dancar} </h4>
		  					<h4> <b>Comida Favorita:</b> ${pessoa.atributos.comida_favorita} </h4>
						</div>
					</div>


					<div class="column" style="float:left;width:33%">
							<div class="w3-card">
							<h2> <b>Gostos</b> </h2>
		  					<h4> <b>Desportos:</b> ${pessoa.desportos} </h4>
		  					<h4> <b>Animais:</b> ${pessoa.animais} </h4>
		  					<h4> <b>Figuras Públicas:</b> ${pessoa.figura_publica_pt} </h4>
		  					<h4> <b>Marca de carro:</b> ${pessoa.marca_carro} </h4>
						</div>
					</div>

					<div class="column" style="float:left;width:33%;padding: 0 10px">
						<div class="w3-card">
							<h2> <b>Crenças</b> </h2>
		  					<h4> <b>Partido político:</b> ${pessoa.partido_politico.party_name} </h4>
		  					<h4> <b>Religião</b> ${pessoa.religiao ? pessoa.religiao : "Sem religião"} </h4>
						</div>
					</div>
					
				</div>	
			
			</div>



			<footer class="w3-container w3-blue">
			  <h5>Footer</h5>
			</footer>

			</div>

		</body>
		
	</html>
	
	`

	return pagHTML
}



exports.sexoPage = function(listaF, listaM, listaO) {

	var pagHTML = 
	`
	<!DOCTYPE html>

	<html>
		<head>
			<meta charset = "UTF-8"/>
			<link rel="stylesheet" href="w3.css">
			<title> Distribuição por sexo </title>
		</head>

		<body>

		<table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Distribuição por sexo</h3>
                    <a name="indice"/>
                    <!-- Lista com a Distribuição por sexo -->
                    <ul>
                        <li>
                            <a href="/tabela_sexo_f"> Nº de pessoas sexo femínino: ${listaF.length} </a>
                        </li>
                        <li>
                            <a href="/tabela_sexo_m"> Nº de pessoas sexo masculino: ${listaM.length} </a>
                        </li>
                        <li>
                            <a href="/tabela_sexo_o"> Nº de pessoas sexo outro: ${listaO.length} </a>
                        </li>

                    </ul>   
                </td>
            </tr>
        </table>

    ` 
	
	pagHTML += `

		</body>
		
	</html>
	`

	return pagHTML
}


exports.desportosPage = function(dictDesportos) {

	var pagHTML = 
	`
	<!DOCTYPE html>

	<html>
		<head>
			<meta charset = "UTF-8"/>
			<link rel="stylesheet" href="w3.css">
			<title> Distribuição por desporto </title>
		</head>

		<body>

		<table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Distribuição por desporto</h3>
                    <a name="indice"/>
                    <!-- Lista com a Distribuição por desporto -->
                    <ul>
    `

    sortedArray = Object.keys(dictDesportos).sort()

    for (const key of sortedArray) { 
  		pagHTML += 
		`
		                <li>
		                    <a href="/tabela_desporto_${key}"> Nº de ${key} : ${dictDesportos[key]} </a>
		                </li>

		`
	};


    pagHTML += 
    `




    ` 
	
	pagHTML += 
	`
	                </ul>   
                </td>
            </tr>
        </table>

		</body>
		
	</html>
	`

	return pagHTML
}


exports.top10ProfissoesPage = function(dictProfissoes) {

	var pagHTML = 
	`
	<!DOCTYPE html>

	<html>
		<head>
			<meta charset = "UTF-8"/>
			<link rel="stylesheet" href="w3.css">
			<title> Top 10 profissoes </title>
		</head>

		<body>

		<table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Top 10 profissoes</h3>
                    <a name="indice"/>
                    <!-- Lista com Top 10 profissoes-->
                    <ul>
    `

	// Step - 1
	// Create the array of key-value pairs
	var items = Object.keys(dictProfissoes).map(
	  (key) => { return [key, dictProfissoes[key]] });

	// Step - 2
	// Sort the array based on the second element (i.e. the value)
	items.sort(
	  (first, second) => { return second[1] - first[1] }
	);

	// Step - 3
	// Obtain the list of keys in sorted order of the values.
	var keys = items.map(
	  (e) => { return e[0] });

	var values = items.map(
	  (e) => { return e[1] });


    for (let i = 0; i < 10; i++) { 
  		pagHTML += 
		`
		                <li>
		                    <a href="/tabela_profissao_${keys[i]}"> ${i+1}. Nº de <b>${keys[i]}</b> : ${values[i]} </a>
		                </li>

		`
	};


    pagHTML += 
    `




    ` 
	
	pagHTML += 
	`
	                </ul>   
                </td>
            </tr>
        </table>

		</body>
		
	</html>
	`

	return pagHTML
}

