define(function (require) {

    "use strict";

    var rootUrl = "http://127.0.0.1:8000/api/v1";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Item = Backbone.Model.extend(),

        ItemCollection =  Backbone.Collection.extend({

            model: Item,

            url: rootUrl + "/items/?format=jsonp"

        }),

        ItemToSave =  Backbone.Model.extend({

            model: Item,

            url: rootUrl + "/items/",

            validate: function(attrs) {

             console.log("valid")
            }

        }),

        Topic = Backbone.Model.extend(),

        TopicCollection = Backbone.Collection.extend({

            model: Topic,

            url: rootUrl + "/topics/?format=jsonp"
        }),

        originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        if (method === "read") {
            options.dataType = "jsonp";
            return originalSync.apply(Backbone, arguments);
        } else if(method === "create")
        {
            options.type = "POST";
            options.dataType = "jsonp";
            return originalSync.apply(Backbone, arguments);
        }
    };

    return {
        Topic:Topic,
        Item:Item,
        Items:ItemCollection,
        Topics:TopicCollection,
        ItemToSave:ItemToSave
    };

});