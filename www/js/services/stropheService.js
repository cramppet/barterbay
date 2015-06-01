angular.module('starter.services')

.service('strophe', function strophe($rootScope, $http, $window, Config) {
  var XMPPConnection = null;

  $rootScope.STROPHE_onMessage = function(stanza) {
    if (stanza.getAttribute("from") !== 'undefined') {
      var senderuser = stanza.getAttribute("from").split('@')[0];
      $rootScope.$broadcast('strophe-message-recieved', { from: senderuser });
    }
    return true;
  };

  $rootScope.STROPHE_sendMessage = function(message, toUser, fromUser, chatId) {
    $http.post(Config.webServerUrl + 'chat/' + chatId, {
        senderuser:  fromUser,
        messagebody: message
      })
      .success(function(res) {
        var uniqueId = XMPPConnection.getUniqueId();

        var messageStanza = $msg({
          "id": uniqueId,
          "to": toUser
        }).c("body").t(message);

        XMPPConnection.send(messageStanza.tree());
        $rootScope.$broadcast('strophe-message-sent', { to: toUser });
      });
  };

  $rootScope.STROPHE_onConnect = function(status) {
    if (status === Strophe.Status.CONNECTED) {
      XMPPConnection.addHandler($rootScope.STROPHE_onMessage, null, 'message', null, null, null);
      XMPPConnection.send($pres().tree());
    }
    return true;
  };

  var stropheService = {
    createConnection: function(username, password) {
      XMPPConnection = new Strophe.Connection(Config.xmppBOSHUrl);
      XMPPConnection.connect(username, password, $rootScope.STROPHE_onConnect);
    },
    destroyConnection: function() {
      XMPPConnection.options.sync = true;
      XMPPConnection.flush();
      XMPPConnection.disconnect();
    },
    sendMessage: function(message, toUser, fromUser, chatId) {
      $rootScope.STROPHE_sendMessage(message, toUser, fromUser, chatId);
    }
  };

  return stropheService;
});