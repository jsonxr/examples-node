var app = angular.module('MyApp');

app.factory('Alert', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  var alertService;
  $rootScope.alerts = [];

  alertService = {
    add: function(alert) {
      $rootScope.alerts.push({
        type: alert.type,
        msg: alert.content,
        close: function() {
          return alertService.closeAlert(this);
        }
      });

      if (alert.duration > 0) {
        $timeout(function(){
          alertService.closeAlert(this);
        }, alert.duration);
      }
    },
    closeAlert: function(alert) {
      return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
    },
    closeAlertIdx: function(index) {
      return $rootScope.alerts.splice(index, 1);
    }

  };

  return alertService;
}]);
