var express = require('express');
var router = express.Router();
var app = express();
const controllerLinks = require('../controllers/paginaEnlaces')

router.get('/',controllerLinks.pageEnlaces);

router.get('/add',controllerLinks.pageEnlaces_Agregar)

router.post('/validate',controllerLinks.pageEnlace_Validar)

router.get('/edit/:idlinks',controllerLinks.pageEnlace_editarEnlace)

router.post('/edit/:idlinks',controllerLinks.pageEnlace_editarEnlace_Action)

router.get('/delete/:idlinks',controllerLinks.pageEnlace_eliminarEnlace_Action)

router.get('/logout',controllerLinks.cerrarSesion)

module.exports = router;