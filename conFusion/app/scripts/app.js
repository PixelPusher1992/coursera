'use strict';

angular.module('confusionApp',['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider

            //contact page
            .when('/contactus', {
                templateUrl: 'contactus.html',
                controller: 'ContactController'
            })

            //menu page
            .when('/menu', {
                templateUrl: 'menu.html',
                controller: 'MenuController'
            })

            //detail page
            .when('/menu/:id', {
                templateUrl: 'dishdetail.html',
                controller: 'dishDetailController'
            })
            .otherwise('/contactus');
    })
;