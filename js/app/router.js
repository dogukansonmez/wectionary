define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),
        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "topics/:id/:category": "itemList",
            "newItem/:topic/:category": "newItem",
            "newCategory": "newCategory",
            "goHome" : "goHome"
        },

        home: function () {
            slider.slidePage(homeView.$el);
        },

        goHome: function () {
            homeView.initialize();
            homeView.render();
            slider.slidePage(homeView.$el);
        },

        itemList: function (id,category) {
            require(["app/models/wectionary", "app/views/ItemList"], function (models, ItemList) {
                var items = new models.Items({id: id});
                items.fetch({
                    success: function (data) {
                        slider.slidePage(new ItemList({category:category,topicId:id,model: data}).$el);
                    },data: $.param({ topic:id})
                });
            });
        },

        newItem: function (topic,category) {
            var topicId = 'api/v1/topics/'+ topic + '/';
            require(["app/models/wectionary", "app/views/NewItem"], function (models, NewItem) {
                var itemToSave = new models.ItemToSave();
                slider.slidePage(new NewItem({topicId:topicId,category: category,itemToSave:itemToSave}).$el);
            });
        },

        newCategory: function () {
            require(["app/models/wectionary", "app/views/NewCategory"], function (models, NewCategory) {
                var categoryToSave = new models.CategoryToSave();
                slider.slidePage(new NewCategory({categoryToSave:categoryToSave}).$el);
            });
        }

    });

});