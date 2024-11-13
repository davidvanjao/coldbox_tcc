const express = require('express'); 
const router = express.Router(); 
const {body} = require('express-validator');

//referência a controllers que serão utilizados nas rotas
const UsuariosController = require('../controllers/usuarios'); 
const ClienteController = require('../controllers/cliente'); 
const NivelAcessoController = require('../controllers/nivel_acesso'); 
const DadosController = require('../controllers/dados'); 
const AlertaController = require('../controllers/alerta'); 
const LogsController = require('../controllers/logs'); 
const LocalController = require('../controllers/local'); 
const EquipamentoController = require('../controllers/equipamento'); 
const ParametroController = require('../controllers/parametro'); 
const ArduinoController = require('../controllers/arduino');

router.get('/alerta', AlertaController.listar); //ok
router.post('/alerta', AlertaController.cadastrar); //ok
router.patch('/alerta/:alerta_id', AlertaController.editar); //ok
router.delete('/alerta/:alerta_id', AlertaController.apagar); //ok


router.get('/cliente', ClienteController.listar);//ok
router.post('/cliente', ClienteController.cadastrar); //ok
router.patch('/cliente/:cli_id', ClienteController.editar); //ok


router.get('/equipamento/:cli_id', EquipamentoController.listar); //ok
router.post('/equipamento',EquipamentoController.cadastrar); //ok
// router.patch('/equipamento/:equip_id', EquipamentoController.editar); //ok
router.delete('/equipamento/:equip_id', EquipamentoController.apagar); //ok
//traz os equipamentos da empresa
router.get('/equipamento/dadosEquipamentoEmpresa/:cli_id', EquipamentoController.listarDadosEquipamentoEmpresa); 
//traz a ultima comunicacao com o equipamento
router.get('/equipamento/dadosUltimaComunicacao/:equip_id', EquipamentoController.listarDadosUltimaComunicacao);
//Cadastrar equipamento/localização
router.post('/equipamento/cadastrarEquipComLocal', EquipamentoController.cadastrarEquipamentoELocal);
//Editar equipamento/localização
router.patch('/equipamento/:equip_id', EquipamentoController.editar);

//precisa enviar cli_id
router.get('/local/:cli_id', LocalController.listar); //ok
router.post('/local', LocalController.cadastrar); //ok
router.patch('/local/:loc_id', LocalController.editar); //ok
router.delete('/local/:local_id', LocalController.apagar); //ok

router.get('/nivel_acesso', NivelAcessoController.listar); //ok
router.post('/nivel_acesso', NivelAcessoController.cadastrar); //ok
router.patch('/nivel_acesso/:nivel_id', NivelAcessoController.editar); //ok
router.delete('/nivel_acesso/:nivel_id', NivelAcessoController.apagar); //ok

//precisa enviar equip_id
router.get('/dados/:equip_id', DadosController.listar);//ok 
router.get('/dados/mobile/:equip_id', DadosController.listarMobile);//ok 
router.get('/dados/web/:equip_id', DadosController.listarWeb);//ok 
router.post('/dados', DadosController.cadastrar); //ok



//precisa enviar equip_id
router.get('/parametro/:equip_id', ParametroController.listar); //ok
router.post('/parametro',ParametroController.cadastrar); //ok
router.patch('/parametro/:param_id', ParametroController.editar); //ok
router.delete('/parametro/:param_id', ParametroController.apagar); //ok


router.get('/logs/:equip_id', LogsController.listar); //ok
router.post('/logs', LogsController.cadastrar); //ok
router.patch('/logs/:alertEnviado_id', LogsController.editar); //ok
//traz total notificacoes em aberto
router.get('/logs/listarNotificacoesTotalEmAberto/:equip_id', LogsController.listarNotificacoesTotalEmAberto); //ok
//traz as notificacoes que nao foram visualizadas
router.get('/logs/listarNotificacoesNaoVisualizadas/:equip_id', LogsController.listarNotificacoesNaoVisualizadas); //ok





router.get('/usuarios/:cli_id', UsuariosController.listar);
router.post('/usuarios', body('user_email').isEmail().withMessage('Por favor, forneça um email válido'),  UsuariosController.cadastrar); 
router.patch('/usuarios/:user_id', UsuariosController.editar); 
router.delete('/usuarios/:user_id', UsuariosController.apagar);  
router.post('/usuarios/login', UsuariosController.login); //USADO PARA VERIFICAR DADOS DE LOGIN
router.get('/usuarios/dadosUsuario/:user_id', UsuariosController.listarDadosUsuario); //Buscar um usuário especifico pelo ID
router.post('/usuarios/uploadFotoPerfil/:userID', UsuariosController.uploadFotoPerfil);


//traz nome de usuario e nome da empresa - ok 
router.get('/usuarios/dadosUsuarioEmpresa/:user_id', UsuariosController.listarDadosUsuarioEmpresa); 

// Nova rota para recuperação de senha
router.post('/usuarios/send-reset-email', UsuariosController.enviarEmailRecuperacao);
router.post('/usuarios/send-user-email', UsuariosController.enviarEmailNovoUsuario);



// Rota para inserir dados de temperatura e umidade
router.post('/arduino',ArduinoController.cadastrarTemperaturaUmidade);


module.exports = router;