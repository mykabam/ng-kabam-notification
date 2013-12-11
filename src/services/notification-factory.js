/**
 * @overview NotificationFactory
 * @ngdoc service
 *
 * @description a factory service that provide a service to construct
 * new Notification. The Notification object is used to configure and
 * display desktop notifications to the user. So, after we construct the
 * Notification, the notification dialog will show up.
 */
angular.module('ng-kabam-notification')
  .factory('NotificationFactory', function() {
    return {
      createNotification: function(options) {
        if (options.notificationType === 'broadcast') {
          new Notification('Broadcast', {
            body: options.data.message
          });
        }
      }
    };
  })