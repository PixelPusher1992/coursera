'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        /* Selecting active tab and filtering*/
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.dishes = menuFactory.getDishes();

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

    .controller('dishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {
        $scope.sortValue = '';

        $scope.dish = menuFactory.getDish(parseInt($routeParams.id,10));
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

            // Step 3: Push your comment into the dish's comment array
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

;