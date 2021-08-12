import { useState } from "react"
export default function useTabelaOuForm(){
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

    const exibirTabela = () => setVisivel('tabela')
    const exibirForm = () => setVisivel('form')

    return{
        formVisivel: visivel === "form",
        tabelaVisivel: visivel === "tabela",
        exibirTabela,
        exibirForm
    }
}