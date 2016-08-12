RSuite.Action({
	id: 'pages:static',
	invoke: function (context) {
		var mo = Ember.get(context, 'managedObject'),
			id = mo.get('finalManagedObject.id'),
			//Note: NOT A TEMPLATE.
			rurl = 'Pages/Static.html?id=' + encodeURIComponent(id);
		RSuite.openWindow(RSuite.url("@pluginId@", rurl), { tab: true });

		return RSuite.success;
	}
});

