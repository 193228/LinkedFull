var express = require('express');
var router = express.Router();
var app = express();
const controllerRoot = require('../controllers/paginaPrincipal')

router.get('/',controllerRoot.pageInicial);

router.get('/dudas',controllerRoot.pageDudas);

router.get('/acercaDe',controllerRoot.pageAcerca);

module.exports = router;