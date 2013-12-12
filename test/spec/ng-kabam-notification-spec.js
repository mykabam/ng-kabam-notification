describe('Service: ng-kabam-notification', function() {

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
});