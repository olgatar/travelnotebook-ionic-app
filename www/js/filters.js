'use strict';

// filter to remove duplicates from the country list
angular.module('travelnotebook.filters',[])

.filter('filterDuplicates', function() {

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
})

.filter('orderEntriesBy', function() {
  return function(entries, value, reverse) {
    var ordered = [];
    angular.forEach(entries, function(entry) {
      ordered.push(entry);
    });
    if(reverse) ordered.reverse();
    return ordered;
  };
});
