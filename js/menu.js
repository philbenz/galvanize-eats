$(document).on('ready', function() {
    //prevent the event default
    // event.preventDefault();

    //sanity check
    console.log('sanity check with galvanize eats menu!');

    //ajax call to make sure you get the latest menu
    //this function is being used to populate the mapProp object for the map.
    $.ajax({
      method: 'GET',
      url: 'https://galvanize-eats-api.herokuapp.com/menu'
    }).done(function(results) {

        var menuArray = results.menu;

        menuArray.forEach(function(foodItems) {

          if(foodItems.type === "burger") {
            $('<option>' + foodItems.name + "    " + foodItems.price + '</option>').insertAfter( '#Hamburgers' );
          } else {
            $('<option>' + foodItems.name + "    " + foodItems.price + '</option>').insertAfter( '#Pizzas' );
          }

        });
    });

    //Event Listener
    $( "#addItemButton" ).click(function() {
      //do something here
      quantity = $( '#quantity' ).val();
      console.log('quantity: ', quantity);

      if( quantity < 1 ) {
        quantity = 1;
      }

      $('#orderSummary').append('<option>' + $( "#foodChoices option:selected" ).text() + '</option>');

      //set order totals
      subtotal = $( '#subAmount' ).val() + ();
      $( '#subAmount' ).text('');

      //set quantity field to 0!
      $( '#quantity' ).val('');



    });

  });
