import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import { useState, useEffect } from "react"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes(){
    const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const {tabelaVisivel, formVisivel, exibirForm, exibirTabela} = useTabelaOuForm()

  
  useEffect(()=>{
    obterTodos()
  
  },[])

  function obterTodos(){
    repo.obterTodos()
    .then(clientes =>{
      setClientes(clientes)
      exibirTabela()
    })
  }
 

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente)
    exibirForm()
  }

  async function excluirCliente(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  function novoCliente(){
    setCliente(Cliente.vazio())
    exibirForm()
  }

  async function salvarCliente(cliente: Cliente){
    await repo.salvar(cliente).then(setCliente)
    obterTodos()
    
  }
  return {
      tabelaVisivel,
      formVisivel,
      exibirTabela,
      cliente,
      clientes,
      novoCliente,
      salvarCliente,
      excluirCliente,
      selecionarCliente,
      obterTodos,


  }
}