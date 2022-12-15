define([
    'uiComponent',
    'ko'
], function (
    Component,
    ko
)   {
    "use strict";

    return Component.extend({

        defaults: {
            message: ko.observable('ola por defaults'),
        },

        initialize: function () {
            this._super()

            console.log('ola');
        },
    });
});
