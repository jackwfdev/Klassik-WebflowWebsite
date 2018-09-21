
/*
 *
 * "Track" a page visit
 *
 * @params
 * 	name -> the url of the page
 *
 */
function trackPageVisit ( name ) {

	/*
	 *
	 * Open a blank page and add the tracking code to it
	 *
	 */
	// Build the URL
	var projectBaseURL = __OMEGA.settings.projectBaseURL;
	var baseURL = location.origin.replace( /\/$/, "" ) + "/" + projectBaseURL + "/trac";
	name = name.replace( /^[/]*/, "" );
	var url = baseURL + "/" + name;

	// Build the iframe
	var domIframe = openPageInIframe( url, "Tracking and Analytics" );

	setTimeout( function () {

		// Inject the tracking code
		var domDocument = domIframe.contentWindow.document;
		$( domDocument.head ).find( "title" ).text( "Tracking" );
		$( domDocument.head ).append( __OMEGA.settings.beforeClosingHeadTag );
		$( domDocument.body ).prepend( __OMEGA.settings.afterOpeningBodyTag );
		$( domDocument.body ).append( __OMEGA.settings.beforeClosingBodyTag );

		// Remove the iframe after a while
		setTimeout( function () { $( domIframe ).remove() }, 27 * 1000 );

	}, 1500 );

}
