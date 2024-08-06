const express = require('express'); 
const router = express.Router(); 
const {body} = require('express-validator');

//referência a controllers que serão utilizados nas rotas
const UsuariosController = require('../controllers/usuarios'); 
const NivelAcessoController = require('../controllers/nivel_acesso'); 
const DadosController = require('../controllers/dados'); 
const AlertaController = require('../controllers/alerta'); 
const LogsController = require('../controllers/logs'); 
const LocalizacaoController = require('../controllers/localizacao'); 
const EquipamentoController = require('../controllers/equipamento'); 
const ParametroController = require('../controllers/parametro'); 

router.get('/usuarios', UsuariosController.listar); 
router.post('/usuarios', body('user_email').isEmail().withMessage('Por favor, forneça um email válido'),  UsuariosController.cadastrar); 
router.patch('/usuarios/:user_id', UsuariosController.editar); 
router.delete('/usuarios/:user_id', UsuariosController.apagar); 
router.post('/usuarios/login', UsuariosController.login); 

router.get('/nivel_acesso', NivelAcessoController.listar); 
router.post('/nivel_acesso', NivelAcessoController.cadastrar); 
router.patch('/nivel_acesso/:nivel_id', NivelAcessoController.editar); 
router.delete('/nivel_acesso/:nivel_id', NivelAcessoController.apagar); 

router.get('/dados', DadosController.listar); 
router.post('/dados', DadosController.cadastrar); 

router.get('/alerta', AlertaController.listar); 
router.post('/alerta', AlertaController.cadastrar); 
router.patch('/alerta/:alerta_id', AlertaController.editar); 
router.delete('/alerta/:alerta_id', AlertaController.apagar); 

router.get('/logs', LogsController.listar); 
router.post('/logs', LogsController.cadastrar); 
router.patch('/logs/:logs_id', LogsController.editar); 

router.get('/localizacao', LocalizacaoController.listar); 
router.post('/localizacao', LocalizacaoController.cadastrar); 
router.patch('/localizacao/:loc_id', LocalizacaoController.editar); 
router.delete('/localizacao/:loc_id', LocalizacaoController.apagar); 

router.get('/equipamento', EquipamentoController.listar); 
router.post('/equipamento',EquipamentoController.cadastrar); 
router.patch('/equipamento/:equip_id', EquipamentoController.editar); 
router.delete('/equipamento/:equip_id', EquipamentoController.apagar); 

router.get('/parametro', ParametroController.listar); 
router.post('/parametro',ParametroController.cadastrar); 
router.patch('/parametro/:param_id', ParametroController.editar); 
router.delete('/parametro/:param_id', ParametroController.apagar); 



module.exports = router;