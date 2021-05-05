var express = require('express');
var router = express.Router();
var app = express();
const pool = require("../config/database");
const linkDao = require ('../models/links')
const excedio = require('../public/javascripts/restriccionCampo')


const pageEnlaces = async function (req, res) {
    if (req.isAuthenticated()) {
        let message = req.flash ('message');
        const links = await pool.query('select * from links where iduser = ' + id_link) // id
        const user = await pool.query('select * from users where idusers = ' + id_link) // id
        res.render('APP/inApp', {links: links, user: user, title: "Inicio",message})
        res.end()
    } else {
        res.render("Principal/index", {title: "LinkedPost"})
    }
}

const pageEnlaces_Agregar = async function (req,res) {
    if(req.isAuthenticated()){
        res.render('APP/Agregar', { title: "agregar" } )
        res.end()
    }else{
        res.render("Principal/index", {title: "LinkedPost"})
    }
}

const pageEnlace_Validar = async function (req,res) {
    const {title,url,description} = req.body
    let id = req.user.id;
    console.log(req.user.id)
    const addLink = {title,url,description,id}
    excedio.tituloExcedio(req,res,addLink);
    excedio.descripcionExcedio(req,res,addLink);
    excedio.titulo_descripcion_excedio(req,res,addLink)
    linkDao.insertLink(addLink,(data) =>{res.redirect("/links")})
}

const pageEnlace_editarEnlace = async function (req,res) {
    if(req.isAuthenticated()){
        const {idlinks} = req.params
        const links = await pool.query("select * from links where idlinks = ?",[idlinks])
        res.render('APP/Editar', {link: links[0], title:"Editar"} )
        res.end()
    }else{
        res.render("Principal/index", {title: "LinkedPost"})
    }
}

const pageEnlace_editarEnlace_Action = async function (req,res) {
    const {idlinks} = req.params; let id = idlinks

    const {title,url,description} = req.body
    const editLink = { title,url,description};

    excedio.tituloExcedio(req,res,editLink);
    excedio.descripcionExcedio(req,res,editLink);
    excedio.titulo_descripcion_excedio(req,res,editLink)
    excedio.titulo_descripcion_adecuado_editar(req,res,editLink,id)
}

const pageEnlace_eliminarEnlace_Action = async function (req,res) {
    if(req.isAuthenticated()){
        const {idlinks} = req.params;
        id = idlinks;
        linkDao.deleteLink(id,(data)=>{res.redirect("/links")})
    }else{
        res.render("Principal/index", {title: "LinkedPost"})
    }
}
const cerrarSesion = function (req,res) {
    if(req.isAuthenticated()){
        req.logout();
    }
    res.render("Principal/index", {title: "LinkedPost"})
}

module.exports = {
    router,
    pageEnlaces,
    pageEnlaces_Agregar,
    pageEnlace_Validar,
    pageEnlace_editarEnlace,
    pageEnlace_editarEnlace_Action,
    pageEnlace_eliminarEnlace_Action,
    cerrarSesion
}
