'use strict';

angular.module('confusionApp',['ui.router', 'ngResource', 'ngAnimate'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }
            })

            // route for the aboutus page
            .state('app.aboutus', {
                url: 'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'
                    }
                }
            })

            // route for the contactus page
            .state('app.contactus', {
                url: 'contactus',
                views: {
                    'content@': {
                        templateUrl: 'views/contactus.html',
                        controller: 'ContactController'
                    }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl: 'views/menu.html',
                        controller: 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetail', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/dishdetail.html',
                        controller: 'dishDetailController'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/');
    })
    // .animation('.comment', [function () {
    //     return {
    //         // make note that other events (like addClass/removeClass)
    //         // have different function input parameters
    //         enter: function(element, doneFn) {
    //             jQuery(element).fadeIn(3000, doneFn);
    //
    //             // remember to call doneFn so that AngularJS
    //             // knows that the animation has concluded
    //         },
    //
    //         move: function(element, doneFn) {
    //             jQuery(element).fadeIn(3000, doneFn);
    //         },
    //
    //         leave: function(element, doneFn) {
    //             jQuery(element).fadeOut(3000, doneFn);
    //         }
    //     }
    // }])
;