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
      },
      /**
       * To request Web Notification permission
       */
      requestPermission: function() {
        var userAgent = navigator.userAgent,
          notification = null;

        var FIREFOX_USER_AGENT = userAgent.match(/Firefox\//),
          CHROME_USER_AGENT = userAgent.match(/Chrome\//);

        if (FIREFOX_USER_AGENT) {
          notification = Notification;
        } else if (CHROME_USER_AGENT) {
          notification = webkitNotifications;
        }

        if (notification && notification.permission !== 'denied') {

          notification.requestPermission(function(status) {
            if (notification.permission !== status) {
              notification.permission = status;
            }
          });
        }
      }
    };
  });