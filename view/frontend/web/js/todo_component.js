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
            template: 'Webjump_Todo/todo_template',
            todoList: ko.observableArray([]),
            todoPagination: ko.observableArray([]),
            newTodoText: ko.observable(''),
            totalTodoShow: ko.observable(10),
            currentPages: ko.observable(0)


        },

        initialize: function () {
            this._super()

            self = this

            self.handleTodoListUpdate()

            this.todoListResultPagination = ko.computed(function () {
                let totalTodos = self.currentPages()*self.totalTodoShow()
                return self.todoList().slice(totalTodos, totalTodos + self.totalTodoShow())
            }, this)
        },

        handleTodoListUpdate: function (){
            $('.todo_component').trigger('processStart')
            storage.get('rest/V1/todos').done(response => {
                self.todoList.removeAll()
                let todoArray = []
                response.map(todo => {
                    todoArray.push({...todo, isEdit: ko.observable(false)})
                })
                self.todoList(todoArray)
                self.todoPagination.removeAll()
                for (let i = 0; i < response.length/self.totalTodoShow(); i++) {
                    self.todoPagination.push(i+1)
                }

            }).always(() => {
                $('.todo_component').trigger('processStop')
            })
        },


        addTodo: function (){
            if( self.newTodoText().replaceAll(' ', '') != "")
            {
                storage.post('rest/V1/todo',
                    JSON.stringify({
                        "todo": {
                            "title": self.newTodoText(),
                            "is_done": false
                        }
                    })
                ).done(() => {
                    self.handleTodoListUpdate()
                    self.newTodoText('')
                }).fail(err => {
                    console.log(err)
                })
            }

        },

        deleteTodo: function (item){
            storage.delete(`rest/V1/todo/${item.id}`)
            .done(() => {
                self.handleTodoListUpdate()
            }).fail(err => {
                console.log(err)
            })


        },

        handleTodoIsCheckUpdate: function (todo, event, noCheck= false){
                storage.put(`rest/V1/todo/${todo.id}`,
                    JSON.stringify({
                        "todo": {
                            "title": todo.title,
                            "is_done": event.target.className === 'todo_is_done' ? todo.is_done : noCheck ? todo.is_done : !todo.is_done
                        }
                    })
                ).done(() => {
                    self.handleTodoListUpdate()
                }).fail(err => {
                    console.log(err)
                })
        },

        handleTodoEdit: function (index,todo, event){
            if(todo.isEdit()){
                self.handleTodoIsCheckUpdate(todo, event, true)
            }

            self.todoList()[index].isEdit(!self.todoList()[index].isEdit())
        },

        handlePagination: function (index){
            self.handleTodoListUpdate()
            self.currentPages(index-1)
        },

        disablePagination: function (index) {
            return index !== self.currentPages()
        },

        nextPage: function () {
            if(self.currentPages() !== 0) {
                self.handleTodoListUpdate()
                self.currentPages(self.currentPages() -1)
            }
        },

        previousPage: function () {
            if(self.todoPagination().length !== self.currentPages()+1) {
                self.handleTodoListUpdate()
                self.currentPages(self.currentPages() +1)
            }
        }


    });
});
