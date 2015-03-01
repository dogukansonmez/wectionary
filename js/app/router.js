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
            window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, errorHandler);
        }

    });

    function onInitFs(fs) {


        var fileURL = "cdvfile://localhost/persistent/topics.json";

        var fileTransfer = new FileTransfer();
        var uri = encodeURI("https://language-service.herokuapp.com/api/v1/topics/?format=json");

        fileTransfer.download(
            uri,
            fileURL,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            }
        );
        uri = encodeURI("https://language-service.herokuapp.com/api/v1/items/?format=json");
        fileURL = "cdvfile://localhost/persistent/items.json";
        fileTransfer.download(
            uri,
            fileURL,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            }
        );
    }


    function errorHandler(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        }

        alert('Error: ' + msg);
    }


});