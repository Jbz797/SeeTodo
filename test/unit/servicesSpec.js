/*jshint -W020 */

(function () {
	'use strict';

	describe('Angular LocalForage', function () {

		angular
			.module('app', ['LocalForage']);

		beforeEach(module('app'));

		var $rootScope,
			$injector,
			$localForage;

		beforeEach(function () {
			inject(function (_$rootScope_, _$localForage_) {
				//inject(function (_$rootScope_) {
				$rootScope = _$rootScope_;
				$localForage = _$localForage_;
				//$injector = angular.injector(['ng', 'LocalForage']);
				//$localForage = $injector.get('$localForage');
			});
		});

		it('should resolve a promise', function () {

			$rootScope.$apply(function () {
				$localForage.getPromise()
					.then(function success(data) {
						console.log('$localForage.getPromise()', data);
						expect(data)
							.toBe('OK');
					});
			});

		});

		it('should setItem', function () {

			//$rootScope.$apply(function () {
			//  $localForage.setItem().then(
			//    function success(data) {
			//      console.log('$localForage.setItem()', data);
			//    },
			//    function error(err) {
			//      console.log('$localForage.setItem()', err);
			//    });
			//});

			runs(function () {
				return $localForage.setItem()
					.then(function success(data) {
						console.log('$localForage.setItem()', data);
						expect(data)
							.toBe('Mr. Bean');
					});
			});

		});


	});
})();
