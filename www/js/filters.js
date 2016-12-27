'use strict';

// filter to remove duplicates from the country list
angular.module('travelnotebook').filter('filterDuplicates', function() {

  return function (entries,country) {
    var keys = [];
    var unique_countries = [];

    angular.forEach(entries, function(item) {
      var key = item[country];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        unique_countries.push(item);
      }
    })
    return unique_countries;
  };
});
