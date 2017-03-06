'use strict';

angular.module('confusionApp')
    .constant('baseURL', 'http://localhost:3000/')

    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function () {
            return $resource(baseURL + 'dishes/:id', null, {'update':{method:'PUT'}});
        };

        this.getPromotions = function () {
            return $resource(baseURL + 'promotions/:id', null, {'update':{method:'PUT'}});
        };

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        var corpFactCont = {};

        corpFactCont.getLeaders = function () {
            return $resource(baseURL + 'leadership/:id', null, {'update':{method:'PUT'}});
        };

        return corpFactCont;
    }])

    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        var feedFactCont = {};

        feedFactCont.getFeedback = function () {
            return $resource(baseURL + 'feedback/', null);
        };


        return feedFactCont;
    }])

;