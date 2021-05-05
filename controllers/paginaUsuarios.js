const passport = require("passport")
const passportLocal = require("passport-local").Strategy
var express = require('express');
var router = express.Router();
var app = express();
const pool = require("../config/database");
const userDao = require ('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../public/javascripts/UsuarioValidacion')
var idlink

passport.use(new passportLocal( (username,password,done)=> {
    userDao.findUser(username,(data) =>{
        if(data && bcrypt.compareSync(password,data.password)){
                id_link = data.idusers;
                passport.deserializeUser((id,done) => done (null, {id:data.idusers, name:data.username})); //aca tengo que obtener el objeto a pasar
                passport.serializeUser((user,done) => done (null,{id:user.id,name:user.name}));
                return done(null, {id:data.idusers, name:data.username})
        }
        else if(data && !bcrypt.compareSync(password,data.password))
            return done(null,false, {message: "Contraseña incorrecta"})
        if(!data)
            return done(null,false, {message: "Usuario Incorrecto"})
    })
}))

const validacion = router.post("/validate",passport.authenticate('local',  {
    successRedirect: '/links',
    failureRedirect: '/users/login',
    failureFlash: 'Usuario o contraseña incorrecto'
}));

const pageRegistro = function (req,res){
    let message = req.flash ('message');
    res.render('Registro/registro',{title: "Registro" ,message})
    res.end();
}

const pageRegistro_agregarUsuario = function(req,res){
    const {fullname, username, password} = req.body
    const nuevoUsuario = {fullname, username, password: bcrypt.hashSync(password,saltRounds)}
    User.agregarUsuario(req,res,password,nuevoUsuario)
}

const pageLogin = function (req,res){
    let message = req.flash ('error');
    res.render('Login/login', {title:"Login" ,message})
}

const pageUpdate_cambioContrasena = function(req,res){
    let message = req.flash ('message');
    res.render('opcionesUsuario/cambiarContrasena', {title:"Login",message})
}

const pageUpdate_eliminoCuenta = function(req,res){
    let message = req.flash ('message');
    res.render('opcionesUsuario/eliminarCuenta', {title:"Login",message})
}

const pageUpdate_cambioContrasena_action = function (req,res){
    const {username,password,newPassword,id} = req.body
    User.editarUsuario(req,res,username,password,newPassword,id);
}

const pageUpdate_eliminoCuenta_action = function (req,res){
    const {username,password,newPassword,id} = req.body
    User.eliminarUsuario(req,res,username,password,id)
}

module.exports = {
    router,
    validacion,
    pageRegistro,
    pageRegistro_agregarUsuario,
    pageLogin,
    pageUpdate_cambioContrasena,
    pageUpdate_eliminoCuenta,
    pageUpdate_cambioContrasena_action,
    pageUpdate_eliminoCuenta_action,
}





