/*
 * Helper function to check the notification permission status based on the sent
 * user-agent header. We need to check based on per browser since each browser
 * has different implementation.
 *
 * @param {String} userAgent the user-agent header
 */

function checkPermission(userAgent) {

  // permission status
  var PERMISSION_ALLOWED = 0,
    PERMISSION_NOT_ALLOWED = 1;

  // expected user agents
  var USER_AGENT = {
    FIREFOX: userAgent.match(/Firefox\//),
    CHROME: userAgent.match(/Chrome\//)
  };

  var notification;

  var FIREFOX = {},
    CHROME = {};

  if (USER_AGENT.FIREFOX) {
    notification = Notification;

    if (notification.permission) {
      FIREFOX.NOTIF_ALLOWED = notification.permission === 'granted',
      FIREFOX.NOTIF_NOT_ALLOWED = notification.permission === 'default';
    }
  } else if (USER_AGENT.CHROME) {
    notification = webkitNotifications || Notification;

    CHROME.NOTIF_ALLOWED = notification.checkPermission() === 0;
    CHROME.NOTIF_NOT_ALLOWED = notification.checkPermission() === 1;
  }

  spyOn(notification, 'requestPermission').andCallThrough();

  if (USER_AGENT.FIREFOX && FIREFOX.NOTIF_ALLOWED) {
    return PERMISSION_ALLOWED;
  } else if (USER_AGENT.FIREFOX && FIREFOX.NOTIF_NOT_ALLOWED) {
    return PERMISSION_NOT_ALLOWED;
  } else if (USER_AGENT.CHROME && CHROME.NOTIF_ALLOWED) {
    return PERMISSION_ALLOWED;
  } else if (USER_AGENT.CHROME && CHROME.NOTIF_NOT_ALLOWED) {
    return PERMISSION_NOT_ALLOWED;
  }
}

/*
 * A helper function to Spy on the Notification object to see if the
 * requestPermission method has been called or not.
 * @param {String} userAgent the user-agent header
 */

function isRequestPermissionMethodCalled(userAgent) {

  // user agents used on test
  // expected user agents
  var USER_AGENT = {
    FIREFOX: userAgent.match(/Firefox\//),
    CHROME: userAgent.match(/Chrome\//)
  };

  if (USER_AGENT.FIREFOX) {
    // somehow the returned value is always a function
    expect(Notification.requestPermission).toBeDefined();
  } else if (USER_AGENT.CHROME) {
    expect(webkitNotifications.requestPermission).toHaveBeenCalled();
  }
}

describe('Service: ng-kabam-notification', function() {

  var WebNotification;

  beforeEach(function() {
    module('ng-kabam-notification');

    inject(function($injector) {
      WebNotification = $injector.get('WebNotification');
    });
  });

  describe('WebNotification.requestPermission()', function() {
    it('should request the permission', function() {
      // evaluate the permission status before requesting permission
      expect(checkPermission(navigator.userAgent)).toEqual(1);

      expect(WebNotification.requestPermission).toBeDefined();

      WebNotification.requestPermission();

      // expect the requestPermission method has been called
      isRequestPermissionMethodCalled(navigator.userAgent);
    });
  });

  describe('WebNotification.isSupported()', function() {
    it('should granted the request permission', function() {
      expect(WebNotification.isSupported).toBeDefined();
      expect(WebNotification.isSupported()).toBe(true);
    });
  });

});