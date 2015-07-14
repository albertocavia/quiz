var misEstadisticas = require ('../app.js');
var models = require('../models/model.js');

var estadisticas={"Num. de Preguntas":0,
                  "Num. de Comentarios":0,
                  "Num. Aciertos":0,
                  "Num. Errores":0,
//                  "Num. de accesos a la pagina":0,
                  "Num. de login":0,
                  "Num. accesos a estadisticas":0};
// GET /stadistics
exports.stadistics=function(req,res){
  misEstadisticas.contAccesosEstadisticas+=1;
  estadisticas["Num. accesos a estadisticas"]=misEstadisticas.contAccesosEstadisticas;
  estadisticas["Num. de login"]=misEstadisticas.contAccesosLogin;
  estadisticas["Num. Aciertos"]=misEstadisticas.contAciertos;
  estadisticas["Num. Errores"]=misEstadisticas.contErrores;

  models.Quiz.findAndCountAll().then( function(resp) {
		estadisticas["Num. de Preguntas"]= resp.count;
  }).done( function () {
    models.Comment.findAndCountAll().then( function(resp) {
	    estadisticas['Num. de Comentarios'] = resp.count;
	    }).done(function(){
            res.render('stadistics',{titulo:"ESTADISTICAS ",estadisticas:estadisticas,errors: []});
        });
	});
};

