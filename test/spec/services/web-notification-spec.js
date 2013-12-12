/*jshint -W030 */

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

describe('Service: WebNotification', function() {

  var WebNotification;

  beforeEach(function() {
    module('ng-kabam-notification');

    inject(function($injector) {
      WebNotification = $injector.get('WebNotification');
    });
  });

  describe('Module', function() {

    it('should be loaded', function() {
      expect(WebNotification).not.toBe(null);
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
    it('should return true if the running browser supporting Web Notification', function() {
      expect(WebNotification.isSupported).toBeDefined();
      expect(WebNotification.isSupported()).toBe(true);
    });
  });

  describe('WebNotification.show()', function() {

    it('should be able show the broadcast notification type', function() {
      expect(WebNotification.show).toBeDefined();
      spyOn(WebNotification, 'show').andCallThrough();
      WebNotification.show('broadcast', {
        message: 'fake message'
      });
      expect(WebNotification.show).toHaveBeenCalled();
    });

    it('should be able show the default notification type', function() {
      expect(WebNotification.show).toBeDefined();
      spyOn(WebNotification, 'show').andCallThrough();
      WebNotification.show('notify', {
        user: {
          username: 'notifiedUser'
        },
        message: {
          from: 'notificationSender',
          text: 'Incoming chat message'
        },
        type: 'default'
      });
      expect(WebNotification.show).toHaveBeenCalled();
    });

    it('should be able show the call notification type', function() {
      expect(WebNotification.show).toBeDefined();
      spyOn(WebNotification, 'show').andCallThrough();
      WebNotification.show('call', {
        user: {
          username: 'callee'
        },
        message: {
          callee: 'callee',
          caller: 'caller',
          roomId: '34e971f0-7b67-4506-8f96-9855163477fc'
        },
        type: 'call'
      });
      expect(WebNotification.show).toHaveBeenCalled();
    });
  });
});