define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        TopicListView       = require('app/views/TopicList'),
        models              = require('app/models/wectionary'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {
            this.topicList = new models.Topics();
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new TopicListView({collection: this.topicList, el: $(".scroller", this.el)});
            return this.topicList.fetch({reset: true});
        },

        events: {
            "click .topcoat-icon-button--quiet": "showMessage"
        },

        showMessage: function () {
            alert("Love learning new languages");
        }



       /* events: {
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress"
        },


        search: function (event) {
            var key = $('.search-key').val();
            this.employeeList.fetch({reset: true, data: {name: key}});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        }*/


    });

});