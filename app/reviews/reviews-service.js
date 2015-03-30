angular.module('uiRouterSample.reviews.service', [

])

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('reviews', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/reviews.json';
  var reviews = $http.get(path).then(function (resp) {
    return resp.data.reviews;
  });

  var factory = {};
  factory.all = function () {
    return reviews;
  };
  factory.get = function (id) {
    return reviews.then(function(){
      return utils.findById(reviews, id);
    })
  };
  return factory;
}]);
