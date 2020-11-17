function preventLinkClicks( event ) {
  console.log( 'preventLinkClicks()' );
  event.preventDefault();
}

function selectBlock( block, blockType, parentBlock ) {
  console.log( 'selectBlock()', block, blockType );
  unselectAllBlocks();
  $( block ).addClass( 'is-selected' );

  displayBlockToolbar( block, blockType, parentBlock );
  event.stopPropagation();
}

function unselectAllBlocks() {
  console.log( 'unselectAllBlocks()' );
  $( ".is-selected" ).removeClass( 'is-selected' );
  $( '.canvas .block-toolbar' ).remove();
}

function displayBlockToolbar( block, blockType = 'undefined', parentBlock ) {
  console.log( 'displayBlockToolbar()', block, blockType, parentBlock );
  var blockToolbar = $( '#prototype__block-toolbar' ).clone( true ).removeAttr( 'id' );
  blockToolbar.addClass( blockType );

  if ( parentBlock.hasClass( 'block-type__container' ) ) {
    var parentBlockType = parentBlock.data( 'blockType' );
    console.log( 'Parent Block Type', parentBlockType );
    blockToolbar.find( '.block-parent' ).html( parentBlockType );
    blockToolbar.addClass( 'has-parent' );
  }

  blockToolbar.appendTo( block );
}

$( function() {
  // Loading in HTML prototypes
  $( "#prototype-elements" ).load( "../shared-html/prototypes.html" );

  // Prevent links in the cancas from doing anything
  $( '.canvas a' ).click( function( event ) {
    preventLinkClicks( event );
  } );

  // Clicking a block selects it and displays the toolbar
  $( '.block' ).click( function( event ) {
    var block = this,
        blockType = $( this ).data( 'blockType' ),
        parentBlock = $( this ).parent().closest( '.block-type__container' );

    selectBlock( block, blockType, parentBlock );
  } );

  // Clicking the parent button selects the parent block
  $( '.block-parent' ).click( function( event ) {
    var block = $( this ).parent().closest( '.block-type__container' ),
        parentBlockType = blockType = $( this ).data( 'blockType' ),
        parentBlock = $( this ).parent().closest( '.block-type__container' );
    console.log( 'blockParent', block, blockType, parentBlock );
    //selectBlock( block, blockType, parentBlock );
    event.stopPropagation();
  } );
} );
