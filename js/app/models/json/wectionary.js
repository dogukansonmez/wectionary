define(function (require) {

    "use strict";

    var rootUrl = "http://language-service.herokuapp.com/api/v1";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Item = Backbone.Model.extend(),

        ItemCollection =  Backbone.Collection.extend({

            model: Item,

            url: "cdvfile://localhost/persistent/items.json"
                //rootUrl + "/items/?format=json"

        }),

        ItemToSave =  Backbone.Model.extend({

            model: Item,

            url: rootUrl + "/items/",

            validate: function(attrs) {

                console.log("valid")
            }

        }),

        Topic = Backbone.Model.extend(),

        CategoryToSave =  Backbone.Model.extend({

            model: Topic,

            url: rootUrl + "/topics/",

            validate: function(attrs) {

                console.log("valid")
            }

        }),

        TopicCollection = Backbone.Collection.extend({

            model: Topic,

            url: "cdvfile://localhost/persistent/topics.json"
                //rootUrl + "/topics/?format=json"
        });

    return {
        Topic:Topic,
        Item:Item,
        Items:ItemCollection,
        Topics:TopicCollection,
        ItemToSave:ItemToSave,
        CategoryToSave:CategoryToSave
    };

});