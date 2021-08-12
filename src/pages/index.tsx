import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import useClientes from "../Hooks/useClientes";


export default function Home() {


  const { 
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela,
    novoCliente,
    excluirCliente,
    selecionarCliente,
    salvarCliente
  } = useClientes()

 



  return (
    <div className={`
      flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600
      text-white

    `}>
      <Layout titulo="Cadastro Simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao className={`mb-4`} cor="green"
                onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            
            <Tabela clientes={clientes}
              clienteSelecionado={selecionarCliente}
              clienteExcluido={excluirCliente} />
            
          </>

        ) : (

          <Formulario cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={exibirTabela}
          />
        )}


      </Layout>
    </div>
  )
}
