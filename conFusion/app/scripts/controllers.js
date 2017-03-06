'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        /* getting data */
        menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );


        /* for loading data and data errors */
        $scope.showMenu = false;
        $scope.message = 'Loading ...';


        /* for detail item text */
        $scope.showDetails = false;
        $scope.toggleDetails = function () {
            return $scope.showDetails = !$scope.showDetails;
        };


        /* for active tab and filtering*/
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

    }])

    .controller('dishDetailController', ['$scope', '$stateParams', 'menuFactory',
                                                function($scope, $stateParams, menuFactory) {
        $scope.sortValue = '';

        $scope.showDish = false;
        $scope.message = 'Loading ...';

        $scope.dish =
            menuFactory
                .getDishes()
                .get({id:parseInt($stateParams.id,10)})
                .$promise
                .then(
                    function (response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function (response) {
                        $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );

    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.commentedForm = {
            author: "",
            rating: 5,
            comment: "",
            date: ""
        };

        $scope.submitComment = function () {

            $scope.commentedForm.date = new Date().toISOString();

            $scope.dish.comments.push($scope.commentedForm);

            menuFactory
                .getDishes()
                .update(
                    {id:$scope.dish.id},$scope.dish
                );

            $scope.commentForm.$setPristine();
            $scope.commentedForm = {
                author: "",
                rating: 5,
                comment: "",
                date: ""
            };

        };

        $scope.deleteComments = function () {
            $scope.dish.comments.splice(5, $scope.dish.comments.length - 5);
            menuFactory
                .getDishes()
                .update(
                    {id:$scope.dish.id},$scope.dish
                );
        };

        $scope.addComment = function () {
            $scope.commentedForm = {
                author: "Viktor",
                rating: 5,
                comment: "Test Comment",
                date: ""
            };
            $scope.submitComment();
        }
    }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {mychannel: "", firstName:"",
            lastName:"", agree:false, email:"" };

        var channels = [{value:"tel", label:"Tel."},
            {value:"Email", label:"Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

        feedbackFactory.getFeedback().query(
            function (data) {
                $scope.feedbacks = data;
            },
            function (data) {
                console.error('Error: ' + data.status + ' ' + data.statusText)
            }
        );

        $scope.sendFeedback = function () {
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
            } else {
                $scope.feedbacks.push($scope.feedback);
                feedbackFactory
                    .getFeedback()
                    .save(
                        {id:$scope.feedbacks.length},$scope.feedback
                    );

                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "",
                    lastName: "", agree: false, email: ""
                };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
            }
        };

        $scope.addFeedback = function () {
            $scope.feedback = {
                mychannel: "tel",
                firstName:"Viktor",
                lastName:"Yuriev",
                agree:true,
                email:"life.is.life1992@gmail.com",
                comments: "Test Comment"
            };
            $scope.sendFeedback();
        };
    }])

    .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function ($scope, corporateFactory, menuFactory) {

        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showLeader = false;
        $scope.message = 'Loading ...';

        $scope.dish =
            menuFactory
                .getDishes()
                .get({id:0})
                .$promise
                .then(
                    function (response) {
                        $scope.showDish = true;
                        $scope.dish = response;
                    },
                    function (response) {
                        $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );

        $scope.promotion =
            menuFactory
                .getPromotions()
                .get({id:0})
                .$promise
                .then(
                    function (response) {
                        $scope.showPromotion = true;
                        $scope.promotion = response;
                    },
                    function (response) {
                        $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );

        $scope.leader =
            corporateFactory
                .getLeaders()
                .get({id:0})
                .$promise
                .then(
                    function (data) {
                        $scope.showLeader = true;
                        $scope.leader = data;
                    },
                    function (data) {
                        $scope.message = 'Error: ' + data.status + ' ' + data.statusText;
                    }
                );

    }])


    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.showLeaders = false;
        $scope.message = 'Loading...';

        corporateFactory.getLeaders().query(
            function (response) {
                $scope.showLeaders = true;
                $scope.leaders = response;
            },
            function (response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
            }
        )

    }])
;