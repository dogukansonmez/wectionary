define(function (require) {
    var app = {

        initialize: function () {
            this.bindEvents();
        },

        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function () {
            if (navigator.notification) { // Override default HTML alert with native dialog
                window.alert = function (message) {
                    navigator.notification.alert(
                        message,    // message
                        null,       // callback
                        "Wectionary", // title
                        'OK'        // buttonName
                    );
                };
            }
        }
    };

    return app;
});