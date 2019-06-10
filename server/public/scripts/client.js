var myApp = angular
  .module("myApp", [
    "ngRoute",
    "ngMaterial",
    "ngMessages",
    "xeditable",
    "ui.select"
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("blue-grey")
      .warnPalette("red")
      .accentPalette("blue")
      .backgroundPalette("grey");
  });

/// Routes ///
myApp.config([
  "$routeProvider",
  "$locationProvider",
  function($routeProvider, $locationProvider) {
    //console.log("myApp -- config");
    $routeProvider
      .when("/", {
        redirectTo: "home"
      })
      .when("/home", {
        templateUrl: "/views/templates/home.html",
        controller: "RetailController as vm"
      })
      .when("/sales", {
        templateUrl: "/views/templates/sales.html",
        controller: "RetailController as vm"
      })
      .otherwise({
        template: "<h1>404</h1>"
      });
  }
]);
