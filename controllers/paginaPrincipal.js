var express = require('express');
var router = express.Router();
var app = express();
var host = "https://linkedpost.herokuapp.com/"

const pageInicial = function (req,res){
    res.render('Principal/index', { title: 'Linked Post', host});
    res.end();
}

const pageDudas = function (req,res){
    res.render('About/dudas', { title: 'Dudas de la pagina', host });
    res.end();
}

const pageAcerca = function (req,res){
    res.render('About/acercaDe', { title: 'Acerca de la pagina', host });
    res.end();
}

module.exports = {
    router,
    pageInicial,
    pageDudas,
    pageAcerca
}
