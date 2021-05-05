var express = require('express');
var router = express.Router();
var app = express();
const mysql = require("mysql");
const pool = require("../config/database");
app.use(express.json());

module.exports = {

    insertLink:(link,callback)=> {
        let titulo = '"' + link.title + '"';
        let url = '"' + link.url + '"';
        let descripcion = '"' + link.description + '"';
        let idUsuario = '"' + link.id + '"';

        console.log("el id usuario es: "+idUsuario)

        let sql = "insert into links (title, url, description, iduser) values (" + titulo + ',' + url + ',' + descripcion + ',' + idUsuario +  ")"
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
            return callback(data);
        });
    },

    updateLink: (link, id, callback) => {
        let titulo = '"' + link.title + '"';
        let url = '"' + link.url + '"';
        let descripcion = '"' + link.description + '"';

        let sql = "update links set title= " + titulo + "," + " url= " + url + "," + " description= " + descripcion + " where idlinks= " + id + "";
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            console.log(data)
            return callback(data);
        })
    },

    deleteLink:(id,callback)=>{
        let sql = 'DELETE FROM links WHERE idlinks= '+id;
        console.log(sql)
        pool.query(sql,(err,data)=>{
            if(err) throw err;
            return callback(null);
        });
    }

}