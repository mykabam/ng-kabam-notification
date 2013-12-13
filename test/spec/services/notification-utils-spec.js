/*jshint -W030 */

describe('Service: NotificationUtils', function() {

  var NotificationUtils;

  beforeEach(function() {
    module('ng-kabam-notification');

    inject(function($injector) {
      NotificationUtils = $injector.get('NotificationUtils');
    });
  });

  describe('Module', function() {

    it('should be loaded', function() {
      expect(NotificationUtils).not.toBe(null);
    });
  });

  describe('NotificationUtils.isSupported()', function() {
    it('should return true if the running browser supporting Web Notification', function() {
      expect(NotificationUtils.isSupported).toBeDefined();
      expect(NotificationUtils.isSupported()).toBe(true);
    });
  });
});