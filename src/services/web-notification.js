/**
 * @overview WebNotification
 * @ngdoc service
 *
 * @description a factory service that provide a service to show Notification
 * based on the Notification type.
 */
angular.module('ng-kabam-notification')
  .factory('WebNotification', ['NotificationFactory',
    function(NotificationFactory) {
      return {

        /**
         * To check if Web Notification is supported or not in running browser.
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
        },
        /**
         * Show notification
         * @param {String} action which socket event to use, `broadcast` or
         * `notify`
         */
        show: function(action, data) {
          NotificationFactory.createNotification({
            action: action,
            data: data
          });
        }
      };
    }
  ]);