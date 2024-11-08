/*****************************************************************************************
 * Objetivo: API para manipular dados de estados e cidades utilizando o metodo GET
 * Data: 01/11/2024
 * Autor: Richard
 * Versão: 1.0
 * ***************************************************************************************/

/*
Para criar uma API  precisa instalar :
- express   npm install express --save             -Serve para criar a API
- body-parser    npm install body-parser --save    -Serve para manipular os dados enviados para a API pelo body
-cors            npm install cors --save                   -Serve para configurar a permissões da  API
*/

// Import da bibliotecas para criar a API 
const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')

//Inicializando o express através do objeto app
const app = express()

//request - Serve  para a API receber dados
//response - Serve para a API enviar dados


//Configurações de permissões da API
app.use((request, response, next) => {

    //Permissão de qual ou quais máquinhas irão acessar a API 
    response.header('Access-Control-Allow-Origin', '*')

    //Permissão de quais verbos poderão se utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET')


    app.use(cors())

    next()

})

//importa o arquivo de funções
const estadosCidades = require('./modulo/funcoes.js')



//EndPoint para retonar a lista de etados pela sigla
app.get('/v1/estados-cidades/lista-estados/siglas', cors(), async function(request, response){

    

    //Chama a função para listar os estados
    let dadosEstados = estadosCidades.getListaDeEstados()

    if(dadosEstados){
        response.status(200)
        response.json(dadosEstados)
    }else{
        response.status(404)
        response.json({'status': 404 , 'message': 'Não foram encontrados dados para retonar.'})
    }
})

//Endpoint para retonar dados do estado filtrando pela sigla 
app.get('/v1/estados-cidades/estado/:sigla', cors(), async function(request, response){

    //recebe a variavel sgla via parametro da url
    let uf =  request.params.sigla

    let dadosEstado = estadosCidades.getDadosDeEstado(uf)
    
    if(dadosEstado){
        response.status(200)
        response.json(dadosEstado)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retonar.'})
    }
})

//Endpoint para retonar a capital do estado filtrando pela sigla
app.get('/v1/estados-cidades/capital/estado', cors(), async function(request, response){

    //recebe a sigla do estado pelo QueryString
    let uf = request.query.sigla

    let dadosEstado = estadosCidades.getCapitalEstado(uf)

if(dadosEstado){
    response.status(200)
    response.json(dadosEstado)
}else{
    response.status(404)
    response.json({'status': 404, 'message': 'Não foi localizado a capital referente ao estado informado.'})
}
})


app.get('/v1/estados-cidades/estados/regiao' , cors(), async function(request, response){

    let uf = request.query.sigla

    let dadosEstado = estadosCidades.getEstadosRegiao(uf)

    if(dadosEstado){
        response.status(200)
        response.json(dadosEstado)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi localizado a região referente ao estado informado.'})
    }
})



app.get('/v1/estados-cidades/capital/pais' , cors(), async function(request, response){

    let uf = request.query.sigla

    
    let dadosEstado = estadosCidades.getCapitalPais(uf)

    if(dadosEstado){
        response.status(200)
        response.json(dadosEstado)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi localizado o pais referente a capital informado.'})
    }
})

app.get('/v1/estados-cidades/cidades' , cors(), async function(request, response){

    let uf = request.query.sigla

    
    let dadosEstado = estadosCidades.getCidades(uf)

    if(dadosEstado){
        response.status(200)
        response.json(dadosEstado)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi localizado a cidade informada.'})
    }
})


//permite deixa a API aguardando novas requisições
app.listen('8080', function(){
    console.log('API aguardando novas requisições...')
})