var express = require('express');
var router = express.Router();
var app = express();

const pageInicial = function (req,res){
    res.render('Principal/index', { title: 'Linked Post'});
    res.end();
}

const pageDudas = function (req,res){
    res.render('About/dudas', { title: 'Dudas de la pagina'});
    res.end();
}

const pageAcerca = function (req,res){
    res.render('About/acercaDe', { title: 'Acerca de la pagina'});
    res.end();
}

module.exports = {
    router,
    pageInicial,
    pageDudas,
    pageAcerca
}
