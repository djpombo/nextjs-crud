export default class Cliente{
    //# indica que o atributo é private a partir do ECMA2015
    #id: string
    #nome: string
    #idade: number

    constructor(nome: string, idade: number, id: string = null){
        this.#nome = nome
        this.#idade = idade
        this.#id = id


    }

    static vazio(){
        return new Cliente('', 0)
    }

    get id(){
        return this.#id
    }

    get nome(){
        return this.#nome
    }

    get idade(){
        return this.#idade
    }

    
}