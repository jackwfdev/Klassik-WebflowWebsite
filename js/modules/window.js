
/*
 *
 * This opens a new page in an iframe and closes it once it has loaded
 *
 */
function openPage ( baseURL, name, options ) {

	options = options || { };
	var closeOnLoad = options.closeOnLoad || false;

	var url = baseURL.replace( /\/+$/, "" );
	if ( name )
		url += "/" + name;

	var $iframe = $( "<iframe>" );
	$iframe.attr( {
		width: 0,
		height: 0,
		title: "Analytics and Tracking",
		src: url,
		style: "display:none;",
		class: "js_iframe_trac"
	} );

	$( "body" ).append( $iframe );

	if ( closeOnLoad ) {
		$( window ).one( "message", function ( event ) {
			if ( location.origin != event.originalEvent.origin )
				return;
			var message = event.originalEvent.data;
			if ( message.status == "ready" )
				$iframe.remove();
		} );
	}

}
