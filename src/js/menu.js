$(document).on('ready', function() {
    //prevent the event default
    // event.preventDefault();

    //sanity check
    console.log('sanity check with galvanize eats menu!');

    var menuItems = {};

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

      if ($( '#subAmount' ).text() < 1 ) {
        subtotal = 0;
      } else {
        subtotal = $( '#subAmount' ).text();
      }

      if( quantity < 1 ) {
        quantity = 1;
      }

      for (var i=0; i < quantity; i++) {
        $('#orderSummary').append("<option disabled>" + $( "#foodChoices option:selected" ).text() + '</option>');


        //if you've ever drive by a hogfarm - this is what my code would smell like - but this is what happens when there's a deadline of 1 day
        var str = $( "#foodChoices option:selected" ).text();
        var search = str.search(/\d/)

        //set order totals
        var price = parseFloat(str.substr(search, str.length));

        subtotal = parseFloat(subtotal) + price;

        $( '#subAmount' ).text(subtotal.toFixed(2));

        var tax = parseFloat(subtotal) * .07;
        $( '#taxAmount' ).text(tax.toFixed(2));

        var totalAmount = subtotal + tax;
        $( '#totalAmount' ).text(totalAmount.toFixed(2));
      }
      //set quantity field to 0!
      $( '#quantity' ).val('');

    });

    $( "#submitOrderButton" ).click(function() {
      $.ajax({
        method: 'POST',
        url: 'https://galvanize-eats-api.herokuapp.com/orders'
      }).done(function(results) {

        console.log('POST: ', results);
      });
    });

  });
