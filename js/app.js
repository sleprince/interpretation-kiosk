'use strict';
/* app */
var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

var animateApp = angular.module('animateApp', [
		'ngRoute',
		
		'museum_objectcatAnimations',
		'museum_objectcatControllers',
		'museum_objectcatFilters',
		'museum_objectcatServices',
		'angularUtils.directives.dirPagination',
		
		'underscore',
		'ngScrollbar',
		'ngMaterial',
		'ngTimeline',
		'angularGrid',
		'formly', 'formlyBootstrap'
		]).config(function config(formlyConfigProvider) {


  formlyConfigProvider.setType([
  {
    name: 'radio',
    templateUrl: 'html/formly-radio.html'
  },
  {
    name: 'button',
    templateUrl: '<button ng-click="options.templateOptions">{{options.label}}</button>'
  }
]);

  formlyConfigProvider.setType({
    name: 'input',
    template: '<input class="form-control_CHEESE" ng-model="model[options.key]">',
    wrapper: ['helper', 'bootstrapLabel', 'bootstrapHasError']
  });

});


animateApp.config(['$routeProvider',
  function($routeProvider) {
	
    $routeProvider.
      when('/screen_saver_images', {
        templateUrl: 'html/screensaver.html',
        controller: 'screen_saver_images'
      }).
	   when('/list/:kiosk', {
            templateUrl: 'html/museum_object-list.html',
        controller: 'museum_objectListCtrl'
      }).
	  when('/slideshow/index/:index', {
        templateUrl: 'html/slideshow.html',
        controller: 'slideshowCtrl'
      }).
	  when('/slideshow/:filter', {
        templateUrl: 'html/slideshow.html',
        controller: 'slideshowCtrl'
      }).
	  when('/slideshow/ids/:ids/:kiosk', {
        templateUrl: 'html/slideshow.html',
        controller: 'slideshowCtrl'
      }).
	  when('/slideshow', {
        templateUrl: 'html/slideshow.html/:kiosk',
        controller: 'slideshowCtrl'
      }).
      
	  when('/id/:museum_objectId/:kiosk', {
        templateUrl: 'html/museum_object-detail.html',
        controller: 'museum_objectDetailCtrl'
      })
	  .when('/timeline/:kiosk', {
        templateUrl: 'html/timeline.html',
        controller: 'timelineCtrl'
      }).
	    when('/timeline/id/:museum_objectId', {
         templateUrl: 'html/timeline.html',
        controller: 'timelineCtrl'
      }).
	    when('/grid/:type/:kiosk', {
         templateUrl: 'html/grid.html',
        controller: 'gridCtrl as vm'
      }).	  
	    when('/:kiosk', {
         templateUrl: 'html/screensaver.html',
        controller: 'screen_saver'
      }).
	  when('/feedback/:kiosk', {
         templateUrl: 'html/page-feedback.html',
         //templateUrl: 'html/asteroids/asteroids.html',
        controller: 'feedbackCtrl'
      }).
	   when('/:kiosk', {
         templateUrl: 'html/screensaver.html',
        controller: 'screen_saver'
      }).
	   when('/1/:kiosk', {
         templateUrl: 'html/screensaver.html',
        controller: 'screen_saver'
      }).
	   
      otherwise({
        redirectTo: '/:kiosk'
      });
	  
	 
  }]);
  
  

animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

animateApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';
});

animateApp.controller('contactController', function($scope,$location) {
    $scope.pageClass = 'page-contact';
	$scope.currentPath = $location.path();
	
});

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

