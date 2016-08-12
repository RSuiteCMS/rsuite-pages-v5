RSuite.view.Activity
	.boilerplate({
		Complex: {
			icon: {
				active: 'act_help',
				passive: 'act_help'
			}
		}
	}, '@pluginId@')
	.named('Pages.Activity');

/**
 * If you intend to use server-side models the Activity will need to wait for
 * in order to start, you'll want to add the RSuite.Modeled mixin to
 * your Controller, and define some models:
 * 	Dashboard.Activity.Controller.reopen(RSuite.Modelled, {
 * 		models: {
 *			importantModel: function () {
 * 				// If you return a Promise, things work better
 *				return new Promise(function (resolve, reject) {
 * 					// Wait until the session is complete
 *					RSuite.model.session.done(function () {
 * 						RSuite.services({
 * 							service: 'api/@pluginId@:myPageService'
 * 						})
 * 						.done(resolve)
 * 						.fail(function (xhr, status, error) {
 * 							reject(error)
 * 						});
 *					});
 *				});
 *			}
 *		},
 * });
 **/
Pages.Activity.View.reopen({
	templateName: RSuite.url('@pluginId@', 'simple-mo-view.hbr')
});

RSuite.Tab.enable(Pages.Activity);
/*
// Register the URL action to navigate to the tab.
RSuite.controller.activities.registerUrlAction('pages-activity', function () {
	var uri =  [].join.call(arguments, '/'),
		mo = RSuite.model.ManagedObject.get(uri);
	Pages.Activity.controller.set('model', mo);
	// Creates a new tab pointing at your content.
	RSuite.controller.activities.addTab("Pages Demo", 100, Pages.Activity);
	mo.done(function () {
		RSuite.controller.activities.activateTab(Pages.Activity);
	}).fail(function () {
		var error = status;
		if (reason) {
			if (reason.message) {
				error = reason.message;
			} else {
				error = reason.toString();
			}
		}
		RSuite.controller.activities.activateTab(Pages.ErrorView.create({ uri: uri, error: error }));
	});
});

// Create an action so that a menu item can point to the tab.
RSuite.Action({
	id: 'pages:activity',
	invoke: function (context) {
		var managedObject = Ember.get(context, 'managedObject');
		if (Ember.get(context, 'newWindow')) {
			RSuite.openWindow(RSuite.url('/pages-activity/') + managedObject.get('canonicalUri'));
		} else {
			if (!RSuite.controller.activities.findTab(Pages.Activity)) {
				RSuite.controller.activities.addTab("Pages Demo", 100, Pages.Activity);
			}
			Pages.Activity.controller.set('model', managedObject);
			RSuite.controller.activities.activateTab(Pages.Activity);
			history.replaceState({}, "Will I Appear?", RSuite.url('/pages-activity/') + managedObject.get('canonicalUri'));
		}
		return RSuite.success;
	},
	isValid: RSuite.Action.rules.isMO
});
*/
