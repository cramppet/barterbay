angular.module('starter.services')

.service('Config', function() {
	return {
		webServerUrl:			'http://129.25.12.35:8000/',
		xmppBOSHUrl:			'http://129.25.12.35:5280/http-bind',
		xmppDomian: 			'129.25.12.35',
		googleClientId: 	'522866929029-th96nh9dqtic9v9b4remu88sccdtkpvj.apps.googleusercontent.com',
		facebookClientId: '945090258875901',
		commonConfig: {
	    popupOptions: {
	      location:           'no',
	      toolbar:            'no',
	      clearsessioncache:  'yes',
	      clearcache:         'yes',
	      width:              window.screen.width,
	      height:             window.screen.height
	    },
    	redirectUri: 'http://localhost/',
  	}
	};
});