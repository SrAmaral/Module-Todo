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
            message: ko.observable('ola por defaults'),
            todoList: ko.observableArray([]),
            newTodoText: ko.observable(''),


        },

        initialize: function () {
            this._super()

            self = this

            self.handleTodoListUpdate()
        },

        handleTodoListUpdate: function (){
            this.todoList.removeAll()
            storage.get('rest/V1/todos').done(response => {
                self.todoList.removeAll()
                response.map(todo => {
                    self.todoList.push({...todo, isEdit: ko.observable(false)})
                })
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

        handleTodoIsCheckUpdate: function (todo){
            console
            storage.put(`rest/V1/todo/${todo.id}`,
                JSON.stringify({
                    "todo": {
                        "title": todo.title,
                        "is_done": todo.is_done
                    }
                })
            ).done(() => {
                self.handleTodoListUpdate()
            }).fail(err => {
                console.log(err)
            })
        },


        handleTodoEdit: function (index){
           self.todoList()[index].isEdit(!self.todoList()[index].isEdit())
        }
    });
});
