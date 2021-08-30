import { Tarefa, Prioridade } from "./Tarefa";

export class ListaDeTarefas {

    tarefas:Tarefa[];
    input:HTMLInputElement;
    form:HTMLFormElement;
    tabela:HTMLTableElement;

    
    constructor(main:HTMLElement) {
        this.form = main.querySelector("form");
        this.tabela = main.querySelector("table");
        this.input = main.querySelector("form input");
        
        // Tentando carregar tarefas do localStorage
        let dados:string = window.localStorage.getItem("todolist");
        // console.log(dados);
        if(dados==null){
            // Cria a localStorage com um array de tarefas vazio
            window.localStorage.setItem("todolist","[]");
            this.tarefas = [];
        } else {

            // Carregar o array de tarefas com os dados do localStorage
            this.tarefas = JSON.parse(dados).map(
                tarefa => {
                    let novaTarefa = new Tarefa(tarefa.descricao,tarefa.prioridade);
                    novaTarefa.id=tarefa.id;
                    return(novaTarefa);
                }
            )
        }

        this.mostrarTarefas();

        // Quando o form for submetido, adicionar uma tarefa
        this.form.addEventListener("submit", (event)=> {
            event.preventDefault();
            this.adicionarTarefa();
        });

    }

    removerTarefa(tarefa:Tarefa){
        // remove tarefa do array de tarefas
        this.tarefas.splice(this.tarefas.indexOf(tarefa),1);
        // Salvar o array de tarefas no localStorage
        window.localStorage.setItem("todolist",JSON.stringify(this.tarefas));
        // remove tarefa da tabela de tarefas (DOM)
        document.getElementById(tarefa.id).remove();
        // console.log(tarefa.id);
        // console.log(tarefa);
    }
        
    adicionarTarefa(){
        // Verifica se o input está vazio
        if(this.input.value == "") return;
        // Criar a nova tarefa a partir do value do input
        let novaTarefa = new Tarefa(this.input.value,Prioridade.Baixa);
        // Adicionar a nova tarefa ao array de tarefas
        this.tarefas.push(novaTarefa);
        // Salvar o array de tarefas no localStorage
        window.localStorage.setItem("todolist",JSON.stringify(this.tarefas));
        // Verificar o conteúdo do array no console
        console.log(this.tarefas);
        // Criando a linha da tarefa
        let tr = novaTarefa.toRow();
        // Adicionar a tarefa ao DOM
        this.tabela.appendChild(tr);
        //Limpar o input após a inclusão da nova tarefa
        this.input.value="";

        // *** REMOVER TAREFA
        // Criar sensor para o evento clique do botão delete
        tr.querySelector("i").addEventListener("click",()=>{
            console.log(this.tarefas);
            // Chamada para remover a tarefa
            this.removerTarefa(novaTarefa);
        });
    }

    mostrarTarefas(){
        // Limpar a tabela no DOM
        this.tabela.innerHTML="";
        // Popular a tabela com o array atualizado
        this.tarefas.forEach( 
            // Percorrer os elementos do array de tarefas
            tarefa => {
                // Criar uma nova linha
                let tr:HTMLTableRowElement = tarefa.toRow()
                // Adicionar a nova linha na tabela
                this.tabela.appendChild(tr);
                // Configurar o sensor do botão delete
                tr.querySelector("i").addEventListener("click",()=>{
                    // Mostrar conteúdo atualizado do array
                    console.log(this.tarefas);
                    // Chamada para remover a tarefa
                    this.removerTarefa(tarefa);
                });
            }
        )
    }    
}