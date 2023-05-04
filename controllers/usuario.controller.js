const {response,query} = require('express');


const usuarioGet = async (req=query,res=response) => {

    res.json({
        msg : 'Get'
    })
} 

const usuarioPost = async (req=query,res=response) => {

    res.json({
        msg : 'Post'
    })
} 

const usuarioPut = async (req=query,res=response) => {

    res.json({
        msg : 'Put'
    })
} 

const usuarioDelete = async (req=query,res=response) => {

    res.json({
        msg : 'Delete'
    })
} 


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}