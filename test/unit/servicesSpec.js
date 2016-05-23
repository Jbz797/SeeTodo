/*jshint -W020 */

describe('Services', function () {

	var $q;
	var storage;

	var todo_test = {
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
		var q = $q.defer();
		storage.add(todo_test)
			.then(function (result) {
				q.resolve(result);
			})
		console.log(q.promise);
	});
});
