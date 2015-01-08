define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        topics = [
            {"id": 1, "category": "Greetings","source":"Selamlasma","target":"Saluti","pic": "greetings.jpg"},
            {"id": 2, "category": "Numbers","source":"Sayilar","target":"Numeri","pic": "greetings.jpg"},
            {"id": 3, "category": "Family","source":"Aile","target":"Famiglia","pic": "greetings.jpg"},
            {"id": 4, "category": "Sports","source":"Sports","target":"Sports","pic": "greetings.jpg"},
            {"id": 5, "category": "Questions","source":"Sorular","target":"Domande","pic": "greetings.jpg"}
        ],

        items = [
            {"id": 1, "topicId": 1,"source":"Merhaba","target":"ciao","category":"Greetings"},
            {"id": 2, "topicId": 1,"source":"Gule Gule","target":"ciao","category":"Greetings"},
            {"id": 3, "topicId": 1,"source":"Tanistigima Cok Sevindim","target":"ciao","category":"Greetings"},
            {"id": 4, "topicId": 1,"source":"hey","target":"ciao","category":"Greetings"},
            {"id": 5, "topicId": 1,"source":"Merhaba","target":"ciao","category":"Greetings"},
            {"id": 6, "topicId": 2,"source":"Bir","target":"uno","category":"Numbers"},
            {"id": 7, "topicId": 3,"category":"Family"},
            {"id": 8, "topicId": 4,"category":"Sports"},
            {"id": 9, "topicId": 5,"category":"Questions"}
        ],



        employees = [
            {"id": 1, "firstName": "James", "lastName": "King", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "james_king.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
            {"id": 2, "firstName": "Julie", "lastName": "Taylor", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "julie_taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
            {"id": 3, "firstName": "Eugene", "lastName": "Lee", "managerId": 1, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "eugene_lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
            {"id": 4, "firstName": "John", "lastName": "Williams", "managerId": 1, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "john_williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
            {"id": 5, "firstName": "Ray", "lastName": "Moore", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "ray_moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
            {"id": 6, "firstName": "Paul", "lastName": "Jones", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "paul_jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
            {"id": 7, "firstName": "Paula", "lastName": "Gates", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "paula_gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
            {"id": 8, "firstName": "Lisa", "lastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "lisa_wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
            {"id": 9, "firstName": "Gary", "lastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
            {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
            {"id": 11, "firstName": "Amy", "lastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
            {"id": 12, "firstName": "Steven", "lastName": "Wells", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
        ],

        findItemById = function (id) {
            var deferred = $.Deferred(),
                item = null,
                l = items.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (items[i].id === id) {
                    item = items[i];
                    break;
                }
            }
            deferred.resolve(item);
            return deferred.promise();
        },

        findTopicById = function (id) {
            var deferred = $.Deferred(),
                topic = null,
                l = topics.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (topics[i].id === id) {
                    topic = topics[i];
                    break;
                }
            }
            deferred.resolve(topic);
            return deferred.promise();
        },

        findItemByTopicId = function (topicId) {
            var deferred = $.Deferred(),
                results = items.filter(function (element) {
                    return topicId == element.topicId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        getAllTopics = function () {
            var deferred = $.Deferred(),
                results = topics.filter(function () {
                    return true;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findById = function (id) {
            var deferred = $.Deferred(),
                employee = null,
                l = employees.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (employees[i].id === id) {
                    employee = employees[i];
                    break;
                }
            }
            deferred.resolve(employee);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred(),
                results = employees.filter(function (element) {
                    var fullName = element.firstName + " " + element.lastName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },
        findAll = function () {
            var deferred = $.Deferred(),
                results = employees.filter(function () {
                    return true;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByManager = function (managerId) {
            var deferred = $.Deferred(),
                results = employees.filter(function (element) {
                    return managerId === element.managerId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },


       Item = Backbone.Model.extend({
            initialize: function () {
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findItemById(options.data.id).done(function (data) {
                        options.success(data);
                    });
                }
            }
        }),

        ItemCollection =  Backbone.Collection.extend({

            model: Item,

            sync: function (method, model, options) {
                if (method === "read") {
                    findItemByTopicId(options.data.topicId).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        Topic = Backbone.Model.extend({
            initialize: function () {
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findTopicById(options.data.id).done(function (data) {
                        options.success(data);
                    });
                }
            }
        }),

        TopicCollection = Backbone.Collection.extend({

            model: Topic,

            sync: function (method, model, options) {
                if (method === "read") {
                    getAllTopics().done(function (data) {
                        options.success(data);
                    });
                }
            }
        }),

        Employee = Backbone.Model.extend({

            initialize: function () {
                this.reports = new ReportsCollection();
                this.reports.parent = this;
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        AllEmployees = Backbone.Collection.extend({

            model: Employee,

            sync: function (method, model, options) {
                if (method === "read") {
                    findAll().done(function (data) {
                        options.success(data);
                    });
                }
            }
        }),

        EmployeeCollection = Backbone.Collection.extend({

            model: Employee,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByName(options.data.name).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),
        ReportsCollection = Backbone.Collection.extend({

            model: Employee,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByManager(this.parent.id).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Employee: Employee,
        Employees:AllEmployees,
        EmployeeCollection: EmployeeCollection,
        ReportsCollection: ReportsCollection,
        Topic:Topic,
        Item:Item,
        Items:ItemCollection,
        Topics:TopicCollection
    };

});