define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        NewItem            = require('app/views/NewItem'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Items.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            var category = this.options.category;
            var topicId = this.options.topicId;
            this.$el.html(template({items: this.model.toJSON()[0],topicId:topicId,category:category}));
            return this;
        }

    });

});