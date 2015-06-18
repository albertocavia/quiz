var models=require('../models/model.js');

// GET /quizez/question
exports.question=function(req,res){
    models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question',{pregunta:quiz[0].pregunta})
	})
};

//GET /quizes/answer
exports.answer = function (req,res) {
    models.Quiz.findAll().success(function(quiz) {
		if (req.query.respuesta ===quiz[0].respuesta){
			res.render('quizes/answer',{respuesta:'Correcto'});
		} else {
			res.render('quizes/answer',{respuesta:'Incorrecto'});
		}
	})
};

// GET /autor
exports.autor=function(req,res){
	res.render('author',{autor:'Alberto Cavia',foto:'/images/foto.png'});
};
