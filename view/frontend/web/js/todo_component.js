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
            todoList: ko.observableArray([])

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
                    self.todoList.push(todo)
                })
            })
        },


        addTodo: function (){
            storage.post('rest/V1/todo',
                JSON.stringify({
                    "todo": {
                        "title": "teste teste",
                        "is_done": false
                    }
                })
            ).done(() => {
                self.handleTodoListUpdate()
            }).fail(err => {
                console.log(err)
            })

        },

        deleteTodo: function (item){
            storage.delete(`rest/V1/todo/${item.id}`)
            .done(() => {
                self.handleTodoListUpdate()
            }).fail(err => {
                console.log(err)
            })


        }
    });
});
