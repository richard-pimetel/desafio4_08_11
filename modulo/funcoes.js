/*****************************************************************************************
 * Objetivo: completar o desasfio 4 
 * Data: 01/11/2024
 * Autor: Richard
 * Versão: 1.0
 * ***************************************************************************************/
const estadoCidade = require('./estados_cidades.js')

const getListaDeEstados = function(){  
    let siglaEstados = []
    estadoCidade.listaDeEstados.estados.forEach(function(estados){
    siglaEstados.push(estados.sigla)
    })
    return {
        uf: siglaEstados,
        quantidade: siglaEstados.length
    }
    
}
//console.log(getListaDeEstados(''))



const getDadosDeEstado = function(sigla){
     
    let dadosEstados = null

    estadoCidade.listaDeEstados.estados.forEach(function(dados) {
        if(String(dados.sigla).toUpperCase() === sigla.toUpperCase()){
            dadosEstados = {
                uf: dados.sigla,
                descricao: dados.nome,
                capital: dados.capital,
                regiao: dados.regiao
            }
        }
    })
    return dadosEstados || false
}
//console.log(getDadosDeEstado('sasfas'))




const getCapitalEstado = function(sigla){ 
    let capitaisEstados = null

    estadoCidade.listaDeEstados.estados.forEach(function(dados){
        if (String(dados.sigla).toUpperCase() === sigla.toUpperCase()){
            capitaisEstados = {
                uf: dados.sigla,
                descricao: dados.nome,
                capital: dados.capital
            }
        }
    })
    return capitaisEstados || false
}
//console.log(getCapitalEstado('dsadasf'))




const getEstadosRegiao = function(regiao){ 
    let EstadosRegioes = {
        regiao: regiao,
        estado: []
    };
    estadoCidade.listaDeEstados.estados.forEach(function(estado){
        if (String(estado.regiao).toUpperCase() === regiao.toUpperCase()){
            EstadosRegioes.estado.push({
                uf: estado.sigla, descricao: estado.nome
            })
        }
    })
    return EstadosRegioes.estado.length >  0 ? EstadosRegioes : false;

}
//console.log(getEstadosRegiao('sdasd'))




const getCapitalPais=function(){
    let listaDasCapitais=[]
    

    estadoCidade.listaDeEstados.estados.forEach(function(lista){
        if(lista.capital_pais){
            listaDasCapitais.push({
                capital_atual: lista.capital_pais.capital,
                uf: lista.sigla,
                descricao: lista.nome,
                capital: lista.capital,
                regiao: lista.regiao,
                capital_pais_ano_inicio: lista.capital_pais.ano_inicio,
                capital_pais_ano_termino: lista.capital_pais.ano_fim

            })
        }
    })
    return listaDasCapitais
}
//console.log(getCapitalPais(''))




const getCidades = function(uf){
    let sigla = String(uf).toUpperCase()
    let cidadesEstado = []
    let cidadesEstados = null

    estadoCidade.listaDeEstados.estados.forEach(function(dadosDeEts){
        if (String(dadosDeEts.sigla).toUpperCase() === sigla){
            dadosDeEts.cidades.forEach(function(informacao){
                cidadesEstado.push(informacao.nome)
            })
            cidadesEstados = {
                uf: dadosDeEts.sigla,
                descricao: dadosDeEts.nome,
                quantidade_cidades: cidadesEstado.length,
                cidades: cidadesEstado
            }
        }
    })

    return cidadesEstados || false
}

//console.log(getCidades('asfas'))




module.exports = {
    getCapitalPais,
    getCidades,
    getCapitalEstado,
    getEstadosRegiao,
    getDadosDeEstado,
    getListaDeEstados
    
}
