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
            return $resource(baseURL + 'feedback/', null, {'update':{method:'PUT'}});
        };


        return feedFactCont;
    }])

    .animation('.test-js-animation', [function() {
        return {
            // make note that other events (like addClass/removeClass)
            // have different function input parameters
            enter: function(element, doneFn) {
                jQuery(element).fadeIn(300, doneFn);

                // remember to call doneFn so that angular
                // knows that the animation has concluded
            },

            move: function(element, doneFn) {
                jQuery(element).fadeIn(300, doneFn);
            },

            leave: function(element, doneFn) {
                jQuery(element).fadeOut(300, doneFn);
            }
        }
    }]);
;