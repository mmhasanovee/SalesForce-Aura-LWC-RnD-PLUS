({
    showinfo: function (component, event, helper) {
        var eventSource = event.getSource();
        var beerObj = eventSource.get('v.name');
        var beerName = eventSource.get('v.value');
        console.log('beerName ', beerName);
        component.set('v.beerId', beerObj);
        $A.createComponent(
            "c:BeerDetails",
            {
                "beerId": beerObj,
                "beerName": beerName
            }, function (beerDetails, status, errorMessage) {

                if (status === 'SUCCESS') {
                    component.find('overLayLib').showCustomModal({
                        header: "Beer Details",
                        body: beerDetails,
                        showCloseButton: true,
                        footer: "Powered By HasanOnM",
                        showCloseButton: true,
                        closeCallback: function () {

                        }
                    });

                } else if (status === "INCOMPLETE") {
                    console.log("Invalid response");

                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            });

    },
    addToCart: function (component, event, helper) {
        var eventSource = event.getSource();
        var beerId = eventSource.get('v.name');
        var index = eventSource.get('v.value'); //getting the index of the selected beer in the cmp file. Cmp file has indexVar value, we are setting the value to via set method.
        var selectedBeer = component.get('v.recordList')[index]; //getting the index of the seleted beer.
        console.log('selectedBeer', selectedBeer);

        var addToCartEvent = component.getEvent('addToCart');
        addToCartEvent.setParams({

            beerRecord:selectedBeer //sending selected beer to parent component via event

        });
        addToCartEvent.fire();
    },

})