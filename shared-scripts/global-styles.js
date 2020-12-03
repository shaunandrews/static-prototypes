function toggleSidebar() {
  $( 'body' ).toggleClass( 'has-sidebar' );
}

function toggleSettingPicker( setting ) {
  var settingType = setting.data( 'settingType' ),
      settingValue = setting.data( 'settingValue' ),
      settingLabel = setting.data( 'settingLabel' ),
      settingIsCustom = setting.data( 'settingIsCustom' ),
      settingDescription = setting.data( 'settingDescription' );

  console.log( settingType, settingValue, settingLabel, settingDescription );

  // If the picker is already open, close it...
  if ( setting.hasClass( 'has-picker' ) ) {
    closeSettingPicker( setting );
  }

  // ...otherwise open it  up.
  else {
    // First, close any other pickers
    closeAllSettingPickers();

    // Grab the prototype
    settingPicker = $( '#prototype__setting-picker' ).clone( true ).removeAttr( 'id' );

    // Add the description
    settingPicker.find( '.setting-picker__description' ).html( settingDescription );

    // If its a font picker, hide the color stuff
    if ( settingType == 'font' ) {
      settingPicker.find( '.color-picker' ).remove();
    }

    // If its a color picker, hide the font stuff
    // and set the current value.
    if ( settingType == 'color' ) {
      settingPicker.find( '.font-picker' ).remove();
      //settingPicker.find( "[data-color-value='" + settingValue + "']" ).addClass( 'is-current' );

      colorSelect( settingValue, settingPicker );

      if ( !settingIsCustom ) {
        settingPicker.find( '.setting-picker__revert' ).remove();
      }
    }

    // Append the picker into the container
    settingPicker.appendTo( setting );

    // Add the container class after a split second to allow
    // the transition to take place.
    window.setTimeout( function() {
      setting.addClass( 'has-picker' );
    }, 0 );
  }
}

function closeSettingPicker( setting ) {
  // Remove the class from the container
  setting.removeClass( 'has-picker' );

  // Remove any pickers that might already exist
  // The timer is to allow the transition to finish first.
  window.setTimeout( function() {
    setting.find( '.setting-picker' ).remove();
  }, 150 );
}

function closeAllSettingPickers() {
  console.log( 'closeAllSettingPickers()' );
  var settingsWithPicker = $( '.has-picker' );

  settingsWithPicker.each( function( index, setting ) {
    closeSettingPicker( $( setting ) );
  } );
}

function highlightBlockByType( blockType ) {
  console.log( 'highlightBlockByType()', blockType );
  removeAllBlockHighlighting();
  $( '.block__' + blockType ).addClass( 'is-highlighted' );
}

function removeAllBlockHighlighting() {
  console.log( 'removeAllBlockHighlighting()' );
  $( '.canvas .is-highlighted' ).removeClass( 'is-highlighted' );
  //$( '.sidebar.global-styles .is-highlighting' ).removeClass( 'is-highlighting' );
}

function colorSelect( colorValue, container ) {
  console.log( 'colorSelect()', colorValue, container );
  var colorSwatch = container.find( "[data-color-value='" + colorValue + "']" ),
      selectedIndicator = $( '#prototype__icon-check' ).clone( true ).removeAttr( 'id' );

  // Unselect other colors
  container.find( '.is-current .icon-check' ).remove();
  container.find( '.is-current' ).removeClass( 'is-current' );

  colorSwatch.addClass( 'is-current' );
  selectedIndicator.appendTo( colorSwatch );
}

function colorAddNew() {}

function colorEdit() {}

$( function() {
  // Click the top toolbar button to toggle the appearance sidebar
  $( '.sidebar-toggle' ).click( function() {
    toggleSidebar();
  } );

  // Click on a setting to open it's picker
  $( '.setting__current' ).click( function() {
    var setting = $( this ).parent();
    toggleSettingPicker( setting );
  } );
} );
