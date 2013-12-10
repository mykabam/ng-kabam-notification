/**
 * @overview Notification service for Kabam application
 */
angular.module('ng-kabam-notification', [])
  .factory('WebNotification', function() {
    return {

      /**
       * To check if Web Notification is supported or not in running browser.
       * @service isSupported
       * @return {Boolean} return true if Web Notification is supported
       */
      isSupported: function() {
        var webNotifIsSupported = ('Notification' in window) ? true : false;
        return webNotifIsSupported;
      }
    };
  });