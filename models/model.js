var path= require('path');

// carga modelo ORM
var Sequelize = require('sequelize');

// usar BBDD SQLite
var sequelize = new Sequelize (null,null,null,
			{dialect:"sqlite",storage:"quiz.sqlite"}
			);
			
// importar la definicion de la table Quiz en quiz.js
var Quiz = sequelize.import (path.join(__dirname,'quiz'));
exports.Quiz =Quiz;  // exportar definicion de la tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
	// success(..) ejecuta en manelador una vez creada la tabla
	Quiz.count().success(function (count){
		if (count===0) {  // la tabla se inicializa solo si está vacia
			Quiz.create({pregunta:'capital de Italia',
			             respuesta:'Roma'
			})
		.success (function(){console.log('Base de datos inicializada')});
		};
	});
});

