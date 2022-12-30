define([
    'uiComponent',
    'jquery',
    'ko',
    'mage/storage'

], function (
    Component,
    $,
    ko,
    storage
)   {
    "use strict";

    return Component.extend({

        defaults: {
            template: 'Webjump_Todo/todo_template', //Define o template html do uiComponent
            todoList: ko.observableArray([]), //Lista que contem todos as todos
            todoListLike: ko.observableArray([]), //Lista de backup da todoList para comparar alterações de textos a ser salvo
            todoPagination: ko.observableArray([]), //Lista que contem todas as paginações que seram exibidas
            newTodoText: ko.observable(''), //Estado que contem o tetxto da nova todo a ser criada
            totalOptionsTodos: ko.observableArray(), //Lista de todas opções de quantidades de todos listadas por página
            totalTodoShow: ko.observable(), //Estado que armazena inicialmente a quantidade de todos listados na pagina
            currentPages: ko.observable(0) //Estado que armazena a paginação atual


        },

        initialize: function () {
            this._super() //Herda tudo do componente extendido

            self = this //Cria outro contexto para se trabalhar, não correndo o risco de alterar o principal this

            self.handleTodoListUpdate() // Inicia carreagando todos os todos com uma requisição

            self.totalTodoShow(self.totalDefaultTodo)

            self.totalOptionsTodos(self.optionsPagination)

            // Corta o array de todoList para listar apenas os todos relacionados a paginação atual
            this.todoListResultPagination = ko.computed(function () {
                let totalTodos = self.currentPages()*self.totalTodoShow()
                return self.todoList().slice(totalTodos, totalTodos + self.totalTodoShow())
            }, this)


            // Renderiza o pagination renderiza apenas as paginações -1 da atual e +1 exemplo < 2, 3(atual), 4 >
            this.paginatitonRender = ko.computed(function () {
                if(self.currentPages() === 0){
                    return self.todoPagination.slice(0, 3) //Se estiver na primeira página exibe 2 paginações a direita
                }
                if(self.currentPages() + 1 === self.todoPagination().length && self.todoPagination().length > 0) { // Valida e esta é a ultima paginação
                    if(self.todoPagination().length === 2) { // Valida se so existe 2 paginações
                        return self.todoPagination.slice(self.todoPagination().length - 2, self.todoPagination().length) // renderiza uma paginação a esquerda
                    }
                    return self.todoPagination.slice(self.todoPagination().length - 3, self.todoPagination().length) // Renderiza 2 paginações a esquenda
                }
                return self.todoPagination.slice(self.currentPages() - 1, self.currentPages() + 2) // Renderiza 1 paginação a esquerda e 1 a direita
            }, this)

            // Observa alterações na totalTodoShow(numero de todos por pagina) e atualiza a lista de todos e volta para primeira paginação
            self.totalTodoShow.subscribe(() => {
                self.handleTodoListUpdate()
                self.currentPages(0)
            })
        },

        // Faz a requisição do banco e seta todos os estados do componente
        handleTodoListUpdate: function (){
            $('.todo_component').trigger('processStart') // Adiciona um spiner de loading na pagina
            storage.get('rest/V1/todos').done(response => {
                self.todoList.removeAll()
                let todoArray = []
                let todoArrayLike = []
                let paginationArray = []
                response.map(todo => {
                    todoArray.push({...todo, isEdit: ko.observable(false)}) //adiciona 2 variaveis que não existem no banco e salva o todo no array
                    todoArrayLike.push({...todo, isEdit: ko.observable(false)}) //adiciona 2 variaveis que não existem no banco e salva o todo no array
                })
                self.todoList(todoArray)
                self.todoListLike(todoArrayLike)
                self.todoPagination.removeAll()

                // Popula a paginação basiado no numero de todos por pagina dividio pelo total de todos
                for (let i = 0; i < response.length/self.totalTodoShow(); i++) {
                    paginationArray.push(i+1)
                }
                self.todoPagination(paginationArray)

            }).always(() => {
                $('.todo_component').trigger('processStop') // Remove 0 spiner de loading na pagina
            })
        },

        // Adiciona um todo no banco com um request post
        addTodo: function (){
            if( self.newTodoText().replaceAll(' ', '') !== "")
            {
                storage.post('rest/V1/todo',
                    JSON.stringify({
                        "todo": {
                            "title": self.newTodoText(),
                            "is_done": false
                        }
                    })
                ).done(() => {
                    self.handleTodoListUpdate() // Atualiza a lista de todos
                    self.newTodoText('')
                }).fail(err => {
                    console.log(err)
                })
            }

        },

        // Deleta um todo no banco com uma request delete
        deleteTodo: function (item){
            storage.delete(`rest/V1/todo/${item.id}`)
            .done(() => {
                self.handleTodoListUpdate()
            }).fail(err => {
                console.log(err)
            })


        },


        // Altera o estado de checked do todo no banco com uma request post
        handleTodoIsCheckUpdate: function (todo, event, noCheck= false){
                storage.put(`rest/V1/todo/${todo.id}`,
                    JSON.stringify({
                        "todo": {
                            "title": todo.title,
                            // Valida se esta sendo clicado no ckeckbox ou no title do todo e se o todo deve ser alterado o estado de checked ou não
                            "is_done": event.target.className === 'todo_is_done' ? todo.is_done : noCheck ? todo.is_done : !todo.is_done
                        }
                    })
                ).done(() => {
                    self.handleTodoListUpdate() // Atualiza a lista de todos
                }).fail(err => {
                    console.log(err)
                })
        },

        // Valida se ouve ou não uma alteração no titulo do todo e faz a requisição de request aproveitando a resquest do handleTodoIsCheckUpdate, caso haja alteração
        handleTodoEdit: function (index,todo, event){

            // Filtra todos os todos que tiveram alteração de titulo e que estão em modo de edição
            let todosEdits = self.todoList.filter((item, index) => item.isEdit() && self.todoListLike()[index].title !== item.title)

            // Caso esteja em modo edição, aqui siguinifica que foi clicado no disket para salvar, se sim intera todas alterações e salva cada uma delas no banco
            if(todo.isEdit()){
                todosEdits.map((item, index) => {
                    self.handleTodoIsCheckUpdate(item, event, true)
                })
            }

            // Altera o texto de titulo no arrau todoList
            self.todoList()[index].isEdit(!self.todoList()[index].isEdit())
        },

        // Altera a currentPage para a paginação clicada baseado no index atual da mesma
        handlePagination: function (index){
            self.handleTodoListUpdate()
            self.currentPages(index-1)
        },


        // Valida se a paginação passada é a selecionado ou não
        disablePagination: function (index) {
            return index !== self.currentPages()
        },


        // Passa para proxima paginação
        nextPage: function () {
            if(self.currentPages() !== 0) {
                self.handleTodoListUpdate()
                self.currentPages(self.currentPages() -1)
            }
        },


        // Passa para paginação anterior
        previousPage: function () {
            if(self.todoPagination().length !== self.currentPages()+1) {
                self.handleTodoListUpdate()
                self.currentPages(self.currentPages() +1)
            }
        },
    });
});
