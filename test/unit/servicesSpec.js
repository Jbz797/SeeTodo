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

		beforeEach(inject(function (_$q_, _storage_) {
			$q = _$q_;
			storage = _storage_;
		}));

		// Add
		it('La méthode "add" existe', function () {
			expect(storage.add)
				.to.be.a('function');
		});
		it('La méthode "add" doit enregistrer une todo en base', function () {
			storage.add(todoTest);
			storage.getTodo(todoTest)
				.then(function (response) {
					console.log(response);
				});
		});
	});

	/*	describe('Services', function () {

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

			beforeEach(function () {
				angular.mock.module('seetodo');
				angular.mock.inject(function (_$q_, _storage_) {
					$q = _$q_;
					storage = _storage_;
				});
			});

			// Add
			it('La méthode "add" existe', function () {
				expect(storage.add)
					.to.be.a('function');
			});
			it('La méthode "add" doit enregistrer une todo en base', function () {
				storage.add(todoTest)
					.then(function success(response) {
						console.log(response);
					});
			});
		});*/
})();
