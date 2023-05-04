const express = require('express');

const { usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioDelete
} = require('../controllers/usuario.controller');


const router = express.Router();

router.get('/',usuarioGet);

router.post('/',usuarioPost);

router.put('/',usuarioPut);

router.delete('/',usuarioDelete);

module.exports = router;