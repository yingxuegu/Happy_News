'use strict';

// Declare app level module which depends on views, and components
var nw = angular.module('newsWebsite', ['ui.bootstrap', "weatherModule", "ngSanitize", "ngAnimate", "ngRoute"]);


nw.config(['$routeProvider', '$locationProvider',
  function($routeProvider) {
    $routeProvider
      .when('/content', {
        templateUrl: 'partials/newsContent.html',
        controller: 'wholeInformationCtrl',
        controllerAs: 'whole'
      })
      .when('/', {
        templateUrl: 'partials/newsList.html',
        controller: 'wholeInformationCtrl',
        controllerAs: 'whole'
      });
}]);

nw.controller('wholeInformationCtrl', ['$scope',function($scope) {
	$scope.goal = "I will do the best news website";
	$scope.news = [
		{"title": "Putin’s Surprise Syria Move Keeps Everyone Guessing", 
		"author": "NEIL MacFARQUHAR",
		"abstract": "President Vladimir V. Putin’s typically theatrical order to withdraw the bulk of Russian forces from Syria seemingly caught Washington, Damascus and everybody in between off guard.",
		"like": 10,
		"dislike": 0,
		"time": "12:56 PM ET"
		},

		{"title": "Allies Say Obama’s Court Pick Will Be Hard to Ignore", 
		"author": " JULIE HIRSCHFELD DAVIS",
		"abstract": "President Obama’s decision is based purely on qualifications, White House officials insisted, though other allies cited political considerations.",
		"like": 1,
		"dislike": 0,
		"time": "12:56 PM ET"
		},
	];
	$scope.addLike = function(news) {
		news.like++;
	};

}]);


nw.controller('TabsCtrl', function ($scope, $window) {
  
});



nw.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.openLogin = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/loginPage.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openSignUp = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/signUp.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});


nw.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'items', 'mySharedService', function ($scope, $uibModalInstance, items, sharedService) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
    sharedService.prepForBroadcast("success");
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);


//Modal part
nw.controller('AlertDemoCtrl',['$scope', 'mySharedService', function ($scope, sharedService) {
  $scope.alerts = [];
  $scope.addAlert = function() {
    $scope.alerts.push({type: 'success', msg: 'Login Successfully'});
  };
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.login = true;
  $scope.$on('success', function() {
        $scope.login = true;
        $scope.addAlert();
    });  
}]);
//share service between controllers
nw.factory('mySharedService', function($rootScope) {
    var sharedService = {};
    sharedService.message = '';
    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('success');
    };

    return sharedService;
});


nw.directive('news', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/news.html'
	};
});

nw.directive('hotNews', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/hotNews.html'
  };
});











