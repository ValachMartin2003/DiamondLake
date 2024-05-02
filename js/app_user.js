;(function(window, angular) {

  'use strict';

  // Application user module
  angular.module('app_user', [
		'app.common'
	])

	// User factory
  .factory('user', [
    '$rootScope',
    '$timeout',
		'http',
    ($rootScope, $timeout, http) => {

			// Set user properties
			$rootScope.user = {
				id: null,
				type: null,
				type_name: null,
				name: null,
				born: null,
				gender: null,
				address: null,
				country_code: null,
				phone: null,
				email: null
			};

			// Set keys to save in local storige
			let keys = ['id', 'email'];

			// Set service
      let service = {

				// Get key
				getKey: (key) => [$rootScope.app.id, 'user', key].join('_'),

				// Get/Set user properties from local storage
				get: () => {
					return new Promise((resolve) => {
						keys.forEach(key => $rootScope.user[key] = 
							window.localStorage.getItem(service.getKey(key)));
						$rootScope.$applyAsync();
						resolve();
					});
				},

				// Get user email property from local storage
				getEmail: () => window.localStorage.getItem(service.getKey('email')),

				// Get/Set user properties
				user: () => {
					return new Promise((resolve, reject) => {

						// Http request
						http.request({
							url: `./php/getUser.php`,
							data: {id: $rootScope.user.id}
						})
						.then(response => {
							response.born = moment(response.born).toDate();
							Object.keys(response).forEach(key => {
								$rootScope.user[key] = response[key];
							});
							$rootScope.$applyAsync();
							resolve();
						})
						.catch(e => {
							$timeout(() => {
								alert(e);
								reject();
							}, 50);
						});
					});
				},

				// Save user properties to local storage
				save: () => {
					keys.forEach(key => {
						let id = service.getKey(key);
						if ($rootScope.user[key])
									window.localStorage.setItem(id, $rootScope.user[key]);
						else	window.localStorage.removeItem(id); 
					});
				},

				// Reset
				reset: () => {
					return new Promise((resolve) => {
						Object.keys($rootScope.user).forEach((key) => {
							if (key !== 'email') $rootScope.user[key] = null;
						});
						$rootScope.$applyAsync();
						resolve();
					});
				}
			};

			// Logout
			$rootScope.logout = () => {

				// Reset asynchronous
				$timeout(() => {

					// Confirm
					if (confirm('Biztosan ki akar jelentkezni?')) {

						// Remove user id from localstorige
						window.localStorage.removeItem(service.getKey('id'));

						// Reset user properties
						service.reset().then(() => {

							// Check ignored states
							$rootScope.goToPreviousState();
						});
					}
				}, 150);
			};

			// Return service
      return service;
		}
	]);

})(window, angular);