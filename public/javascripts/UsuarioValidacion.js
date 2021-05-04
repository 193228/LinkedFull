var express = require('express');
var router = express.Router();
var app = express();
const userDao = require ('../../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;


function agregarUsuario(req,res,password,newUser) {
    if(password.length<5){
        req.flash('message',"Contraseña debil\nminimo 5 letras")
        res.redirect('/users/register')
    }else{
        console.log("AGREGATE")
        agregarUsuario_action(req,res,newUser)
    }
}

function agregarUsuario_action(req,res,newUser) {
    userDao.findUser(newUser.username,(data)=>{
        if(data){
            console.log("existe")
            req.flash('message',"Usuario ya registrado ingrese otro")
            res.redirect('/users/register')
        }else{
            console.log("no existe")
            userDao.insertUser(newUser,(data)=>{console.log(data)})
            res.redirect("/")
        }
    })
}

function editarUsuario(req,res,username,password,newPassword,id){
    if(newPassword.length<5){
        console.log("ENTRO aca pero porque?")
        req.flash('message',"Contraseña debil\nminimo 5 letras")
        res.redirect('/users/login/cambioContrasena')
    }else{
        console.log(password.length)
        editarUsuario_action(req,res,username,password,newPassword,id)
    }
}

function editarUsuario_action(req,res,username,password,newPassword, id){
    userDao.findUser(username,(data) =>{
        if(data && bcrypt.compareSync(password,data.password)){
            console.log("SI COINCIDE")
            const cambioContrasena = {username,password,newPassword: bcrypt.hashSync(newPassword,saltRounds), id:data.idusers}
            userDao.updatePassword(cambioContrasena,(data) =>{})
            res.redirect('/')
        }else if (data && !bcrypt.compareSync(password, data.password)){
            req.flash('message'," contraseña incorrecta")
            res.redirect('/users/login/cambioContrasena')
        }
        if (!data){
            req.flash('message'," Usuario incorrecto")
            res.redirect('/users/login/cambioContrasena')
        }
    });
}

function eliminarUsuario(req,res,username,password,id){
    userDao.findUser(username,(data) => {
        if (data && bcrypt.compareSync(password, data.password)) {
            console.log("SI COINCIDE")
            const eliminoUsuario = {username, password: bcrypt.hashSync(password, saltRounds), id: data.idusers}
            userDao.deleteUser(eliminoUsuario.id, (data) => {})
            res.redirect('/')
        }else if (data && !bcrypt.compareSync(password, data.password)){
            req.flash('message'," contraseña incorrecta")
            res.redirect('/users/login/eliminoCuenta')
        }
        if (!data) {
            req.flash('message',"Usuario incorrecto")
            res.redirect('/users/login/eliminoCuenta')
        }
    })
}

module.exports = {
    agregarUsuario,
    editarUsuario,
    eliminarUsuario
}