/*jshint -W020 */

(function () {

	beforeEach(module('seetodo'));

	describe('Services', function () {

		var $q;
		var storage;

		var todoTest = {
			activate: true,
			color: false,
			date: new Date(),
			delete: false,
			description: 'Description',
			id: Math.floor(Math.random() * 100000) + 1,
			title: 'Titre'
		};

		beforeEach(inject(function (_$q_, _$rootScope_, _storage_) {
			$q = _$q_;
			$rootscope = _$rootScope_;
			storage = _storage_;
		}));

		it('should resolve a promise', function () {

			$rootScope.$apply(function () {
				storage.add(todoTest)
					.then(function success(data) {
						console.log('storage.getPromise()', data);
						expect(data)
							.toBe('OK');
					});
			});

		});

		it('should setItem', function () {

			//$rootScope.$apply(function () {
			//  storage.setItem().then(
			//    function success(data) {
			//      console.log('storage.setItem()', data);
			//    },
			//    function error(err) {
			//      console.log('storage.setItem()', err);
			//    });
			//});

			runs(function () {
				return storage.setItem()
					.then(function success(data) {
						console.log('storage.setItem()', data);
						expect(data)
							.toBe('Mr. Bean');
					});
			});

		});
	});
})();
