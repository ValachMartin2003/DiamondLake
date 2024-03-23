;(function(window, angular) {

  'use strict';

  // Application module
  angular.module('app', [
    'ui.router',
		'app.common'
  ])

  // Application config
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    ($stateProvider, $urlRouterProvider) => {

      $stateProvider
      .state('root', {
				abstract: true,
				views: {
					'@': {
						templateUrl: './html/root.html'
					},
					'header@root': {
						templateUrl: './html/header.html'
					},
					'footer@root': {
						templateUrl: './html/footer.html',
					},
					'setup@root': {
						templateUrl: './html/setup.html',
						controller: 'setupController'
					}
				}
      })
			.state('home', {
				url: '/',
				parent: 'root',
				templateUrl: './html/home.html',
			})
			
			.state('rooms', {
				url: '/rooms',
				parent: 'root',
				templateUrl: './html/szobaink.html',
				controller: 'SzobainkController'
			})
			.state('restaurant', {
				url: '/restaurant',
				parent: 'root',
				templateUrl: './html/etterem.html',
			})
			.state('wendings', {
				url: '/wendings',
				parent: 'root',
				templateUrl: './html/wendings.html',
			})
			.state('consoleroom', {
				url: '/consoleroom',
				parent: 'root',
				templateUrl: './html/consoleroom.html',
			})
			.state('esemeny', {
				url: '/esemeny',
				parent: 'root',
				templateUrl: './html/esemeny.html',
				controller: 'esemenyController'
			})
			
			.state('obout_us', {
				url: '/obout_us',
				parent: 'root',
				templateUrl: './html/rolunk.html',
			})
			
			.state('elerhetoseg', {
				url: '/elerhetoseg',
				parent: 'root',
				templateUrl: './html/elerhetoseg.html',
			})
			.state('szolgaltatasaink', {
				url: '/szolgaltatasaink',
				parent: 'root',
				templateUrl: './html/szolgaltatasaink.html',
				controller: 'szolgaltatasainkController'
			})
			.state('foglalas', {
				url: '/foglalas',
				parent: 'root',
				templateUrl: './html/foglalas.html',
				controller: 'foglalasController'
			})

			
			.state('sport', {
				url: '/sport',
				parent: 'root',
				templateUrl: './html/sport.html',
			});
			
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    'trans',
    (trans) => {

      // Transaction events
			trans.events();
    }
  ])

	// Setup controller
  .controller('setupController', [
		'$rootScope',
        '$scope',
		'$timeout',
		'util',
		'http',
    function($rootScope, $scope, $timeout, util, http) {

			// Set methods
			let methods = {

				// Initialize
				init: () => {

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

					// Set model
					$scope.model = {
						login		: {}, 
						register: {},
						profile	: {},
						password: {}
					};

					// Set helper
					$scope.helper = {
						modal: document.querySelector('#setupModal'),	// Modal element
						isModelShow: false,														// Is model in show
						tabPointer: 0,																// Tab buttons pointer
						tabButtons: [																	// Tab buttons
							{id: 'login', 		icon: 'fa-right-to-bracket', name: 'Bejelenkezés', condition: 1},
							{id: 'register', 	icon: 'fa-id-card', name: 'Regisztráció', condition: 1},
							{id: 'profile', 	icon: 'fa-id-card', name: 'Profil', condition: 2},
							{id: 'password', 	icon: 'fa-unlock-keyhole', name: 'Jelszó módosítása', condition: 2},
							{id: 'setup', 		icon: 'fa-gear', name: 'Beállítások', condition: null}
						],
						palettes: [					// Color palettes
							{
								id: 'navbar',
								title: 'Válassza ki a felső menűsor színét!', 	
								colors: ['#c59362','#a99c49ae','#9b9b9b','#F8F2E9'],
								default: '#F8F2E9'
							},
							{
								id: 'body',
								title: 'Válassza ki a háttér színét!', 		
								colors: ['#c59362','#DFCBAC','#fff','#000000','#FFE4C4'],
								default: '#fff'
							},
							{
								id: 'footer',
								title: 'Válassza ki az alsó menüsor színét!',	
								colors: ['#c59362','#a99c49ae','#9b9b9b','#F8F2E9'],
								default: '#F8F2E9'
							}
						],
						maxBorn: moment().subtract(18, 	'years').format('YYYY-MM-DD'),
						minBorn: moment().subtract(120, 'years').format('YYYY-MM-DD')
					};

					// Set saved colors
					$scope.helper.palettes.forEach(palette => {
						let color = localStorage.getItem(`${palette.id}Color`);
						if (color) {
							let element = palette.id === 'body' ? document.body :
														document.getElementById(palette.id);
							if (element) element.style.backgroundColor = color;
						}
					});

					// Set saved last login email address
					$scope.model.login.email = localStorage.getItem('userEmailAddress');

					// Set events
					methods.events();
				},

				// Set events
				events: () => {

					// Add evemt listebner on OPEN
					$scope.helper.modal.addEventListener('shown.bs.modal', () => { 
						$scope.helper.isModelShow = true;
						let element = $scope.helper.modal.querySelector('.nav-tabs > .nav-item > a.nav-link');
						if (element) {
							let tabPointer = element.dataset.tabPointer;
							if (tabPointer) {
								$scope.helper.tabPointer = parseInt(tabPointer);
								$scope.$applyAsync();
								methods.focus();
							}
						}
					});

					// Add evemt listebner on CLOSE
					$scope.helper.modal.addEventListener("hidden.bs.modal", () => {
						$scope.helper.isModelShow = false;
						methods.reset();
					});
					
					// Watch tab buttons pointer changed
					$scope.$watch('helper.tabPointer', (newValue, oldValue) => {

						// Check is changed
						if(!angular.equals(newValue, oldValue)) {
							if ($scope.helper.isModelShow) {
								methods.focus();
							}
						}
					});
				},

				// Reset
				reset: (isLogout=false) => {

					// Reset model
					Object.keys($scope.model).forEach(key => {
						if (isLogout || key !== 'profile') {
							Object.keys($scope.model[key]).forEach(k => {
								if (typeof $scope.model[key][k] === 'boolean')
											$scope.model[key][k] = false;
								else if (key === 'login' && k === 'email')
											$scope.model[key][k] = localStorage.getItem('userEmailAddress');
								else 	$scope.model[key][k] = null;
							});
						}
					});

					// Reset tab pointer
					$scope.helper.tabPointer = 0;

					// Reset tab navigation buttons, and panels
					let tabNavItems = $scope.helper.modal.querySelectorAll('.nav-tabs > .nav-item > a.nav-link'),
							tabPanels 	= $scope.helper.modal.querySelectorAll('.tab-content > .tab-pane');
					tabNavItems.forEach((item, i) => {
						item.classList[i ? 'remove' : 'add']('active');
						item.setAttribute('aria-selected', !i);
						if (i < tabPanels.length)
							tabPanels[i].classList[i ? 'remove' : 'add']('active');
					});

					// Apply change
					$timeout(() => $scope.$applyAsync());
				},

				// Set focus
				focus() {
					$timeout(() => {
						let formName 	= `${$scope.helper.tabButtons[$scope.helper.tabPointer].id}Form`,
								inputs 		= $scope.helper.modal.querySelectorAll(
															`form[name="${formName}"] input:not(:disabled), 
															 form[name="${formName}"] textarea:not(:disabled)`);
						if (inputs.length) {
							let invalids = [...inputs].filter(e => e.classList.contains('ng-invalid'));
							if (invalids.length) 
										invalids[0].focus();
							else	inputs[0].focus();
						}
					}, 50);
				},

				// Show message
				showMessage: (key) => {

					// Set message
					let msg = null;

					// Switch event type
					switch(key) {
						case 'register':
							msg = "Köszönjük, hogy regisztrált weboldalunkra!";
							break;
						case 'profile':
							msg = "Az Ön adatait sikeressen módosítottuk!";
							break;
						case 'password':
							msg = "Az Ön jelszavát módosítottuk!";
							break;
					}

					// When message exist, then show it
					if (msg) $timeout(() => {alert(msg);}, 50);
				}
			};
			
			// Set scope methods
			$scope.methods = {

				// Show/Hide password
				showHidePassword: (event) => {
					let element = event.currentTarget;
					if (element) {
						let key 	= element.dataset.key,
								field	= element.dataset.field,
								form 	= element.closest('form');
						if (form) {
							let passwords = form.querySelectorAll('.input-password');
							if (passwords.length) {
								passwords.forEach(e => {
									e.type = $scope.model[key][field] ? 'text' : 'password';
								});
							}
						}
					}
				},

				// Chenge color
				changeColor: (event, color=null) => {
					if (event && color) {
						let palette = event.currentTarget;
						if (palette) {
							let paletteId = palette.parentElement.dataset.paletteId;
							if (paletteId) {
								let element = paletteId === 'body' ? document.body :
															document.getElementById(paletteId);
								if (element) {
									element.style.backgroundColor = color;
									localStorage.setItem(`${paletteId}Color`, color);
								}
							}
						}
					}
				},

				// Accept Login/Register/Profile
				accept: (event) => {

					// Get/Check element
					let element = event.currentTarget;
					if (element) {

						// Get element data key, and neccesary input properties
						let key		= element.dataset.key,
								args 	= util.objFilterByKeys($scope.model[key], [
													'passwordShow',
													'type_name'
												], false);

						// When ha born property, then convert date to string
						if (util.isObjectHasKey(args, 'born') &&
								util.isDate(args.born))
							args.born = moment(args.born).format('YYYY-MM-DD');
						
						// When is event profile or password, 
						// then add user identifier  to arguments
						if (key === 'profile' || key === 'password') 
							args['id'] = $rootScope.user.id;

						// Http request
						http.request({
							method: key === 'login' ? 'GET' : 'POST',
							url 	: `./php/${key}.php`,
							data 	: args
						})
						.then(response => {

							// When response, or arguments has born property, 
							// then convert to date type
							if (util.isObjectHasKey(response, 'born'))
                response.born = moment(response.born).toDate();
							if (util.isObjectHasKey(args, 'born'))
								args.born = moment(args.born).toDate();

							// When is event Login/Register
							if (key === 'login' || key === 'register') {

								// Save in local storige email address
								localStorage.setItem('userEmailAddress', args.email);

								// When is event register, then:
								// set user identifier, and default type, and type name.
								if (key === 'register') {
									args['id'] 				= response['id'];
									args['type'] 			= 'U';
									args['type_name'] = 'felhasználó';
								}
							}

							// Set user
							$rootScope.user = util.objMerge($rootScope.user, 
																key === 'login' ? response : args, true);

							// Apply change
							$rootScope.$applyAsync();

							// Show message
							methods.showMessage(key);
						})
						.catch(e => $timeout(() => { alert(e); }, 50));
					}
				},

				// Logout
				logout: () => {

					// Confirm
					if (confirm('Biztosan ki akar jelentkezni?')) {

						// Reset user
						Object.keys($rootScope.user).forEach((i) => $rootScope.user[i] = null);

						// Reset model
						$timeout(() => { methods.reset(true); });
					}
				},

				// Tab buttons clicked
				tabClicked: (event) => {

					// Get/Check element
					let element = event.currentTarget;
					if (element) {
						let tabPointer = element.dataset.tabPointer;
						if (tabPointer) {
							$scope.helper.tabPointer = parseInt(tabPointer);
						}
					}
				},

				// Reset colors to default
				resetColors: () => {

					// Confirm
					if (confirm('Visszaállítja az alapértelmezett színeket?')) {

						// Each colors palettes
						$scope.helper.palettes.forEach(palette => {

							// Get/Check element
							let element = palette.id === 'body' ? document.body :
														document.getElementById(palette.id);
							if (element) {

								// Set/Save color
								element.style.backgroundColor = palette.default;
								localStorage.setItem(`${palette.id}Color`, palette.default);
							}
						})
					}
				}
			};


		

			// Initialize
			methods.init();
		}
	])

	// Esemény controller
	.controller('esemenyController', [
		'$scope',
		'$interval',
		'http',
		function($scope, $interval, http) {

			// Conntstants
			const MILLISECOND 	= 1000,
						MINUTE 				= MILLISECOND * 60,
						HOUR 					= MINUTE * 60,
						DAY 					= HOUR * 24;

			// Set methods
			let methods = {

				// Initialize
				init: () => {

					// Set interval identifier
					$scope.intervalID = null;

					// Get programmes
					methods.get().then(() => {

						// Calculate
						methods.calculate();

						// Set interval
						$scope.intervalID = $interval(() => {

							// Calculate again, and again
							methods.calculate();
						}, 1000);
					});

					// Set events
					methods.events();
				},

				// Get 
				get: () => {

					// Create new promise
					return new Promise((resolve, reject) => {

						// Get programmes
						http.request('./php/programok.php')
						.then(response => {
							$scope.data = response;
							resolve();
						});
					});
				},

				// Events
				events: () => {

					// Scope destroy event
					$scope.$on('$destroy', function () {
						if ($scope.intervalID) {
							$interval.cancel($scope.intervalID);
							$scope.intervalID = null;
						}
					});
				},

				// Calculate
				calculate: () => {
					if ($scope.data.future.length) {
						let currentTime = moment().toDate().getTime(),
								removeItems = [];
						for (let i=0; i < $scope.data.future.length; i++) {
							let expireTime	= moment($scope.data.future[i].expiration).toDate().getTime(),
									distance 		= expireTime - currentTime;
							if (distance > 0) {
								$scope.data.future[i].days = Math.floor(distance / (DAY)).toString().padStart(2, '0');
								$scope.data.future[i].hours = Math.floor((distance % (DAY)) / (HOUR)).toString().padStart(2, '0');
								$scope.data.future[i].minutes = Math.floor((distance % (HOUR)) / (MINUTE)).toString().padStart(2, '0');
								$scope.data.future[i].seconds = Math.floor((distance % (MINUTE)) / MILLISECOND).toString().padStart(2, '0');
							} else {
								removeItems.push(i);
							}
						}
						if (removeItems.length) {
							for (let i=0; i < removeItems.length; i++) {
								$scope.data.past.push($scope.data.future[removeItems[i]]);
								$scope.data.future.splice(removeItems[i], 1);
							}
						}
						$scope.$applyAsync();
					} else if ($scope.intervalID) {
						$interval.cancel($scope.intervalID);
						$scope.intervalID = null;
					}
				}
			};

			// Set scope methods
			$scope.methods = {

				// Display program description
				description: (evemt) => {
					let element = evemt.currentTarget,
							key 		= element.getAttribute('key'),
							index 	= parseInt(element.getAttribute('index'));
					$scope.description = $scope.data[key][index].description;
					$scope.$applyAsync();
				}
			};

			// Initialize
			methods.init();
	 	}
	])

    
	// Szobaink controller		
	.controller('SzobainkController', [
		'$scope',
		function($scope) {
		
			}
		])	

	   .controller('foglalasController', [
		'$scope',
		   '$timeout',
		function($scope, $timeout) {
		   }
	   ])
	
	   .controller('szolgaltatasainkController', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.data = [
			{img: 'masszazs', title:'Wellness'},
			{img: 'medence', title:'Medencék'},
			{img: 'sauna1', title:'Szauna világ'},
			{img: 'gyerekek', title:'Konzolszoba'},
			{img: 'etterem2', title:'Étterem'},
			{img: 'bar', title:'Bár'},
			{img: 'kondi', title:'Sportolási lehetőségeink'},
			{img: 'Disco', title:'Szórakozás'}
		];
	}]);
	
	

})(window, angular);