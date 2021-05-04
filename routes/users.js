var express = require('express');
var router = express.Router();
var app = express();
const controllerUser = require('../controllers/paginaUsuarios')

router.get('/register',controllerUser.pageRegistro)

router.post('/add',controllerUser.pageRegistro_agregarUsuario)

router.get('/login',controllerUser.pageLogin)

router.post('/validate',controllerUser.validacion)

router.get('/login/cambioContrasena',controllerUser.pageUpdate_cambioContrasena)

router.get('/login/eliminoCuenta',controllerUser.pageUpdate_eliminoCuenta)

router.post('/cambio',controllerUser.pageUpdate_cambioContrasena_action)

router.post('/elimino',controllerUser.pageUpdate_eliminoCuenta_action)

module.exports = router;