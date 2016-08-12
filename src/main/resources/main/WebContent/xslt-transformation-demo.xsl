<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:r="http://www.rsuitecms.com/rsuite/ns/metadata"
                exclude-result-prefixes="r" >
	<xsl:param name="rsuite.managedObjectId" select="'{undefined}'"/>
	<xsl:output method="html"
	            doctype-public="XSLT-compat"
	            omit-xml-declaration="yes"
	            encoding="UTF-8"
	            indent="yes"
	/>
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="utf-8" />
				<title>RSI Test Transform</title>
				<meta data-context-path="/rsuite-cms/" />
				<script src="/rsuite-cms/rsuite.js"></script>
				<link type="text/css"
				      rel="stylesheet/less"
				      href="/rsuite/rest/v2/stylesheets?contextPath=/rsuite-cms"
				/>
				<script src="/rsuite-cms/scripts/lib/less-1.5.1.js"></script>
			</head>
			<body>
				Same as the static page, except that, as XSL, we have the ability to pass in some request-specific data.
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
	<html>
		<!-- Simplest bootstrap page for having RSuite.services available -->
		<head>
			<meta charset="utf-8" />
			<title>Simple HTML Page</title>
			<!-- Necessary for RSuite.url() to work correctly -->
			<meta data-context-path="/rsuite-cms/" />
			<script src="/rsuite-cms/rsuite.js"></script>
			<link
				type="text/css"
				rel="stylesheet/less"
				href="/rsuite/rest/v2/stylesheets?contextPath=/rsuite-cms"
			/>
			<style>
				body {
					display: flex;
					flex-direction: column;
				}
				body>pre {
					overflow: auto;
					flex: 1 1 auto;
				}
				body>p {
					flex: 0 0 auto;
				}
			</style>
			<script src="/rsuite-cms/scripts/lib/less-1.5.1.js"></script>
		</head>
		<body>
			<p>
			Static HTML page with the simplest method of pulling in RSuite, containing all of RSuite's available views and libraries.<br /><br />
			Here's a ManagedObject.
			</p>
			<script>
				var cdo = RSuite.model.ManagedObject.getCached('<value-of path="${rsuite.managedObjectId}" />');
				cdo.done(function () {
					var obj = {},
						mo = cdo.get('finalManagedObject');
					for (var key in mo) {
						obj[key] = mo.get(key);
					};
					$('<pre>').text(JSON.stringify(mo, null, 4)).appendTo(document.body);
				});
			</script>
		</body>
	</html>
