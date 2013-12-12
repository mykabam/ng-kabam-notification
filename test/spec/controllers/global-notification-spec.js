describe('Controller: GlobalNotificationCtrl', function() {

  // load the module
  beforeEach(module('ng-kabam-notification'));

  var GlobalNotificationCtrl,
    scope,
    socket,
    WebNotification;

  // Initialize the controller and mocked scope
  beforeEach(inject(function($controller, $rootScope, _WebNotification_, _socket_) {
    scope = $rootScope.$new();
    socket = _socket_;
    WebNotification = _WebNotification_;

    GlobalNotificationCtrl = $controller('GlobalNotificationCtrl', {
      $scope: scope
    });
  }));

  describe('Module', function() {
    it('should have a default scope', function() {
      expect(scope).toBeDefined();
    });

    it('socket should be injected into controller', function() {
      expect(socket).toBeDefined();
    });

    it('WebNotification should be injected into controller', function() {
      expect(WebNotification).toBeDefined();
    });
  });
});