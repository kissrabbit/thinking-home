﻿define(['app'], function (application) {

	application.module('Scripts.Subscriptions', function (module, app, backbone, marionette, $, _) {

		// entities
		module.FormData = backbone.Model.extend();
		
		module.Subscription = backbone.Model.extend();

		module.SubscriptionCollection = backbone.Collection.extend({
			model: module.Subscription
		});

		// api
		var api = {

			loadSubscriptions: function () {

				var defer = $.Deferred();

				$.getJSON('/api/scripts/subscription/list')
					.done(function (items) {
						var collection = new module.SubscriptionCollection(items);
						defer.resolve(collection);
					})
					.fail(function () {
						defer.resolve(undefined);
					});

				return defer.promise();
			},
			loadFormData: function () {

				var defer = $.Deferred();

				$.getJSON('/api/scripts/subscription/form')
					.done(function (data) {
						var model = new module.FormData(data);
						defer.resolve(model);
					})
					.fail(function () {
						defer.resolve(undefined);
					});

				return defer.promise();
			}
		};

		// requests
		app.reqres.setHandler('load:scripts:subscription-list', function () {
			return api.loadSubscriptions();
		});
		
		app.reqres.setHandler('load:scripts:subscription-form', function () {
			return api.loadFormData();
		});
	});

	return application.Scripts.Subscriptions;
});