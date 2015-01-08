define(function (require) {

    "use strict";

    var $           = require('jquery'),
        _           = require('underscore'),
        Backbone    = require('backbone'),
        tpl         = require('text!tpl/NewCategory.html'),
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
            "click .topcoat-button--cta": "saveCategory"
        },

        saveCategory: function () {
            var category = $('.three-quarters')[0].value;
            var source = $('.three-quarters')[1].value;
            var target = $('.three-quarters')[2].value;
            if(category && source && target){
                var categoryToSave = this.options.categoryToSave;
                categoryToSave.toJSON();
                categoryToSave.save({category: category, source: source, target: target}, {
                    wait: true,
                    success: function (model, response) {
                        //do nothing
                    },
                    error: function (model, error) {
                    }
                });
            }else{
                $('.three-quarters')[0].seta
            }

        }

    });

});