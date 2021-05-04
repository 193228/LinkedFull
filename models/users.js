var express = require('express');
var router = express.Router();
var app = express();
const pool = require("../config/database");
app.use(express.json());

module.exports = {

    findUser:(username,callback)=>{
        let sql ="SELECT * FROM users WHERE username = " + '"' +username+ '"'
        console.log(sql)
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            if(data.length>0) return callback(data[0]);
            if(data.length==0)
                return callback(data[err]);
        });
    },

    getAllUser:(callback)=>{
        let sql = 'SELECT * FROM users';
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            if(data.length>0) return callback(data[0]);
            if(data.length==0)
                return callback(data[err]);
        });
    },

    insertUser:(user,callback)=> {
        let nombre = '"' + user.fullname + '"';
        let usuario = '"' + user.username + '"';
        let contrasena = '"' + user.password + '"';
        let sql = "insert into users (fullname,username,password) values (" + nombre + ',' + usuario + ',' + contrasena + ")"
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            if(data.length>0) return callback(data[0]);
            if(data.length==0)
                return callback(data[err]);
        });
    },

    updatePassword:(password,callback)=>{
        //UPDATE users SET password= 'nuevo' WHERE idusers= 7
        let nuevaContrasena = '"'+password.newPassword+'"'
        let id = '"'+password.id+'"'

        console.log(password.newPassword)

        let sql = "UPDATE users set password = "+nuevaContrasena+" WHERE idusers= "+id
        console.log(sql)
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            if(data.length>0) return callback(data[0]);
            if(data.length==0)
                return callback(data[err]);
        });

    },

    deleteUser:(idUser,callback)=>{
        let sql = 'DELETE FROM users WHERE idusers= '+idUser;
        console.log(sql)
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            if(data.length>0) return callback(data[0]);
            if(data.length==0)
                return callback(data[err]);
        });
    },
}