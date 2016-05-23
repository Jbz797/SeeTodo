'use strict';

describe('Services', function () {

	var storageSpec;

	beforeEach(function () {
		angular.mock.module('seetodo');
		angular.mock.inject(function (storage) {
			storageSpec = storage;
		});
	});

	it('La méthode "add" existe', function () {
		expect(storageSpec.add)
			.to.be.a('function');
	});

});
