Pages
-----

There are a number of ways to generate "page" like features in RSuite:

* Minimally dependent on the CMS:
	* Static HTML page
		- This is simple; create an HTML document in your WebContent folder, and reference it from a custom action
		* src/main/resources/WebContent/Pages/Static.*
		* See rsuite-plugin.xml for more details
	* Simple HTML Preview of a ManagedObject (note: at present, this part of the plugin isn't working correctly)
		* src/main/resources/WebContent/xslt-transformation-demo.xsl
	* Dynamic HTML Preview of a ManagedObject (note: at present, this part of the plugin isn't working correctly)
		- This is slightly more complex, but doesn't require the use of a custom action
		* src/main/java/pages/DemoTransformer.java
		* src/main/java/pages/ProgrammaticTransformationDemo.java
		* src/main/resources/WebContent/xslt-transformation-demo.xsl
	* RemoteApi call (note: at present, this part of the plugin isn't working correctly)
		- Essentially, create a RemoteApiHandler that returns an HTML page, and call it with transport=window
		- Most configurable of the non-CMS options
		- Easiest to set up for someone familiar with developing RSuite plugins
		- HTML page can be generated by Java code, or by using XSLT
		* src/main/java/pages/RAPIDemo.java
		* src/main/resources/WebContent/Pages/Static.html

* Views within RSuite CMS:
	- If you need to use Ember or RSuite's CMS views or models, or would like an interface similar to that of Inspect
	* Inspector example:
		* src/main/resources/WebContent/Pages/Inspector.*
	* Activity example (e.g., create a new Tab in the main navigation):
		* src/main/resources/WebContent/Pages/Activity.*
