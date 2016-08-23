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
 * your Controller, and define some models
 *
 * You can (and probably should) reopen the Controller to define actions for
 * use in templates, data sources for views and child views, etc.
 **/
Pages.Activity.Controller.reopen({
	//This is how you specify the body content
	contentView: Ember.View.extend()
		// Name the view for maintainability
		.named("Pages.Activity.Controller#contentView")
		.template('@pluginId@', 'Pages/Activity.hbr')
		.reopen({
			// Bind to a reasonable model.
			modelBinding: 'controller.managedObject',
			jsonContent: function () {
				var obj = {},
					mo = this.get('model.finalManagedObject'),
					loading = "Waiting for data...";
				if (!mo || mo.get('loadState') !== 'loaded') { return loading; }
				for (var key in mo) {
					var item = mo.get(key);
					if (item instanceof Function) { continue; }
					obj[key] = mo.get(key);
				};
				if (!Object.keys(obj).length) { return loading; }
				return JSON.stringify(obj, null, 4);
			}.property('model.finalManagedObject.loadState')
		}),
	//These three will define a simple sidebar view.
	navigationTitleOpenBinding: 'RSuite.messageTable.@pluginId@/activity/nagivation/opened',
	navigationTitleClosedBinding: 'RSuite.messageTable.@pluginId@/activity/nagivation/closed',
	navigationView: Ember.View.extend()
		.named('Pages.Activity.Controller#navigationView')
		.reopen({
			template: Ember.Handlebars.compile('Nothing here at the moment')
		}),

	// Basic URI handling:
	// Holds the current URI location
	currentUri: null,
	// Updates the URI whenever the tab or ManagedObject changes.
	currentUriChanged: function () {
		if (!this.get('isActive')) {
			// If not active, this controller does not have an active URI.
			this.set('currentUri', null);
			return;
		}

		//Build the URI.
		var moUri = this.get('managedObject.canonicalUri');
		var uri = 'pages' + (moUri ? ('/' + moUri) : '');
		if (uri && uri !== this.currentUri) {
			this.set('currentUri', uri);
			RSuite.Tab.push(null, uri);
		}
	}.observes('isActive', 'managedObject'),
	urls: {
		'pages': function () {
			RSuite.Tab.activate(Pages.Activity);
		},
		'pages/**': function (matched, url) {
			this.set('managedObject', RSuite.model.ManagedObject.getCached(url));
			matched.parent(); // Calls the function above (e.g., whatever matches the closest parent dir)
		}
	}
});
// Create an Action to link to the Activity
RSuite.Action({
	id: 'pages:activity',
	invoke: function (context) {
		Pages.Activity.getController().set('managedObject', Ember.get(context, 'managedObject'));
		RSuite.Tab.activate(Pages.Activity);
		return RSuite.success;
	},
	isValid: RSuite.Action.rules.isMO
});

RSuite.Tab.enable(Pages.Activity);
