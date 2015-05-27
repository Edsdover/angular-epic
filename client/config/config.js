'use strict';

angular.module('f1-index')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  // .state('faq', {url: '/faq', templateUrl: '/views/general/faq.html'})
  // .state('contact', {url: '/contact', templateUrl: '/views/general/contact.html'})
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('predictions', {url: '/predictions', templateUrl: '/views/predictions/predictions.html', abstract: true})
  .state('predictions.new', {url: '/new', templateUrl: '/views/predictions/predictions-new.html', controller: 'PredictionsCtrl'})
  .state('dashboards', {url: '/dashboards', templateUrl: '/views/general/dashboards.html', controller: 'DashboardsCtrl'})
  .state('profile', {url: '/profile', templateUrl: '/views/users/profile.html', controller: 'ProfileCtrl'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'});
});
