describe('Service: NotificationFactory', function() {

  var NotificationFactory;

  beforeEach(function() {
    module('ng-kabam-notification');

    inject(function($injector) {
      NotificationFactory = $injector.get('NotificationFactory');
    });
  });

  describe('Module', function() {

    it('should be loaded', function() {
      expect(NotificationFactory).not.toBe(null);
    });
  });

  describe('NotificationFactory.createNotification()', function() {
    it('should have NotificationFactory.createNotification()', function() {
      expect(NotificationFactory.createNotification).toBeDefined();
    });

    it('should be able to create broadcat type notification', function() {
      spyOn(NotificationFactory, 'createNotification').andCallThrough();

      NotificationFactory.createNotification({
        notificationType: 'broadcast',
        data: {
          message: 'Hi!'
        }
      });

      expect(NotificationFactory.createNotification).toHaveBeenCalled();
    });
  });
});