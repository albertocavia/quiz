var models=require('../models/model.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', { textoIndex:"Lista de Preguntas",quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

// guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');  
  })   // res.redirect: Redirección HTTP a lista de preguntas
};

// GET /quizes/search
exports.search = function(req, res) {
  if (req.query.search===undefined){
      console.log('\nRender search ??? \n');
      res.render('quizes/search');
  }
  else {
  	  var search = req.query.search;
      search = search.split(" ").join('%');
      search = '%' + search + '%';
  	  var query = { where: ["pregunta  like ?", search] };
	  models.Quiz.findAll(query).then(
	    function(quizes) {
	     if (quizes.length===0){
	         res.render('quizes/index', { textoIndex:"Pregunta no encontrada.", quizes: quizes});
         }
	     else	{
	         res.render('quizes/index', { textoIndex:"Encontrada.", quizes: quizes});
	     }
	    }
	  ).catch(function(error) { next(error);})

  }
};

// GET /autor
exports.autor=function(req,res){
	res.render('author',{autor:'Alberto Cavia',foto:'/images/foto.png'});
};