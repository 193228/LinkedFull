var express = require('express');
var router = express.Router();
var app = express();
app.use(express.json());
const linkDao = require ('../../models/links')

function tituloExcedio(req,res,enlace) {
    if(enlace.title.length>45 && enlace.description.length<=110){
        console.log("titulo muy largo")
        req.flash('message',"El titulo es de 45 caracteres maximo, ingrese titulo mas corto")
        res.redirect('/links')
    }
}

function descripcionExcedio(req,res,enlace) {
    if(enlace.description.length>110 && enlace.title.length<=45){
        console.log("descripcion muy larga")
        req.flash('message',"La descripcion maxima es de 110 caracteres, ingrese descripcion mas corta")
        res.redirect('/links')
    }
}

function titulo_descripcion_excedio(req,res,enlace) {
    if(enlace.description.length>110 && enlace.title.length>45){
        console.log("descripcion muy larga y titulo muy largo")
        req.flash('message',"La descripcion y el titulo son muy largos, recuerde que el titulo debe de ser de 45 caracteres y la descripcion de 110 caracteres maximos")
        res.redirect('/links')
    }
}

function titulo_descripcion_adecuado_editar(req,res,Enlace,id){
    if(Enlace.title.length<=45 && Enlace.description.length<=110){
        console.log("BIEN")
        linkDao.updateLink(Enlace,id,(data)=>{res.redirect("/links")})
    }
}

function titulo_descripcion_adecuado_insertar(req,res,Enlace){
    if(Enlace.title.length<=45 && Enlace.description.length<=110){
        console.log("BIEN")
        linkDao.insertLink(Enlace,(data) =>{res.redirect("/links")})
    }
}


module.exports = {
    tituloExcedio,
    descripcionExcedio,
    titulo_descripcion_excedio,
    titulo_descripcion_adecuado_editar,
    titulo_descripcion_adecuado_insertar
}