import * as uniqid from "uniqid";

// export interface Tarefa {
export class Tarefa {
    id: string;
    feita: boolean;
    descricao: string;
    prioridade: Prioridade;

    constructor(texto:string, prioridade: Prioridade) {
        this.id=uniqid();
        this.descricao = texto;
        this.prioridade = prioridade;
        this.feita=false;
    }

    toRow():HTMLTableRowElement {
        // criar o elemento que receberá a tarefa
        let tr:HTMLTableRowElement = document.createElement("tr");
        tr.setAttribute("id",this.id);
        tr.innerHTML = `<td><input type="checkbox"></td>
                        <td>${this.descricao}</td>
                        <td><i class="material-icons">delete</i></td>`;
        
        // *** SELECIONAR A TAREFA COM CHECKBOX
        // selecionar o checkbox
        let checkbox:HTMLInputElement = tr.querySelector("input");
        checkbox.addEventListener("click", (evento_check) => {
            // atributo feita recebe o estado do checkbox
            this.feita = checkbox.checked;
            //     // if ternário para alterar a className da linha
            //     // seletor CSS irá traçar a linha
            tr.className = this.feita ? "done" : "";
        });

        return(tr);
    }

    imprimir():void{
        console.log(`[${this.feita?"x":""}] ${this.descricao} [ ${this.prioridade}]`);
    }

}

export enum Prioridade {
    Baixa=1,
    Media=2,
    Alta=3
}