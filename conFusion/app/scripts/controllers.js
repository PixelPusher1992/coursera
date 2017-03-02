'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        /* getting data */
        $scope.dishes = menuFactory.getDishes().query();


        /* for loading data and data errors */
        $scope.showMenu = true;
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

        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});

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

    .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function ($scope, corporateFactory, menuFactory) {

        $scope.showDish = false;
        $scope.message = 'Loading ...';
        menuFactory.getDishes().query(
            function (response) {
                $scope.dish = response[0];
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = 'Error!!!!';
            }
        );


        $scope.leader = corporateFactory.getLeader(3);
        $scope.promotion = menuFactory.getPromotion(0);


    }])


    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.leaders = corporateFactory.getLeaders();

    }])

;