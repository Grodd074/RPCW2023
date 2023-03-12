exports.singlePageApp = function(lista_tarefas_todo, lista_tarefas_done, d, editRowId, editTableId) {
	var pagHTML = `
	<!DOCTYPE html>

	<html>
		<head>
			<meta charset = "UTF-8"/>
        	<link rel="icon" href="favicon.png"/>
			<link rel="stylesheet" href="w3.css">
			<title>To Do List</title>
		</head>


		
		<body>

			<!-- Input form -->
	        
	        <form class="w3-container" method="POST" action="/tarefas_por_realizar/add/" style="float:left;width:50%">
	            <div class="column" style="float:left;width:90%;padding: 0 10px">
	                <div class="w3-card w3-center w3-black">
	                    <h2> <b>Adicionar Tarefas</b> </h2>
	                    <fieldset>
	                        <legend>Tarefa:</legend>
	                        <label>O que deve ser feito?</label>
	                        <input class="w3-input w3-round" type="text" name="whatToDo">
	                        <label>Quem faz?</label>
	                        <input class="w3-input w3-round" type="text" name="whoToDo">	                        
	                        <label for="deadline-label">Deadline</label>
							<input type="date" id="start" name="deadline" value="${d}" min="2023-03-01" max="2024-01-31">
	                    </fieldset> 
	                </div>
	            </div>

	            <div class="column" style="float:right;width:10%;padding: 0 10px">
	                <button class="w3-button w3-green w3-mb-2" type="submit"><b>Add</b></button>
	            </div>
	        </form>



			<!-- TODO List -->

	        <div class="w3-container" style="float:right;width:50%;padding: 0 30px">

            	<div class="column" >
                	<div class="w3-card w3-center w3-black" style="padding: 0 30px">
                    	<h2> <b>Tarefas por Realizar</b> </h2>
                	</div>

					<table class="w3-table-all w3-hoverable">
						<tr>
							<th>OPs</th><th>What</th><th>Who</th><th>Deadline</th>
						</tr>
				

			
`

// TODO List
for(let i=0; i < lista_tarefas_todo.length; i++) {
	
	pagHTML += `
						<tr>
							<td>
								<!-- Botão Done -->															
								<form method="POST" action="/tarefas_por_realizar/done/${lista_tarefas_todo[i].id}">
                        			<input type="hidden" name="whatToDo" value="${lista_tarefas_todo[i].whatToDo}">
                        			<input type="hidden" name="whoToDo" value="${lista_tarefas_todo[i].whoToDo}">
                        			<input type="hidden" name="deadline" value="${lista_tarefas_todo[i].deadline}">													  	
									<button class="w3-button w3-green w3-mb-2" type="submit" style="font-size: 10px;padding: 0 2px;">DONE</button>
								</form>

								<!-- Botão Delete -->															
								<form method="POST" action="/tarefas_por_realizar/delete/${lista_tarefas_todo[i].id}">
                        			<input type="hidden" name="whatToDo" value="${lista_tarefas_todo[i].whatToDo}">
                        			<input type="hidden" name="whoToDo" value="${lista_tarefas_todo[i].whoToDo}">
                        			<input type="hidden" name="deadline" value="${lista_tarefas_todo[i].deadline}">													  	
									<button class="w3-button w3-red w3-mb-2" type="submit" style="font-size: 10px;padding: 0 5px;">DEL</button>
								</form>
	`


	if (i == editRowId && editTableId == 0) {
		// Editable Mode
		pagHTML += `
								<!-- Botão Aplica Edit -->															
								<form class="w3-container" method="POST" action="/tarefas_por_realizar/edit/${lista_tarefas_todo[i].id}" style="float:left;width:50%">										  	
									<button class="w3-button w3-yellow w3-mb-2" type="submit" style="font-size: 10px;padding: 0 2px;">OK</button>
								


							</td>
									<td><input type="text" value="${lista_tarefas_todo[i].whatToDo}" name="whatToDo" class="field left"></td>
									<td><input type="text" value="${lista_tarefas_todo[i].whoToDo}" name="whoToDo" class="field left"></td>
									<td><input type="text" value="${lista_tarefas_todo[i].deadline}" name="deadline" class="field left"></td>
								</form>
		`
	} else {
		// Read only Mode
		pagHTML += `
								<!-- Botão Edit Mode -->															
								<form method="GET" action="/tarefas_por_realizar/editRow/${i}">											  	
									<button class="w3-button w3-yellow w3-mb-2" type="submit" style="font-size: 10px;padding: 0 2px;">EDIT</button>
								</form>


							</td>
						
							<td>${lista_tarefas_todo[i].whatToDo}</td>
							<td>${lista_tarefas_todo[i].whoToDo}</td>
							<td>${lista_tarefas_todo[i].deadline}</td>
		`
	}
	

	
}


pagHTML += `
						</tr>
					</table>
				</div>

			</div>




			<!-- Done List -->


			<div class="w3-container" style="float:left;width:50%">

            	<div class="column" >
                	<div class="w3-card w3-center w3-black" style="padding: 0 30px">
                    	<h2> <b>Done</b> </h2>
                	</div>

					<table class="w3-table-all w3-hoverable">
						<tr>
							<th>Ops</th><th>What</th><th>Who</th><th>Deadline</th>
						</tr>				
	`

// DONE List
for(let i=0; i < lista_tarefas_done.length; i++) {
	
	pagHTML += `
						<tr>
							<td>
								<!-- Botão Delete -->															
								<form method="POST" action="/tarefas_realizadas/delete/${lista_tarefas_done[i].id}">
                        			<input type="hidden" name="whatToDo" value="${lista_tarefas_done[i].whatToDo}">
                        			<input type="hidden" name="whoToDo" value="${lista_tarefas_done[i].whoToDo}">
                        			<input type="hidden" name="deadline" value="${lista_tarefas_done[i].deadline}">													  	
									<button class="w3-button w3-red w3-mb-2" type="submit" style="font-size: 10px;padding: 0 5px;">DEL</button>
								</form>
	`

	if (i == editRowId && editTableId == 1) {
		// Editable Mode

		pagHTML += `
								<!-- Botão Aplica Edit -->															
								<form method="POST" action="/tarefas_realizadas/edit/${lista_tarefas_done[i].id}">                        														  
									<button class="w3-button w3-yellow w3-mb-2" type="submit" style="font-size: 10px;padding: 0 2px;">OK</button>
								
							</td>

									<td><input type="text" value="${lista_tarefas_done[i].whatToDo}" name="whatToDo" class="field left"></td>
									<td><input type="text" value="${lista_tarefas_done[i].whoToDo}" name="whoToDo" class="field left"></td>
									<td><input type="text" value="${lista_tarefas_done[i].deadline}" name="deadline" class="field left"></td>
								
								</form>
		`

	} else {
		// Read only Mode
		pagHTML += `
								<!-- Botão Edit Row -->															
								<form method="GET" action="/tarefas_realizadas/editRow/${i}">                        														  
									<button class="w3-button w3-yellow w3-mb-2" type="submit" style="font-size: 10px;padding: 0 2px;">EDIT</button>
								</form>
							</td>

							<td>${lista_tarefas_done[i].whatToDo}</td>
							<td>${lista_tarefas_done[i].whoToDo}</td>
							<td>${lista_tarefas_done[i].deadline}</td>
																				
						</tr>
		`
	}

	




}


pagHTML += `		
					</table>
				</div>

			</div>

		</body>

	</html>
	`
	return pagHTML
}