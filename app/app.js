// Make sure to include the `ui.router` module as a dependency
angular.module('uiRouterSample', [
  'uiRouterSample.reviews',
  'uiRouterSample.reviews.service',
  'uiRouterSample.utils.service',
  'uiRouterSample.authentication',
  'uiRouterSample.authentication.service',
  'ui.router', 
  'ngAnimate',
  'ngCookies'
])

.run(
  [          '$rootScope', '$state', '$stateParams', '$cookieStore', '$http',
    function ($rootScope,   $state,   $stateParams, $cookieStore, $http) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
    
        //$rootScope.isLogin = true;
        if ($state.current.name !== 'login' && !$rootScope.globals.currentUser) {
          $state.go('login');
          //$rootScope.isLogin = false;
        //} else if (!$rootScope.globals.currentUser){
        //  $rootScope.isLogin = false;
        }
    });

    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/r?id', '/reviews/:id')
        .when('/user/:id', '/reviews/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {

          // Use a url of "/" to set a states as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          template: '<p class="lead">DataSpre Home</p>' +
            '<p>Home contents goese here.</p>'

        })

        ///////////
        // About //
        ///////////

        .state('about', {
          url: '/about',

          // Showing off how you could return a promise from templateProvider
          templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">About DataSphere</p><br/>About info goes here.';
              }, 100);
            }]
        })
    }
  ]
);
