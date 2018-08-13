
/*
 *
 * Contact form
 *
 */
Loginner.registerLoginPrompt( "Contact", {
	onTrigger: function ( event ) {
		$( ".loginner_form_otp" ).hide();
		$( ".js_contact_form" ).fadeOut( function () {
			$( ".loginner_form_phone" ).fadeIn( function () {
				$( ".loginner_form_phone" ).find( "input[ type = 'text' ]" ).first().get( 0 ).focus();
			} );
		} );
	},
	onPhoneValidationError: function ( message ) {
		alert( message );
	},
	onOTPValidationError: function ( message ) {
		alert( message );
	},
	onPhoneSend: function () {
		$( this ).find( "[ type = submit ]" ).val( "Sending....." );
	},
	onShowOTP: function ( domPhoneForm, domOTPForm ) {
		$( domPhoneForm ).fadeOut( function () {
			$( domOTPForm ).fadeIn( function () {
				$( this ).find( "input[ type = 'text' ]" ).first().get( 0 ).focus();
			} );
		} );
	},
	onOTPSend: function () {
		$( this ).find( "[ type = submit ]" ).val( "Sending" );
	},
	onPhoneError: function ( code, message ) {
		alert( message );
		$( this ).find( "[ type = submit ]" ).val( "Send" );
		$( this ).find( "input, select, button" ).prop( "disabled", false );
	},
	onOTPError: function ( code, message ) {
		alert( message );
		$( this ).find( "[ type = submit ]" ).val( "Send" );
		$( this ).find( "input, select, button" ).prop( "disabled", false );
	},
	onLogin: function ( user ) {

		// Store the data on the side
		__OMEGA.user = user;

		// Hide the login form
		var domForm = this;
		setTimeout( function () {
			$( domForm ).fadeOut( function () {

				// Submit the underlying Contact form
				$( ".js_contact_form" ).trigger( "submit" );

			} );
		}, 99 );

	},
	onRetry: function ( domForm ) {
		$( domForm ).find( "input, select, button" ).prop( "disabled", false );
	}
} );


/*
 *
 * When the country code on the phone form is changed, reflect it on the input label
 *
 */
$( document ).on( "change", ".loginner_form_phone .js_phone_country_code", function ( event ) {
	var $phoneCountryCode = $( event.target );
	var phoneCountryCode = $phoneCountryCode.val();
	var $phoneCountryCodeLabel = $phoneCountryCode.closest( "form" ).find( ".js_phone_country_code_label" );
	$phoneCountryCodeLabel.text( phoneCountryCode );
} );

function notify () {}



$( ".js_contact_form" ).on( "submit", function ( event ) {

	/* -----
	 * Prevent the default form submission behaviour
	 * 	which triggers the loading of a new page
	 ----- */
	event.preventDefault();

	var $form = $( event.target );


	/* -----
	 * Disable the form
	 ----- */
	$form.find( "input, select, button" ).prop( "disabled", true );
	$form.find( "[ type = 'submit' ]" ).val( function () {
		return $( this ).data( "progress" );
	} )


	/* -----
	 * Pull the data from the form
	 ----- */
	// name
	$name = $form.find( "[ name = 'name' ]" );
	// email address
	$emailAddress = $form.find( "[ name = 'email' ]" );


	/* -----
	 * Sanitize and Validate the data
	 ----- */
	// Remove any prior "error"s
	$form.find( ".js_error" ).removeClass( "js_error" );
	// name
	if ( ! $name.val().trim() ) {
		$name.addClass( "js_error" );
		alert( "Please provide your name." );
	}
	if ( $emailAddress.val().indexOf( "@" ) == -1 ) {
		$emailAddress.addClass( "js_error" );
		alert( "Please provide a valid email address." );
	}
	// If the form has even one error ( i.e. validation issue )
	// do not proceed
	if ( $form.find( ".js_error" ).length ) {
		$form.find( "input, select, button" ).prop( "disabled", false );
		$form.show();
		return;
	}

	/* -----
	 * Process and Assemble the data
	 ----- */
	var names = $name.val().split( /\s+/ );
	var firstName = names[ 0 ];
	var lastName = names.slice( 1 ).join( " " );
	var emailAddress = $emailAddress.val();

	var _id = __OMEGA.user._id;
	var project = "Klassik Landmark";
	var userData = {
		"First Name": firstName,
		"Last Name": lastName,
		"Email": emailAddress
	}

	/* -----
	 * Store the data on the side
	 ----- */
	__OMEGA.user = Object.assign( __OMEGA.user, {
		firstName: firstName,
		lastName: lastName,
		email: emailAddress
	} );
	__OMEGA.user.name = firstName;
	if ( lastName )
		__OMEGA.user.name += " " + lastName;



	/* -----
	 * Submit the data
	 ----- */
	// Update the user
	updateUser( _id, project, userData )
		.then( function () {
			// Show a feedback message
			$( ".js_contact__feedback_success" ).text( "We will call you shortly." );
			// Hide the form
			$form.fadeOut();
		} )
		.catch( function ( e ) {
			alert( e.message )
			/* -----
			 * Re-enable the form
			 ----- */
			$form.find( "[ type = submit ]" ).val( function () {
				return $( this ).data( "initial" );
			} );
			$form.find( "input, select, button" ).prop( "disabled", false );
			// Show the form
			$form.show();
		} )

} );
