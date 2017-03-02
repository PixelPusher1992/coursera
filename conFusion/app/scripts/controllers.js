'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        /* Selecting active tab and filtering*/
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.dishes = {};
        menuFactory.getDishes()
            .then(
                function (response) {
                    $scope.dishes = response.data;
                }
            );

        $scope.toggleDetails = function () {
            return $scope.showDetails = !$scope.showDetails;
        };


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

        $scope.dish = {};
        menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function (response) {
                    $scope.dish = response.data;
                }
            );
    }])

    .controller('DishCommentController', ['$scope', function($scope) {

        $scope.commentedForm = {
            name: "",
            rating: 5,
            comment: "",
            date: ""
        };

        $scope.submitComment = function () {

            $scope.commentedForm.date = new Date().toISOString();

            $scope.dish.comments.push({
                rating: $scope.commentedForm.rating,
                comment: $scope.commentedForm.comment,
                author: $scope.commentedForm.name,
                date: $scope.commentedForm.date
            });

            $scope.commentForm.$setPristine();
            $scope.commentedForm = {
                name: "",
                rating: 5,
                comment: "",
                date: ""
            };

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

    .controller('FeedbackController', ['$scope', function ($scope) {

        $scope.sendFeedback = function () {
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.error('invalid');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "",
                    lastName: "", agree: false, email: ""
                };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.info($scope.feedback);
            }
        };

    }])

    .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory',
                                function ($scope, corporateFactory, menuFactory) {

        $scope.leader = corporateFactory.getLeader(3);
        $scope.promotion = menuFactory.getPromotion(0);

        $scope.dish = {};
        menuFactory.getDish(0)
            .then(
                function (response) {
                    $scope.dish = response.data;
                }
            );
    }])


    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.leaders = corporateFactory.getLeaders();

    }])

;