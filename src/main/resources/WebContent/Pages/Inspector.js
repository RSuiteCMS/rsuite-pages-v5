RSuite.component.Inspect.extend()
	.named('Pages.Inspector')
	.reopen({
		// Part of RSuite.component.Inspect; Adds a tab that links to `Details`, defined below.
		controller: {
			inspectors: [ 'Details' ],
		},
		modelBinding: 'controller.content',
		// Ensures that all descendent views have these keywords from this view
		cascadeProperties: [ 'model' ],
		headerViews: [
			// A row of child views
			RSuite.component.PrimaryTile.extend({
				direction: 'row',
				contains: [
					// (i) icon
					RSuite.view.Icon.extend({
						model: 'inspect',
						size: 24
					}),
					// header title
					Ember.View.extend({
						template: Ember.Handlebars.compile('{{{view.content}}}'),
						content: function () {
							return RSuite.messageTable.get("@pluginId@/inspect/header-content").fmt(
								this.get('model.finalManagedObject.displayName'),
								this.get('model.canonicalUri')
							);
						}.property('model.finalManagedObject.loadState')
					}),
					RSuite.view.Icon.extend({
						model: 'panel_new_window',
						size: 24,
						isVisible: function () {
							// Don't show this icon if we're already in a new window.
							return !Pages.Inspector.detect(RSuite.controller.minimalView);
						}.property(),
						click: function () {
							// Have to grab parentView.model, since it's overloaded by RSuite.view.Icon's `model` property.
							var context = this.get('parentView.model.actionMenuContext');
							if (context) {
								RSuite.Action('pages:inspectInNewWindow', context);
							}
						},
						titleBinding: 'RSuite.messageTable.chrome/inspect/pop-out'
					})
				]
			})
		],
		Details: RSuite.component.NavigableSection.Navigator.extend({
			icon: 'preview',
			tooltipBinding: 'RSuite.messageTable.@pluginId@/inspect/title',
			labelBinding: 'RSuite.messageTable.@pluginId@/inspect/title',
			bodyView: Ember.View.extend()
				.named('Pages.Inspector.DetailsView')
				.template('@pluginId@', 'Pages/Inspector.hbr')
				.reopen({
					templateName: RSuite.url('@pluginId@', 'Pages/Inspector.hbr'),
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
			})
		}).create()
	})
RSuite.Tab.inspector("pages-inspector/**", null, function (match, uri) {
	return Pages.Inspector.extend({
		contentBinding: 'controller.content',
		setupContent: function () {
			var mo = RSuite.model.ManagedObject.getCached(uri);
			mo.done(function () {
				this.set('controller.content', mo);
			}.bind(this));
		}.on('init')
	});

});
RSuite.Action({
	id: 'pages:inspector',
	invoke: function (context) {
		var managedObject = Ember.get(context, 'managedObject');
		RSuite.controller.setProperties({
			detailsObjectType: managedObject.constructor.toString(),
			detailsObjectId: managedObject.get('key'),
			detailsViewClass: 'Pages.Inspect'
		});
		return RSuite.success;
	},
	isValid: 'isMO'
});


RSuite.Action({
	id: 'pages:inspectInNewWindow',
	invoke: function (context) {
		var managedObject = Ember.get(context, 'managedObject');
		RSuite.openWindow(RSuite.url('/pages-inspector/') + managedObject.get('key'));
		return RSuite.success;
	},
	isValid: 'isMO'
});

