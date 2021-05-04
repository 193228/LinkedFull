const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('../keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Coneccion de base de datos se cerra.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Coneccion de base de datos demoro mucho');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Coneccion de base de datos no encontrado');
        }
    }

    if (connection) connection.release();
    console.log('Base de datos mysql conectada correctamente');
    return;

});

pool.query = promisify(pool.query);
module.exports = pool;
