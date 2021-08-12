import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {

    //no typescript o "#" indica que o modificador de acesso é private
    #conversor = {
        //para escrever no firestore a classe deve ser preparada, pois senao nao funciona
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            }

        },
        //para poder importar os dados do firestore o objeto precisa ser preparado cfe os atributos da classe
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)//id vai ser criado pelo firestore
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        //no salvar tem dois cenarios, o primeiro é update e o segundo é o salvar novo cliente
        //fazer o update
        if (cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente)
            return cliente
        } else {
            const docRef = await this.colecao().add(cliente)
            const doc = await docRef.get()
            return doc.data()
        }

    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.id).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get()
        //retorna na query um array de docs, onde no Array.map() pega cada cliente ou se nao achar nada volta um array vazio
        return query.docs.map(doc => doc.data()) ?? []
        
    }

    private colecao() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor)
    }

}