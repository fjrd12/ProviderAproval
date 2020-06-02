/*global QUnit*/

sap.ui.define([
	"Provider/evaluation/ProviderEvaluation/controller/Requirements.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Requirements Controller");

	QUnit.test("I should test the Requirements controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});