var express = require('express');
var router = express.Router();
var Tarefa = require('../controllers/tarefa')


/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  Tarefa.listaTarefasTodo()
    .then(listaTodo => {

      Tarefa.listaTarefasDone()
        .then(listaDone => {
          res.render('index', {data: d, lTodo: listaTodo, lDone: listaDone})
        })
         .catch(erro => {
          res.render('error', {error: erro})
        })
      
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});


/* GET Tarefa TODO delete page. */
router.get('/tarefas_por_realizar/delete/:idTarefa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)

  Tarefa.deleteTarefaTodo(req.params.idTarefa)
    .then(tarefaTodo => {
      res.render('deletedTarefa', { id: req.params.idTarefa, d : data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

/* GET Tarefa DONE delete page. */
router.get('/tarefas_realizadas/delete/:idTarefa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)

  Tarefa.deleteTarefaDone(req.params.idTarefa)
    .then(tarefaTodo => {
      res.render('deletedTarefa', { id: req.params.idTarefa, d : data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});


/* GET Tarefa TODO edit page. */
router.get('/tarefas_por_realizar/edit/:idTarefa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)


  Tarefa.getTarefaTodo(req.params.idTarefa)
    .then(tarefaTodo => {
      res.render('editTarefa', { t: tarefaTodo, d : data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })

});


/* GET Tarefa DONE edit page. */
router.get('/tarefas_realizadas/edit/:idTarefa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)


  Tarefa.getTarefaDone(req.params.idTarefa)
    .then(tarefaDone => {
      res.render('editTarefa', { t: tarefaDone, d : data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })

});


/* POST Tarefa done page */
router.get('/tarefas_por_realizar/done/:idTarefa', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  
  Tarefa.addTarefaDone(req.body)
    .then(t1 => {

      Tarefa.deleteTarefaTodo(req.params.idTarefa)
        .then(t2 => {
          res.render('confirmTarefaDone', { id: req.params.idTarefa, d : data })
        })
        .catch(erro => {
          res.render('error', {error: erro})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })

})


/* POST Nova Tarefa TODO */
router.post('/tarefas_por_realizar/add/', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  
  Tarefa.addTarefaTodo(req.body)
    .then(tarefaTodo => {
      res.render('confirmAddTarefaTodo', { t: tarefaTodo, d: data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

/* POST Edit Tarefa TODO */
router.post('/tarefas_por_realizar/edit/:idTarefa', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  
  Tarefa.editTarefaTodo(req.body)
    .then(tarefaTodo => {
      res.render('confirmEditTarefa', { t: tarefaTodo, d: data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

/* POST Edit Tarefa DONE */
router.post('/tarefas_realizadas/edit/:idTarefa', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  
  Tarefa.editTarefaDone(req.body)
    .then(tarefaDone => {
      res.render('confirmEditTarefa', { t: tarefaDone, d: data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})


module.exports = router;
