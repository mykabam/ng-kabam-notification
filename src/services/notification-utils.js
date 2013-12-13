/**
 * @overview NotificationUtils
 * @ngdoc service
 *
 * @description a factory service that provide a useful utilities to interact
 * with the Web Notification APIs in different browser.
 */
angular.module('ng-kabam-notification')
  .factory('NotificationUtils', ['$window',
    function($window) {

      return {

        /**
         * To check if Web Notification is supported or not in running browser.
         * @return {Boolean} return true if Web Notification is supported
         */
        isSupported: function() {
          var webNotifIsSupported = ('Notification' in $window) ? true : false;
          return webNotifIsSupported;
        }
      };
    }
  ]);