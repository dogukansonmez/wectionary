define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('text!tpl/NewItem.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();

        },

        render: function () {
            this.$el.html(template());
            return this;
        },

        events: {
            "click .topcoat-button--cta": "saveItem"
        },

        saveItem: function () {
            var category = this.options.category;
            var source = $('.three-quarters')[0].value;
            var target = $('.three-quarters')[1].value;
            if(category && source && target){
                var topicId = this.options.topicId;
                var itemToSave = this.options.itemToSave;
                itemToSave.toJSON();
                itemToSave.save({category: category, source: source, target: target, topic: topicId}, {
                    wait: true,
                    success: function (model, response) {
                        window.history.back();
                    },
                    error: function (model, error) {
                        window.history.back();
                    }
                });
            }
        }

    });

});